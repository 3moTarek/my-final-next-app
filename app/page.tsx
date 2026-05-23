import { PublicLayout } from "@/layouts/PublicLayout";

export default function HomePage() {
  return (
    <PublicLayout>
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h1 className="text-5xl font-bold">
          Library Management System
        </h1>

        <p className="mt-4 max-w-2xl text-gray-600">
          A secure Next.js full-stack project with API routes,
          JWT authentication, OTP verification, Cloudflare
          Turnstile, and role-based authorization.
        </p>
      </section>
    </PublicLayout>
  );
}