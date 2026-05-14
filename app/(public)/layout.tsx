// ============================================================
// APP LAYOUT — Public pages: Navbar + Footer
// ============================================================

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* <Navbar /> */}
      <nav className="flex h-16 items-center justify-between border-b px-6">
        <span className="font-bold text-xl">La Bianca</span>
        {/* Navbar links placeholder */}
      </nav>

      <main className="flex-1">{children}</main>

      {/* <Footer /> */}
      <footer className="border-t p-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} La Bianca — Powered by Acepta Bitcoin
      </footer>
    </div>
  )
}