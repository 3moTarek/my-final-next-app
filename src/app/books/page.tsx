import { DashboardLayout } from "@/layouts/DashboardLayout";

const books = [
  {
    id: 1,
    title: "Clean Code",
    author: "Robert C. Martin",
    price: 25,
  },
  {
    id: 2,
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    price: 30,
  },
  {
    id: 3,
    title: "JavaScript: The Good Parts",
    author: "Douglas Crockford",
    price: 18,
  },
];

export default function BooksPage() {
  return (
    <DashboardLayout>
      <section>
        <h1 className="text-3xl font-bold">
          Books
        </h1>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {books.map((book) => (
            <div
              key={book.id}
              className="rounded-2xl border bg-white p-6 shadow-sm"
            >
              <h2 className="text-xl font-bold">
                {book.title}
              </h2>

              <p className="mt-2 text-sm text-gray-600">
                {book.author}
              </p>

              <p className="mt-4 font-semibold">
                ${book.price}
              </p>
            </div>
          ))}
        </div>
      </section>
    </DashboardLayout>
  );
}