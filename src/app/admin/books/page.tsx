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
];

export default function AdminBooksPage() {
  return (
    <DashboardLayout>
      <section>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Admin Books
            </h1>

            <p className="mt-2 text-gray-600">
              Create, update, and delete books.
            </p>
          </div>

          <button className="rounded-lg bg-black px-5 py-3 text-white transition hover:bg-gray-800">
            Add Book
          </button>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border bg-white">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left">
                  Title
                </th>

                <th className="px-6 py-4 text-left">
                  Author
                </th>

                <th className="px-6 py-4 text-left">
                  Price
                </th>

                <th className="px-6 py-4 text-left">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {books.map((book) => (
                <tr
                  key={book.id}
                  className="border-t"
                >
                  <td className="px-6 py-4">
                    {book.title}
                  </td>

                  <td className="px-6 py-4">
                    {book.author}
                  </td>

                  <td className="px-6 py-4">
                    ${book.price}
                  </td>

                  <td className="flex gap-3 px-6 py-4">
                    <button className="rounded-lg bg-blue-600 px-4 py-2 text-white">
                      Edit
                    </button>

                    <button className="rounded-lg bg-red-600 px-4 py-2 text-white">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </DashboardLayout>
  );
}