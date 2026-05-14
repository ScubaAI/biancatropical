// ============================================================
// FEATURE GRID — Benefits for client/mesero/negocio
// ============================================================

export function FeatureGrid() {
  const features = [
    {
      title: 'Para el Cliente',
      description: 'Escanea, paga y disfruta. Propinas instantáneas vía Lightning Network.',
      icon: '👤',
    },
    {
      title: 'Para el Mesero',
      description: 'Recibe propinas directamente en tu wallet Bitcoin. Sin intermediarios.',
      icon: '🧑‍🍳',
    },
    {
      title: 'Para el Negocio',
      description: 'Panel administrativo completo: ingresos, mesas, meseros y reportes en tiempo real.',
      icon: '📊',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {features.map((feature) => (
        <div key={feature.title} className="text-center p-6">
          <div className="text-4xl mb-4">{feature.icon}</div>
          <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
          <p className="text-muted-foreground">{feature.description}</p>
        </div>
      ))}
    </div>
  )
}