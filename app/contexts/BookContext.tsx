"use client";
import axiosInstance from "@/app/fetcher/api";
import { toast } from "react-toastify";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import Spinner from "../components/Spinner";

interface Book {
  id?: string;
  title: string;
  author: string;
  year: number;
}

interface Pagination {
  page: number;
  total_count: number;
}

interface BookContextType {
  books: Book[];
  pagination: Pagination | null;
  addBook: (book: Book, resetForm: () => void) => void;
  editBook: (book: Book) => void;
  deleteBook: (id: string) => void;
  fetchBooks: (page?: number, pageSize?: number, term?: string) => void;
  singleBook: (id: string) => Promise<Book | undefined>;
  loading: boolean;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider = ({ children }: { children: ReactNode }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    total_count: 1,
  });
  const [loading, setLoading] = useState<boolean>(true);

  const fetchBooks = async (
    page: number = 1,
    pageSize: number = 6,
    term: string = ""
  ) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/books?page=${page}&pageSize=${pageSize}&term=${term}`
      );
      setBooks(response?.data?.data);
      setPagination(response?.data?.pagination);
      setLoading(false);
    } catch (err: any) {
      toast.error(err.response.data.error);
      setLoading(false);
    }
  };

  const addBook = async (book: Book, resetForm: () => void) => {
    try {
      const response = await axiosInstance.post("/books", book);
      console.log(response.status, "Response", response.status);
      setBooks((prevBooks) => [...prevBooks, response?.data?.data]);
      toast.success(response?.data?.message);
      resetForm();
    } catch (err: any) {
      toast.error(err.response.data.error);
    }
  };

  const editBook = async (updatedBook: Book) => {
    try {
      const response = await axiosInstance.put(
        `/books/${updatedBook.id}`,
        updatedBook
      );
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === updatedBook.id ? response?.data?.data : book
        )
      );

      toast.success(response?.data?.message);
    } catch (err: any) {
      toast.error(err.response.data.error);
    }
  };

  const deleteBook = async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/books/${id}`);
      setBooks(books.filter((book) => book.id !== id));
      toast.success(response?.data?.message);
    } catch (err: any) {
      toast.error(err.response.data.error);
    }
  };

  const singleBook = async (id: string): Promise<Book | undefined> => {
    try {
      const response = await axiosInstance.get(`/books/${id}`);
      return response.data;
    } catch (err: any) {
      toast.error(err.response.data.error);
      return undefined;
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <BookContext.Provider
      value={{
        singleBook,
        books,
        pagination,
        addBook,
        editBook,
        deleteBook,
        fetchBooks,
        loading,
      }}
    >
      {children}
      {loading && <Spinner />}
    </BookContext.Provider>
  );
};

export const useBookContext = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("useBookContext must be used within a BookProvider");
  }
  return context;
};
