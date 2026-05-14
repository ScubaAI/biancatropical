// ============================================================
// CTA SECTION — Call to action for SaaS demo
// ============================================================

export function CTASection() {
  return (
    <section className="text-center py-16 bg-gold/10 rounded-3xl">
      <h2 className="text-3xl font-bold mb-4">¿Tienes un negocio?</h2>
      <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
        Acepta Bitcoin Lightning en tu restaurante, café o negocio.
        Sistema de propinas inteligentes con panel administrativo completo.
      </p>
      <div className="flex gap-4 justify-center">
        {/* <Button size="lg">Solicitar Demo</Button> */}
        <button className="btn-primary px-8 py-3 text-lg rounded-lg">
          Solicitar Demo
        </button>
        {/* <Button variant="outline" size="lg">
          Ver Documentación
        </Button> */}
        <button className="px-8 py-3 text-lg rounded-lg border border-gold text-gold hover:bg-gold/10 transition-colors">
          Ver Documentación
        </button>
      </div>
    </section>
  )
}