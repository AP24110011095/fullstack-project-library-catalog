import { useEffect, useMemo, useState } from "react";
import { borrowService, getApiErrorMessage } from "../services/api";

const cardStyle = "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm";

const AdminDashboardPage = () => {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  const loadRecords = async () => {
    try {
      setError("");
      const data = await borrowService.getAllRecords();
      setRecords(data);
    } catch (apiError) {
      setError(getApiErrorMessage(apiError, "Failed to load borrow records"));
    }
  };

  const handleReturn = async (recordId) => {
    try {
      setError("");
      setMessage("");
      await borrowService.returnBook(recordId);
      setMessage("Book returned successfully by admin.");
      await loadRecords();
    } catch (apiError) {
      setError(getApiErrorMessage(apiError, "Failed to return book"));
    }
  };

  useEffect(() => {
    loadRecords();
  }, []);

  const activeRecords = useMemo(() => records.filter((record) => record.status === "Borrowed"), [records]);
  const historyRecords = useMemo(() => records.filter((record) => record.status === "Returned"), [records]);
  const filteredRecords = useMemo(() => {
    const text = search.trim().toLowerCase();
    if (!text) return records;
    return records.filter((record) => {
      return (
        (record.userName || "").toLowerCase().includes(text) ||
        (record.userEmail || "").toLowerCase().includes(text) ||
        (record.bookTitle || "").toLowerCase().includes(text)
      );
    });
  }, [records, search]);

  const filteredActive = useMemo(
    () => filteredRecords.filter((record) => record.status === "Borrowed"),
    [filteredRecords]
  );

  return (
    <section className="space-y-6">
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-indigo-800 p-7 text-white shadow-lg">
        <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-slate-200">Admin Dashboard</p>
        <h1 className="serif-title text-4xl font-semibold leading-tight">Borrowing control and full user history</h1>
        <p className="mt-3 text-sm text-indigo-100">
          Shows all users, all borrowed books, return status, and admin-only return action.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <article className={cardStyle}>
          <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Total Records</p>
          <p className="serif-title mt-2 text-5xl font-semibold text-slate-900">{records.length}</p>
        </article>
        <article className={cardStyle}>
          <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Currently Borrowed</p>
          <p className="serif-title mt-2 text-5xl font-semibold text-slate-900">{activeRecords.length}</p>
        </article>
        <article className={cardStyle}>
          <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Returned History</p>
          <p className="serif-title mt-2 text-5xl font-semibold text-slate-900">{historyRecords.length}</p>
        </article>
      </div>

      {message && <p className="rounded-lg bg-blue-100 px-3 py-2 text-sm text-blue-700">{message}</p>}
      {error && <p className="rounded-lg bg-red-100 px-3 py-2 text-sm text-red-700">{error}</p>}

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by user name, email, or book title"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
        />
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-bold text-slate-900">Currently Borrowed (Admin Return Action)</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-slate-200 text-slate-700">
              <tr>
                <th className="px-3 py-2">User Name</th>
                <th className="px-3 py-2">User Email</th>
                <th className="px-3 py-2">Book</th>
                <th className="px-3 py-2">Borrowed</th>
                <th className="px-3 py-2">Due</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredActive.map((record) => (
                <tr key={record._id} className="border-b border-slate-100">
                  <td className="px-3 py-2">{record.userName || "N/A"}</td>
                  <td className="px-3 py-2">{record.userEmail || "N/A"}</td>
                  <td className="px-3 py-2">{record.bookTitle || "Deleted book"}</td>
                  <td className="px-3 py-2">{new Date(record.borrowDate).toLocaleDateString()}</td>
                  <td className="px-3 py-2">{new Date(record.dueDate).toLocaleDateString()}</td>
                  <td className="px-3 py-2">
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800">
                      {record.status}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <button
                      onClick={() => handleReturn(record._id)}
                      className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white"
                    >
                      Return
                    </button>
                  </td>
                </tr>
              ))}
              {filteredActive.length === 0 && (
                <tr>
                  <td className="px-3 py-4 text-slate-500" colSpan={7}>
                    No active borrowed books.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-bold text-slate-900">Borrow History (Including Returned)</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-slate-200 text-slate-700">
              <tr>
                <th className="px-3 py-2">User Name</th>
                <th className="px-3 py-2">User Email</th>
                <th className="px-3 py-2">Book</th>
                <th className="px-3 py-2">Borrowed</th>
                <th className="px-3 py-2">Due</th>
                <th className="px-3 py-2">Returned</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record) => (
                <tr key={record._id} className="border-b border-slate-100">
                  <td className="px-3 py-2">{record.userName || "N/A"}</td>
                  <td className="px-3 py-2">{record.userEmail || "N/A"}</td>
                  <td className="px-3 py-2">{record.bookTitle || "Deleted book"}</td>
                  <td className="px-3 py-2">{new Date(record.borrowDate).toLocaleDateString()}</td>
                  <td className="px-3 py-2">{new Date(record.dueDate).toLocaleDateString()}</td>
                  <td className="px-3 py-2">{record.returnDate ? new Date(record.returnDate).toLocaleDateString() : "-"}</td>
                  <td className="px-3 py-2">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        record.status === "Returned"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredRecords.length === 0 && (
                <tr>
                  <td className="px-3 py-4 text-slate-500" colSpan={7}>
                    No borrow records found yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboardPage;
