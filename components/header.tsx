import Image from "next/image"

export function Header() {
  return (
    <div className="space-y-4">
      <h1 className="text-4xl font-bold tracking-tight px-6 py-4">Market • Reward</h1>
      <div className="relative w-full h-64">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-gsgT2xQby6cyJLg4fxwJE4Q8jKZ3aL.png"
          alt="RPG Marketplace Banner"
          fill
          className="object-contain bg-[#f8f9fa]"
          priority
        />
      </div>
    </div>
  )
}

