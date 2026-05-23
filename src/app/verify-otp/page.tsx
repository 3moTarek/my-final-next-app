"use client";

import { useRouter } from "next/navigation";
import { useState, useSyncExternalStore } from "react";

import { PublicLayout } from "@/layouts/PublicLayout";

function subscribeToSessionStorage(callback: () => void) {
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener("storage", callback);
  };
}

function getPendingOtpEmail() {
  return sessionStorage.getItem("pendingOtpEmail") || "";
}

function getServerSessionValue() {
  return "";
}

export default function VerifyOtpPage() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const email = useSyncExternalStore(
    subscribeToSessionStorage,
    getPendingOtpEmail,
    getServerSessionValue
  );

  async function handleVerifyOtp(event: React.FormEvent) {
    event.preventDefault();

    setError("");
    setIsLoading(true);

    const response = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp }),
    });

    const data = await response.json();

    setIsLoading(false);

    if (data.success) {
      sessionStorage.removeItem("pendingOtpEmail");
      router.push("/books");
      return;
    }

    setError(data.message || "OTP verification failed");
  }

  return (
    <PublicLayout>
      <section className="mx-auto flex min-h-[70vh] max-w-md items-center px-6 py-16">
        <div className="w-full rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold">
            Verify OTP
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            {email
              ? `Enter the code sent to ${email}.`
              : "Go back to login to request a new OTP."}
          </p>

          <form onSubmit={handleVerifyOtp} className="mt-8 space-y-5">
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 text-center text-2xl tracking-[0.4em]"
            />

            {error && (
              <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={!email || otp.length !== 6 || isLoading}
              className="w-full rounded-lg bg-black px-4 py-3 text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? "Verifying..." : "Verify & Login"}
            </button>
          </form>
        </div>
      </section>
    </PublicLayout>
  );
}
