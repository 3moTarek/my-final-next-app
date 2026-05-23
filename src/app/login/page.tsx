"use client";

import { Turnstile } from "@marsidev/react-turnstile";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { PublicLayout } from "@/layouts/PublicLayout";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileKey, setTurnstileKey] = useState(0);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function resetTurnstile() {
    setTurnstileToken("");
    setTurnstileKey((currentKey) => currentKey + 1);
  }

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();

    setError("");

    if (!turnstileToken) {
      setError("Please complete Cloudflare human verification first.");
      return;
    }

    const currentTurnstileToken = turnstileToken;

    setIsLoading(true);

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        turnstileToken: currentTurnstileToken,
      }),
    });

    const data = await response.json();

    setIsLoading(false);

    if (!data.success) {
      resetTurnstile();
      setError(data.message || "Login failed");
      return;
    }

    sessionStorage.setItem("pendingOtpEmail", data.email || email);
    router.push("/verify-otp");
  }

  return (
    <PublicLayout>
      <section className="mx-auto flex min-h-[70vh] max-w-md items-center px-6 py-16">
        <div className="w-full rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-gray-900">
            Login
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            Enter your email and password. Your role is detected securely from your account.
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-800"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-950 placeholder:text-gray-400 outline-none focus:border-black focus:ring-2 focus:ring-black/10"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-800"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-950 placeholder:text-gray-400 outline-none focus:border-black focus:ring-2 focus:ring-black/10"
              />
            </div>

            <Turnstile
              key={turnstileKey}
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
              onSuccess={(token) => {
                setTurnstileToken(token);
                setError("");
              }}
              onExpire={() => setTurnstileToken("")}
              onError={() => {
                setTurnstileToken("");
                setError("Cloudflare verification failed. Please try again.");
              }}
            />

            {error && (
              <p className="rounded-lg bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={!turnstileToken || isLoading}
              className="w-full rounded-lg bg-black px-4 py-3 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? "Checking..." : "Continue to OTP"}
            </button>
          </form>
        </div>
      </section>
    </PublicLayout>
  );
}
