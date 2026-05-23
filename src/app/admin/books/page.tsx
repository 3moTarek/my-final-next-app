import { DashboardLayout } from "@/layouts/DashboardLayout";

export default function BooksPage() {
  return (
    <DashboardLayout>
      <section>
        <h1 className="text-3xl font-bold">
          Books
        </h1>

        <p className="mt-3 text-gray-600">
          Users can view available books and prices.
        </p>
      </section>
    </DashboardLayout>
  );
}