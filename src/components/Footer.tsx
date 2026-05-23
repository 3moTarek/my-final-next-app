export function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-black text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        
        {/* Left Side */}
        <div>
          <h2 className="text-2xl font-bold">
            Library System
          </h2>

          <p className="mt-2 max-w-md text-sm text-gray-400">
            Modern library management platform built
            with Next.js, JWT authentication, OTP
            verification, and role-based authorization.
          </p>
        </div>

        {/* Right Side */}
        <div className="flex flex-col gap-3 text-sm text-gray-300">
          <a
            href="/books"
            className="transition hover:text-white"
          >
            Books
          </a>

          <a
            href="/login"
            className="transition hover:text-white"
          >
            Login
          </a>

          <a
            href="/admin/books"
            className="transition hover:text-white"
          >
            Admin Dashboard
          </a>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 py-4 text-center text-sm text-gray-500">
        © 2026 Library System. All rights reserved.
      </div>
    </footer>
  );
}