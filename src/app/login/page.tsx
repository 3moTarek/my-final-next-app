import { PublicLayout } from "@/layouts/PublicLayout";

export default function LoginPage() {
  return (
    <PublicLayout>
      <section className="mx-auto flex min-h-[70vh] max-w-md items-center px-6 py-16">
        <div className="w-full rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-gray-900">
            Login
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            Enter your email and password, then complete human verification.
          </p>

          <form className="mt-8 space-y-5">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Email
              </label>

              <input
                type="email"
                placeholder="user@example.com"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Role
              </label>

              <select className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black">
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="rounded-xl border border-gray-300 bg-gray-50 p-4">
              <p className="text-sm font-medium text-gray-800">
                Cloudflare Turnstile
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Human verification will be integrated here before login.
              </p>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-black px-4 py-3 font-medium text-white transition hover:bg-gray-800"
            >
              Continue to OTP
            </button>
          </form>
        </div>
      </section>
    </PublicLayout>
  );
}