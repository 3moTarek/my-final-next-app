"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { PublicLayout } from "@/layouts/PublicLayout";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [role, setRole] =
    useState("user");

  async function handleLogin(
    event: React.FormEvent
  ) {
    event.preventDefault();

    const response = await fetch(
      "/api/auth/login",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          email,
          password,
          role,
        }),
      }
    );

    const data =
      await response.json();

    console.log(data);

    if (data.success) {
      router.push(
        "/verify-otp"
      );
    }
  }

  return (
    <PublicLayout>
      <section className="mx-auto flex min-h-[70vh] max-w-md items-center px-6 py-16">
        <div className="w-full rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold">
            Login
          </h1>

          <form
            onSubmit={
              handleLogin
            }
            className="mt-8 space-y-5"
          >
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="w-full rounded-lg border px-4 py-3"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="w-full rounded-lg border px-4 py-3"
            />

            <select
              value={role}
              onChange={(e) =>
                setRole(
                  e.target.value
                )
              }
              className="w-full rounded-lg border px-4 py-3"
            >
              <option value="user">
                User
              </option>

              <option value="admin">
                Admin
              </option>
            </select>

            <button
              type="submit"
              className="w-full rounded-lg bg-black px-4 py-3 text-white"
            >
              Continue to OTP
            </button>
          </form>
        </div>
      </section>
    </PublicLayout>
  );
}