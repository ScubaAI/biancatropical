// ============================================================
// HERO SECTION — Video loop + CTA
// ============================================================

export function HeroSection() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Video background placeholder */}
      <div className="absolute inset-0 bg-gradient-to-b from-gold/10 to-transparent" />

      {/* Desktop video: horno de leña (día) / pista de baile (noche) */}
      {/* <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/hero-oven-loop.mp4" type="video/mp4" />
      </video> */}

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 font-serif">
          La Bianca
        </h1>
        <p className="text-xl md:text-2xl mb-2 opacity-90">
          Sabor auténtico · Pagos con Bitcoin Lightning
        </p>
        <p className="text-lg mb-8 opacity-70">
          Donde la tradición italiana se encuentra con el futuro de los pagos
        </p>
        {/* <button className="bg-gold text-black px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gold/90 transition-colors">
          Ver Carta
        </button> */}
      </div>
    </section>
  )
}