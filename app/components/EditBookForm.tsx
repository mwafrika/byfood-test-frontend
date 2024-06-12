import React, { useState, useRef } from "react";
import { useBookContext } from "../contexts/BookContext";

interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
}

const EditBookModal = ({
  book,
  closeModal,
}: {
  book: Book;
  closeModal: () => void;
}) => {
  const { editBook } = useBookContext();
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [year, setYear] = useState(book.year);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editBook({ id: book.id, title, author, year });

    if (formRef.current) {
      formRef.current.reset();
    }

    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Edit Book</h2>
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Author</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Year</label>
            <input
              type="number"
              className="w-full px-4 py-2 border rounded"
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value))}
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primary text-white py-2 px-4 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBookModal;
