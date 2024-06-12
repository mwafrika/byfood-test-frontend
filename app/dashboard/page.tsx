"use client";
import React, { useEffect } from "react";
import { useBookContext } from "@/app/contexts/BookContext";

const page = () => {
  const { books, fetchBooks } = useBookContext();

  useEffect(() => {
    fetchBooks();
  }, []);

  console.log(books, "Check all the books");

  return <div>all books</div>;
};

export default page;
