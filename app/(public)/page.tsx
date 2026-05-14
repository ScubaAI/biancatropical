// ============================================================
// LANDING PAGE — Hero + TipJar Demo
// ============================================================

import TipJar from "@/components/tipjar/TipJar";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">
          Bienvenido a La Bianca
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Sabor auténtico · Pagos con Bitcoin Lightning
        </p>
        {/* <HeroSection /> */}
      </section>

      {/* TipJar Demo */}
      <section className="max-w-md mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Deja tu propina ⚡
        </h2>
        <TipJar />
        <p className="text-center text-muted-foreground text-sm mt-4">
          Demo: selecciona un monto y paga con Lightning
        </p>
      </section>
    </div>
  )
}