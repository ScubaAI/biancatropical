// ============================================================
// MENU PAGE — Carta digital
// ============================================================

export default function MenuPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">Nuestra Carta</h1>
      {/* Menu categories: Entradas, Platos fuertes, Postres, Bebidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Menu items placeholder */}
        <div className="border rounded-lg p-6 text-center text-muted-foreground">
          Cargando carta...
        </div>
      </div>
    </div>
  )
}