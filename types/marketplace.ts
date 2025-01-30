export interface Product {
    id: string
    name: string
    price: number
    image: string
    description?: string
    additionalValue?: string
  }
  
  export interface CartItem {
    id: string
    quantity: number
  }
  
  export interface AccountSummary {
    cartItems: number
    cartTotal: number
    purchaseItems: number
    purchaseTotal: number
  }
  
  