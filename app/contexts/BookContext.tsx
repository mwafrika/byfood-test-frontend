"use client";
import axiosInstance from "@/app/fetcher/api";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface Book {
  id?: string;
  title: string;
  author: string;
  year: number;
}

interface Pagination {
  page: number;
  total_count: number;
  // pageSize: number;
  // totalItems: number;
}

interface BookContextType {
  books: Book[];
  pagination: Pagination | null;
  addBook: (book: Book) => void;
  editBook: (book: Book) => void;
  deleteBook: (id: string) => void;
  fetchBooks: (page?: number, pageSize?: number, term?: string) => void;
  singleBook: (id: string) => Promise<Book | undefined>;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider = ({ children }: { children: ReactNode }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    total_count: 1,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
    } catch (err) {
      setError("Failed to fetch books");
      setLoading(false);
    }
  };

  const addBook = async (book: Book) => {
    try {
      const response = await axiosInstance.post("/books", book);
      setBooks([...books, response.data]);
    } catch (err) {
      setError("Failed to add book");
    }
  };

  const editBook = async (updatedBook: Book) => {
    try {
      const response = await axiosInstance.put(
        `/books/${updatedBook.id}`,
        updatedBook
      );
      setBooks(
        books.map((book) => (book.id === updatedBook.id ? response.data : book))
      );
    } catch (err) {
      setError("Failed to update book");
    }
  };

  const deleteBook = async (id: string) => {
    try {
      await axiosInstance.delete(`/books/${id}`);
      setBooks(books.filter((book) => book.id !== id));
    } catch (err) {
      setError("Failed to delete book");
    }
  };

  const singleBook = async (id: string): Promise<Book | undefined> => {
    try {
      const response = await axiosInstance.get(`/books/${id}`);
      return response.data;
    } catch (err) {
      setError("Failed to fetch book details");
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
      }}
    >
      {children}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
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
