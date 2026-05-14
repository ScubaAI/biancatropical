export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-6xl font-bold text-gold">404</h1>
      <p className="text-xl text-muted-foreground">Página no encontrada</p>
      <a href="/" className="text-gold hover:underline">
        Volver al inicio
      </a>
    </div>
  )
}