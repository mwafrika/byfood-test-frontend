import React, { useEffect, useState } from "react";
import { useBookContext } from "@/app/contexts/BookContext";

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddBookModal: React.FC<AddBookModalProps> = ({ isOpen, onClose }) => {
  const { addBook } = useBookContext();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");

  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    addBook({ title, author, year: parseInt(year, 10) });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add New Book</h2>
        <form onSubmit={handleAddBook}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="author">
              Author
            </label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="year">
              Year
            </label>
            <input
              type="number"
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primary text-white py-2 px-4 rounded"
            >
              Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookModal;
