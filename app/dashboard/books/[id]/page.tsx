"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useBookContext } from "@/app/contexts/BookContext";
import EditBookModal from "@/app/components/EditBookForm";
import { FaEdit } from "react-icons/fa";
import Spinner from "@/app/components/Spinner";

interface Book {
  id?: string;
  title: string;
  author: string;
  year: number;
}

const BookDetailsPage = () => {
  const router = useRouter();
  const [showEditModal, setShowEditModal] = useState(false);
  const pathname = usePathname();
  const id = pathname?.split("/")?.pop();

  const { singleBook } = useBookContext();
  const [book, setBook] = useState<Book | null>(null);

  const handleEdit = () => {
    setShowEditModal(true);
  };

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
    return <Spinner />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-secondary text-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Library</h1>
        </div>
      </header>
      <div className="flex-grow container mx-auto px-4 py-8 flex justify-center items-center">
        <div className="max-w-4xl w-3/5 mx-auto bg-white shadow-md rounded-lg p-6">
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
            <button
              className="bg-primary text-white py-2 px-4 rounded flex items-center justify-center"
              onClick={handleEdit}
            >
              <FaEdit className="mr-2" /> Edit
            </button>

            <button
              className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-6 rounded-lg flex items-center justify-center"
              onClick={() => router.back()}
            >
              Back to List
            </button>
          </div>
        </div>
      </div>
      <footer className="bg-secondary text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Library. All rights reserved.</p>
        </div>
      </footer>
      {showEditModal && (
        <EditBookModal
          book={{
            id: book.id as string,
            title: book.title,
            author: book.author,
            year: book.year,
          }}
          closeModal={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
};

export default BookDetailsPage;
