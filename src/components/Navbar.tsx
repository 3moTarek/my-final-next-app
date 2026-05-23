import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-black text-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-wide"
        >
          Library System
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link
            href="/"
            className="transition hover:text-gray-300"
          >
            Home
          </Link>

          <Link
            href="/books"
            className="transition hover:text-gray-300"
          >
            Books
          </Link>

          <Link
            href="/admin/books"
            className="transition hover:text-gray-300"
          >
            Admin
          </Link>

          <Link
            href="/login"
            className="rounded-lg bg-white px-4 py-2 text-black transition hover:bg-gray-200"
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}