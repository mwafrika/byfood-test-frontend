import React, { useState } from "react";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import { useBookContext } from "../contexts/BookContext";
import EditBookModal from "./EditBookForm";
import ConfirmationDialog from "./ConfirmDeleteDialog";
import { useRouter } from "next/navigation";

interface Book {
  id?: string;
  title: string;
  author: string;
  year: number;
}

const BookCard = ({ title, author, year, id }: Book) => {
  const { deleteBook } = useBookContext();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const router = useRouter();

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleDelete = () => {
    setShowConfirmationDialog(true);
  };

  const confirmDelete = () => {
    deleteBook(id as string);
    setShowConfirmationDialog(false);
  };

  const cancelDelete = () => {
    setShowConfirmationDialog(false);
  };

  const handleViewBookRedirect = () => {
    router.push(`/dashboard/books/${id}`);
  };

  return (
    <div className="border p-4 rounded shadow-md flex flex-col">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-700 mb-1">Author: {author}</p>
      <p className="text-gray-700 mb-4">Year: {year}</p>
      <div className="flex flex-col sm:flex-row sm:justify-between mt-auto gap-2">
        <button
          className="bg-secondary text-white py-2 px-4 rounded flex items-center justify-center"
          onClick={() => handleViewBookRedirect()}
        >
          <FaEye className="mr-2" /> View
        </button>

        <button
          className="bg-primary text-white py-2 px-4 rounded flex items-center justify-center"
          onClick={handleEdit}
        >
          <FaEdit className="mr-2" /> Edit
        </button>

        <button
          className="bg-red-500 text-white py-2 px-4 rounded flex items-center justify-center"
          onClick={handleDelete}
        >
          <FaTrashAlt className="mr-2" /> Delete
        </button>
      </div>
      {showEditModal && (
        <EditBookModal
          book={{ id, title, author, year }}
          closeModal={() => setShowEditModal(false)}
        />
      )}

      {showConfirmationDialog && (
        <ConfirmationDialog
          message="Are you sure you want to delete this book?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default BookCard;
