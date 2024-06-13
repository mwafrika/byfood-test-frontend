"use client";
import React, { useEffect, useState } from "react";
import { useBookContext } from "@/app/contexts/BookContext";
import { FaPlus } from "react-icons/fa";
import BookCard from "../../components/BookCard";
import AddBookModal from "../../components/AddBookForm";

const Dashboard = () => {
  const { books, fetchBooks, pagination, loading } = useBookContext();
  const [term, setTerm] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchBooks(1, 6, term);
  }, [term]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    // !loading && (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Library Dashboard</h1>
      <div className="flex justify-end mb-4">
        <button
          className="bg-primary text-white py-2 px-4 rounded flex items-center"
          onClick={handleOpenModal}
        >
          <FaPlus className="mr-2" /> Add Book
        </button>
        <AddBookModal isOpen={isModalOpen} onClose={handleCloseModal} />
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
          <BookCard key={book.id} {...book} />
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
  // );
};

export default Dashboard;
