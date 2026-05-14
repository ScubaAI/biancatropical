// ============================================================
// FOOTER — With Bitcoin badge
// ============================================================

export function Footer() {
  return (
    <footer className="border-t py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} La Bianca. Todos los derechos reservados.
        </p>
        <div className="flex items-center gap-4">
          {/* <Image src="/icons/bitcoin-badge.svg" alt="Bitcoin Accepted" width={100} height={30} /> */}
          <span className="text-sm text-muted-foreground">⚡ Bitcoin Accepted</span>
        </div>
      </div>
    </footer>
  )
}