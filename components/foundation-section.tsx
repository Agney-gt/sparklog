'use client'

export function FoundationSection() {
  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-white text-4xl md:text-5xl font-bold text-center mb-24 max-w-4xl">
        Built on a foundation of fast, production-grade tooling
      </h1>
      
      <div className="relative w-full max-w-6xl">
        {/* Connector Lines */}
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2">
          <div className="relative h-px">
            {/* Central processor to cards connectors */}
            <div className="absolute left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-neutral-600 -top-16" />
            <div className="absolute w-full h-px bg-gradient-to-r from-[#0ea5e9] via-[#ec4899] to-[#eab308]" />
          </div>
        </div>

        {/* Powered By Chip */}
        <div className="relative z-10 mb-16">
          <div className="bg-neutral-800 text-white px-8 py-4 rounded-lg mx-auto w-fit">
            <div className="text-xl font-semibold">Powered By</div>
          </div>
        </div>

        {/* Cards Container */}
        <div className="relative z-10 grid md:grid-cols-3 gap-6">
          {/* Consistency Card */}
          <div className="bg-neutral-900/80 backdrop-blur-sm rounded-xl p-6 border border-neutral-800 hover:border-sky-500/50 transition-colors">
            <div className="h-12 w-12 rounded-lg bg-sky-500/10 flex items-center justify-center mb-6">
              <div className="text-sky-500 text-2xl">⚡</div>
            </div>
            <h2 className="text-white text-xl font-semibold flex items-center gap-2 mb-4">
              Consistency
              <svg className="w-4 h-4 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </h2>
            <p className="text-neutral-400 leading-relaxed">
              A systematic approach to building habits and achieving goals through small, consistent actions that compound over time.
            </p>
          </div>

          {/* Compounding Card */}
          <div className="bg-neutral-900/80 backdrop-blur-sm rounded-xl p-6 border border-neutral-800 hover:border-pink-500/50 transition-colors">
            <div className="h-12 w-12 rounded-lg bg-pink-500/10 flex items-center justify-center mb-6">
              <div className="text-pink-500 text-2xl">📈</div>
            </div>
            <h2 className="text-white text-xl font-semibold flex items-center gap-2 mb-4">
              Compounding
              <svg className="w-4 h-4 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </h2>
            <p className="text-neutral-400 leading-relaxed">
              The exponential growth effect that occurs when consistent efforts accumulate and multiply over extended periods.
            </p>
          </div>

          {/* Catharsis Card */}
          <div className="bg-neutral-900/80 backdrop-blur-sm rounded-xl p-6 border border-neutral-800 hover:border-yellow-500/50 transition-colors">
            <div className="h-12 w-12 rounded-lg bg-yellow-500/10 flex items-center justify-center mb-6">
              <div className="text-yellow-500 text-2xl">🌟</div>
            </div>
            <h2 className="text-white text-xl font-semibold flex items-center gap-2 mb-4">
              Catharsis
              <svg className="w-4 h-4 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </h2>
            <p className="text-neutral-400 leading-relaxed">
              The process of emotional release and renewal that comes from achieving meaningful progress through sustained effort.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}