import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { bookService, borrowService } from "../services/api";
import { useAuth } from "../context/AuthContext";

const BookDetailsPage = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [book, setBook] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadBook = async () => {
      const data = await bookService.getBookById(id);
      setBook(data);
    };

    loadBook();
  }, [id]);

  const handleBorrow = async () => {
    try {
      await borrowService.borrowBook(id);
      setMessage("Book borrowed successfully");
      const updatedBook = await bookService.getBookById(id);
      setBook(updatedBook);
    } catch (apiError) {
      setMessage(apiError.response?.data?.message || "Unable to borrow");
    }
  };

  if (!book) {
    return <p className="text-slate-600">Loading book details...</p>;
  }

  return (
    <section className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-sm">
      <h1 className="text-3xl font-bold text-slate-900">{book.title}</h1>
      <p className="mt-2 text-sm font-semibold text-slate-500">Book ID: {book._id}</p>
      <p className="mt-1 text-slate-600">Author: {book.author}</p>
      <p className="text-slate-600">Category: {book.category}</p>
      <p className="mt-4 text-slate-700">{book.description}</p>

      <p className="mt-5 inline-block rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
        Status: {book.availabilityStatus}
      </p>

      {message && <p className="mt-4 rounded-lg bg-blue-100 px-3 py-2 text-sm text-blue-700">{message}</p>}

      {user && (
        <button
          onClick={handleBorrow}
          disabled={book.availabilityStatus !== "Available"}
          className="mt-5 rounded-lg bg-brand-600 px-4 py-2 font-semibold text-white disabled:bg-slate-300"
        >
          Borrow Book
        </button>
      )}
    </section>
  );
};

export default BookDetailsPage;
