"use client";
import React, { useEffect, useState } from "react";
import { useBookContext } from "@/app/contexts/BookContext";
import Link from "next/link";
import { FaEdit, FaTrashAlt, FaPlus, FaEye } from "react-icons/fa";

const Dashboard = () => {
  const { books, fetchBooks, deleteBook, pagination } = useBookContext();
  const [term, setTerm] = useState<string>("");

  useEffect(() => {
    fetchBooks(1, 6, term);
  }, [term]);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">Library Dashboard</h1>
      <div className="flex justify-end mb-4">
        <Link href="/add-book">
          <button className="bg-primary text-white py-2 px-4 rounded flex items-center">
            <FaPlus className="mr-2" /> Add Book
          </button>
        </Link>
      </div>
      <input
        type="text"
        placeholder="Search by title, author, or year"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className="border p-2 rounded mb-4 w-full"
      />
      <div className="my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <div
            key={book.id}
            className="border p-4 rounded shadow-md flex flex-col"
          >
            <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
            <p className="text-gray-700 mb-1">Author: {book.author}</p>
            <p className="text-gray-700 mb-4">Year: {book.year}</p>
            <div className="flex justify-between mt-auto">
              <Link href={`/book/${book.id}`}>
                <button className="bg-secondary text-white py-2 px-4 rounded flex items-center">
                  <FaEye className="mr-2" /> View
                </button>
              </Link>
              <Link href={`/edit-book/${book.id}`}>
                <button className="bg-primary text-white py-2 px-4 rounded flex items-center">
                  <FaEdit className="mr-2" /> Edit
                </button>
              </Link>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded flex items-center"
                onClick={() => deleteBook(book.id)}
              >
                <FaTrashAlt className="mr-2" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {pagination && (
        <div className="mt-4 flex justify-center">
          <button
            disabled={pagination.page === 1}
            onClick={() => fetchBooks(pagination.page - 1, 6, term)}
            className="bg-primary text-white py-2 px-4 rounded mr-2"
          >
            Previous
          </button>
          <span className="py-2 px-4">
            {pagination.page} / {pagination.total_count}
          </span>
          <button
            disabled={
              pagination.page === Math.ceil(pagination.total_count / 6) ||
              pagination.total_count === 0
            }
            onClick={() => fetchBooks(pagination.page + 1, 6, term)}
            className="bg-primary text-white py-2 px-4 rounded ml-2"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
