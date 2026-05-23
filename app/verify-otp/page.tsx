"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { PublicLayout } from "@/layouts/PublicLayout";

export default function VerifyOtpPage() {
  const router = useRouter();
  const [otp, setOtp] = useState("");

  async function handleVerifyOtp(event: React.FormEvent) {
    event.preventDefault();

    const response = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ otp }),
    });

    const data = await response.json();

    if (data.success) {
      localStorage.setItem("token", data.token);
      router.push("/books");
    }
  }

  return (
    <PublicLayout>
      <section className="mx-auto flex min-h-[70vh] max-w-md items-center px-6 py-16">
        <div className="w-full rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold">
            Verify OTP
          </h1>

          <form onSubmit={handleVerifyOtp} className="mt-8 space-y-5">
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder="123456"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 text-center text-2xl tracking-[0.4em]"
            />

            <button
              type="submit"
              className="w-full rounded-lg bg-black px-4 py-3 text-white"
            >
              Verify & Login
            </button>
          </form>
        </div>
      </section>
    </PublicLayout>
  );
}