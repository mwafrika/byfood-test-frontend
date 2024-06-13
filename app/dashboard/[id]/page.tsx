"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useBookContext } from "@/app/contexts/BookContext";

interface Book {
  id?: string;
  title: string;
  author: string;
  year: number;
}

const BookDetailsPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname?.split("/")?.pop();

  const { singleBook } = useBookContext();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    if (id) {
      const fetchBook = async () => {
        const fetchedBook = await singleBook(id as string);
        setBook(fetchedBook || null);
      };
      fetchBook();
    }
  }, [id, singleBook]);

  if (!book) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Library</h1>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-4 text-center">{book.title}</h1>
          <div className="mb-4">
            <p className="text-gray-700 text-lg mb-2">
              <strong>Author:</strong> {book.author}
            </p>
            <p className="text-gray-700 text-lg mb-2">
              <strong>Year:</strong> {book.year}
            </p>
            <p className="text-gray-700 text-lg mb-2">
              <strong>ID:</strong> {book.id}
            </p>
          </div>
          <div className="mt-6 flex justify-center space-x-4">
            <Link href={`/edit-book/${book.id}`}>
              <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-6 rounded-lg flex items-center justify-center">
                Edit
              </button>
            </Link>
            <Link href="/books">
              <button className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-6 rounded-lg flex items-center justify-center">
                Back to List
              </button>
            </Link>
          </div>
        </div>
      </div>
      <footer className="bg-blue-600 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Library. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default BookDetailsPage;
