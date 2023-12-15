import React, { createContext, useContext, useState } from "react";

type Book = {
  id: string;
  title: string;
  publishedYear: number;
  author: string;
  description: string;
};

type BookContextType = {
  books: Book[]; // list of books
  addBook: (book: Book) => void; // function to add a new book to the list
  editBook: (id: string, editedBook: Book) => void; // function to edit existing book in the list
};

const BookContext = createContext<BookContextType | undefined>(undefined);

export const useBookContext = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("useBookContext must be used within a BookProvider");
  }
  return context;
};

export const BookProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [books, setBooks] = useState<Book[]>([]);

  const addBook = (book: Book) => {
    setBooks((prevBooks) => [...prevBooks, book]);
  };

  const editBook = (id: string, editedBook: Book) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => (book.id === id ? editedBook : book))
    );
  };

  return (
    <BookContext.Provider value={{ books, addBook, editBook }}>
      {children}
    </BookContext.Provider>
  );
};
