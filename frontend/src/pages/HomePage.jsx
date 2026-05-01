import { useEffect, useMemo, useState } from "react";
import BookCard from "../components/BookCard";
import { bookService, borrowService, getApiErrorMessage } from "../services/api";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [availability, setAvailability] = useState("Any");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [branchFilter, setBranchFilter] = useState("Any");
  const [yearFilter, setYearFilter] = useState("Any");
  const [sortBy, setSortBy] = useState("Newest");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isListening, setIsListening] = useState(false);
  const { user } = useAuth();

  const fetchBooks = async (searchTerm = "") => {
    try {
      setError("");
      const data = await bookService.getBooks(searchTerm);
      setBooks(data);
    } catch (apiError) {
      setError(getApiErrorMessage(apiError, "Failed to load books"));
    }
  };

  useEffect(() => {
    fetchBooks(search);
  }, [search]);

  const handleBorrow = async (bookId) => {
    try {
      setMessage("");
      await borrowService.borrowBook(bookId);
      setMessage("Book borrowed successfully.");
      fetchBooks(search);
    } catch (apiError) {
      setMessage(getApiErrorMessage(apiError, "Unable to borrow book."));
    }
  };

  const handleVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setMessage("Voice search is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setMessage("Listening... speak now.");
    setIsListening(true);

    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript || "";
      setSearch(spokenText.trim());
      setMessage(`Voice input: ${spokenText}`);
    };

    recognition.onerror = () => {
      setMessage("Voice recognition failed. Please try again.");
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const quickInsight = useMemo(() => {
    const availableBooks = books.filter((book) => book.availabilityStatus === "Available").length;
    return { total: books.length, available: availableBooks };
  }, [books]);

  const categories = useMemo(() => {
    return ["All", ...new Set(books.map((book) => book.category).filter(Boolean))];
  }, [books]);

  const branches = useMemo(() => {
    return ["Any", ...new Set(books.map((book) => book.branch).filter(Boolean))];
  }, [books]);

  const years = useMemo(() => {
    return ["Any", ...new Set(books.map((book) => String(book.year)).filter(Boolean))];
  }, [books]);

  const filteredBooks = useMemo(() => {
    let result = [...books];

    if (availability !== "Any") {
      result = result.filter((book) => book.availabilityStatus === availability);
    }

    if (categoryFilter !== "All") {
      result = result.filter((book) => book.category === categoryFilter);
    }

    if (branchFilter !== "Any") {
      result = result.filter((book) => book.branch === branchFilter);
    }

    if (yearFilter !== "Any") {
      result = result.filter((book) => String(book.year) === yearFilter);
    }

    if (sortBy === "A-Z") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "Z-A") {
      result.sort((a, b) => b.title.localeCompare(a.title));
    } else {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return result;
  }, [books, availability, categoryFilter, branchFilter, yearFilter, sortBy]);

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-sm">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-slate-500">Library Book Catalog</p>
            <h1 className="serif-title text-4xl font-semibold leading-tight text-slate-900">
              Browse, borrow, and manage books from one clean catalog.
            </h1>
            <p className="mt-4 max-w-2xl text-sm text-slate-600">
              Search by title, author, category, and availability, then borrow directly from this page.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Quick Insight</p>
            <p className="serif-title mt-3 text-4xl font-semibold text-slate-900">{quickInsight.total}+ books in this page</p>
            <p className="mt-3 text-xs text-slate-600">Available now: {quickInsight.available}</p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white/95 p-4 shadow-sm">
        <div className="grid gap-3 lg:grid-cols-8">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by title, author, category"
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-600 lg:col-span-2"
          />
          <button
            type="button"
            onClick={handleVoiceSearch}
            className="rounded-xl border border-slate-300 bg-slate-900 px-3 py-2 text-sm font-semibold text-white"
          >
            {isListening ? "Listening..." : "Voice"}
          </button>
          <select
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            value={availability}
            onChange={(event) => setAvailability(event.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
          >
            <option value="Any">Any availability</option>
            <option value="Available">Available</option>
            <option value="Borrowed">Borrowed</option>
          </select>
          <select
            value={branchFilter}
            onChange={(event) => setBranchFilter(event.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
          >
            {branches.map((branch) => (
              <option key={branch} value={branch}>
                {branch === "Any" ? "Any branch" : branch}
              </option>
            ))}
          </select>
          <select
            value={yearFilter}
            onChange={(event) => setYearFilter(event.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year === "Any" ? "Any year" : `Year ${year}`}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
          >
            <option value="Newest">Newest</option>
            <option value="A-Z">Title A-Z</option>
            <option value="Z-A">Title Z-A</option>
          </select>
        </div>
        <div className="mt-3 flex gap-2">
          <button type="button" className="rounded-xl bg-slate-900 px-5 py-2 text-sm font-semibold text-white">
            Search
          </button>
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setAvailability("Any");
              setCategoryFilter("All");
              setBranchFilter("Any");
              setYearFilter("Any");
              setSortBy("Newest");
            }}
            className="rounded-xl border border-slate-300 bg-white px-5 py-2 text-sm text-slate-700"
          >
            Reset
          </button>
        </div>
      </div>

      {message && <p className="rounded-xl bg-blue-100 px-3 py-2 text-sm text-blue-700">{message}</p>}
      {error && <p className="rounded-xl bg-red-100 px-3 py-2 text-sm text-red-700">{error}</p>}

      {filteredBooks.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
          No books found. Try different filters, or seed/add books from backend/admin.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredBooks.map((book) => (
            <BookCard key={book._id} book={book} onBorrow={handleBorrow} canBorrow={user?.role === "user"} />
          ))}
        </div>
      )}
    </section>
  );
};

export default HomePage;
