import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// Fetch all marketplace items, cart items, hotels, black market items, and purchase history
export async function GET(request: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user_id');

    const { data: items, error: itemsError } = await supabase.from('items').select('*');
    if (itemsError) throw new Error('Failed to fetch marketplace items');

    const { data: hotels, error: hotelsError } = await supabase.from('hotels').select('*');
    if (hotelsError) throw new Error('Failed to fetch hotels');

    const { data: blackMarketItems, error: blackMarketError } = await supabase
      .from('blackmarket_items')
      .select('*');
    if (blackMarketError) throw new Error('Failed to fetch black market items');

    let userBalance = null;
    let cartItems = [];
    let purchases = [];

    if (userId) {
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('coins')
        .eq('id', userId)
        .single();
      if (!userError) userBalance = user?.coins;

      const { data: cartData, error: cartError } = await supabase
        .from('cart')
        .select('*')
        .eq('user_id', userId);
      if (!cartError) cartItems = cartData;

      const { data: purchaseData, error: purchaseError } = await supabase
        .from('users')
        .select('purchases')
        .eq('id', userId)
        .single();
      if (!purchaseError && purchaseData) purchases = purchaseData.purchases || [];
    }

    return NextResponse.json({
      success: true,
      data: {
        items,
        hotels,
        blackMarketItems,
        userBalance,
        cartItems,
        purchases,
      },
    });
  } catch (error) {
    console.error('Error in GET:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Add a new item to the marketplace
export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    const { name, price, description } = await request.json();

    if (!name || !price) {
      return NextResponse.json({ error: 'Name and price are required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('items')
      .insert({ name, price, description })
      .select()
      .single();

    if (error) throw new Error('Failed to add item to marketplace');

    return NextResponse.json({
      success: true,
      data,
      message: 'Item added to marketplace',
    });
  } catch (error) {
    console.error('Error in POST:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Deduct coins and handle purchases or hotel stays
export async function PATCH(request: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    const { userId, itemId, hotelId } = await request.json();

    // Validate required fields
    if (!userId || (!itemId && !hotelId)) {
      return NextResponse.json(
        { error: 'User ID and either itemId or hotelId are required' },
        { status: 400 }
      );
    }

    // Fetch user details
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, coins, hp, purchases')
      .eq('id', userId)
      .single();

    if (userError || !user) {
      console.error('User fetch error:', userError || 'User not found');
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    let cost = 0;
    let hpGain = 0;
    let newPurchase = null;

    if (hotelId) {
      // Fetch hotel details
      const { data: hotel, error: hotelError } = await supabase
        .from('hotels')
        .select('id, name, price, hp')
        .eq('id', hotelId)
        .single();

      if (hotelError || !hotel) {
        console.error('Hotel fetch error:', hotelError || 'Hotel not found');
        return NextResponse.json({ error: 'Hotel not found' }, { status: 404 });
      }

      cost = hotel.price;
      hpGain = hotel.hp;
      newPurchase = { id: hotel.id, name: hotel.name, price: hotel.price, type: 'hotel', date: new Date() };
    } else {
      // Fetch item details from 'items' table
      const { data: item, error: itemError } = await supabase
        .from('items')
        .select('id, name, price')
        .eq('id', itemId)
        .single();

      if (itemError || !item) {
        // If item is not found in 'items', check in 'blackmarket_items' table
        const { data: blackMarketItem, error: blackMarketError } = await supabase
          .from('blackmarket_items')
          .select('id, name, price')
          .eq('id', itemId)
          .single();

        if (blackMarketError || !blackMarketItem) {
          console.error('Item fetch error:', itemError || blackMarketError || 'Item not found');
          return NextResponse.json({ error: 'Item not found' }, { status: 404 });
        }

        // If found in 'blackmarket_items'
        cost = blackMarketItem.price;
        newPurchase = {
          id: blackMarketItem.id,
          name: blackMarketItem.name,
          price: blackMarketItem.price,
          type: 'blackmarket_item',
          date: new Date(),
        };
      } else {
        // If found in 'items'
        cost = item.price;
        newPurchase = { id: item.id, name: item.name, price: item.price, type: 'item', date: new Date() };
      }
    }

    // Check user's balance
    if (user.coins < cost) {
      return NextResponse.json({ error: 'Insufficient coins' }, { status: 400 });
    }

    // Update user records
    const updatedPurchases = [...(user.purchases || []), newPurchase];
    const updates = {
      coins: user.coins - cost,
      purchases: updatedPurchases,
      ...(hotelId ? { hp: Math.min(user.hp + hpGain, 100) } : {}),
    };

    const { error: updateError } = await supabase.from('users').update(updates).eq('id', userId);
    if (updateError) {
      console.error('User update error:', updateError);
      throw new Error('Failed to update user');
    }

    return NextResponse.json({
      success: true,
      message: hotelId ? 'Hotel stay completed' : 'Item purchased successfully',
      purchase: newPurchase,
    });
  } catch (error) {
    console.error('Error in PATCH handler:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
