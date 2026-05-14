// ============================================================
// AJUSTES — Blink config, webhooks, branding
// ============================================================

export default function AjustesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Ajustes</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Blink Configuration */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Configuración Blink</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">API Key</label>
              <input
                type="password"
                className="w-full border rounded px-3 py-2"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Endpoint</label>
              <input
                type="url"
                className="w-full border rounded px-3 py-2"
                placeholder="https://your-blink-wallet.com"
              />
            </div>
            <button className="btn-primary" type="submit">
              Guardar
            </button>
          </form>
        </div>

        {/* Webhooks */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Webhooks</h2>
          <p className="text-muted-foreground text-sm mb-4">
            URL de recepción de notificaciones de pago
          </p>
          <code className="block bg-muted p-3 rounded text-sm break-all">
            {window?.location?.origin}/api/tipjar/webhook
          </code>
        </div>

        {/* Branding */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Branding</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nombre del negocio</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                defaultValue="La Bianca"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Moneda</label>
              <select className="w-full border rounded px-3 py-2">
                <option>MXN</option>
                <option>USD</option>
                <option>SAT</option>
              </select>
            </div>
            <button className="btn-primary" type="submit">
              Guardar
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}