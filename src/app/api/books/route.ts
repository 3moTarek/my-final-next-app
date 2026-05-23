import { NextResponse } from "next/server";

const books = [
  {
    id: 1,
    title: "Clean Code",
    author: "Robert C. Martin",
    price: 25,
  },
];

export async function GET() {
  return NextResponse.json(
    books
  );
}

export async function POST(
  request: Request
) {
  const body =
    await request.json();

  books.push(body);

  return NextResponse.json({
    success: true,
  });
}