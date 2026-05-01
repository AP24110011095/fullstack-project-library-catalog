import { Link } from "react-router-dom";

const covers = [
  "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=800&auto=format&fit=crop&q=60"
];

const BookCard = ({ book, onBorrow, canBorrow }) => {
  const cover = covers[Math.abs((book.title || "").length) % covers.length];
  const effectiveQuantity =
    typeof book.quantity === "number"
      ? book.quantity
      : book.availabilityStatus === "Available"
        ? 1
        : 0;

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <img src={cover} alt={book.title} className="h-40 w-full object-cover" />

      <div className="space-y-2 p-4">
        <h3 className="serif-title text-2xl font-semibold text-slate-900">{book.title}</h3>
        <p className="text-sm text-slate-700">by {book.author}</p>
        <p className="text-sm text-slate-600">Category: {book.category}</p>
        <p className="text-sm text-slate-600">Available Copies: {effectiveQuantity}</p>
        <p className="text-xs font-semibold text-slate-500">Book ID: {book._id}</p>
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${
            book.availabilityStatus === "Available" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
          }`}
        >
          {book.availabilityStatus}
        </span>
        <p className="line-clamp-2 text-sm text-slate-500">{book.description}</p>

        <div className="flex items-center gap-2 pt-1">
          <Link to={`/books/${book._id}`} className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700">
            Details
          </Link>
          {canBorrow && (
            <button
              onClick={() => onBorrow(book._id)}
              disabled={effectiveQuantity <= 0}
              className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {effectiveQuantity <= 0 ? "Out of Stock" : "Borrow"}
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default BookCard;
