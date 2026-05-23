import Link from "next/link";

export function Sidebar() {
  return (
    <aside className="min-h-screen w-64 border-r border-gray-800 bg-gray-950 p-6 text-white">
      <h2 className="text-lg font-bold">
        Dashboard
      </h2>

      <nav className="mt-8 flex flex-col gap-4 text-sm">
        <Link
          href="/books"
          className="rounded-lg px-3 py-2 transition hover:bg-gray-800"
        >
          Books
        </Link>

        <Link
          href="/admin/books"
          className="rounded-lg px-3 py-2 transition hover:bg-gray-800"
        >
          Admin Books
        </Link>

        <Link
          href="/login"
          className="rounded-lg px-3 py-2 text-red-400 transition hover:bg-gray-800"
        >
          Logout
        </Link>
      </nav>
    </aside>
  );
}