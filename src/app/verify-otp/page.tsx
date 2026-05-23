import { PublicLayout } from "@/layouts/PublicLayout";

export default function VerifyOtpPage() {
  return (
    <PublicLayout>
      <section className="mx-auto flex min-h-[70vh] max-w-md items-center px-6 py-16">
        <div className="w-full rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-gray-900">
            Verify OTP
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            Enter the 6-digit code sent to your email. The code is valid for a limited time.
          </p>

          <form className="mt-8 space-y-5">
            <div>
              <label className="text-sm font-medium text-gray-700">
                OTP Code
              </label>

              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="123456"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-center text-2xl tracking-[0.4em] outline-none transition focus:border-black"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-black px-4 py-3 font-medium text-white transition hover:bg-gray-800"
            >
              Verify & Login
            </button>
          </form>
        </div>
      </section>
    </PublicLayout>
  );
}