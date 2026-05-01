import { useEffect, useMemo, useState } from "react";
import { borrowService, getApiErrorMessage } from "../services/api";
import { useAuth } from "../context/AuthContext";

const metricCardStyle = "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm";

const UserDashboardPage = () => {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState("");
  const { user } = useAuth();

  const loadRecords = async () => {
    try {
      setError("");
      const data = await borrowService.getUserRecords(user?._id);
      setRecords(data);
    } catch (apiError) {
      setError(getApiErrorMessage(apiError, "Unable to load records"));
    }
  };

  useEffect(() => {
    if (user?._id) {
      loadRecords();
    }
  }, [user?._id]);

  const stats = useMemo(() => {
    const borrowed = records.filter((record) => record.status === "Borrowed").length;
    const returned = records.filter((record) => record.status === "Returned").length;
    const dueSoon = records.filter((record) => {
      if (record.status !== "Borrowed") return false;
      const daysDiff = (new Date(record.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
      return daysDiff >= 0 && daysDiff <= 3;
    }).length;
    const overdue = records.filter((record) => record.status === "Borrowed" && new Date(record.dueDate).getTime() < Date.now()).length;
    return { borrowed, returned, dueSoon, overdue, total: records.length };
  }, [records]);

  return (
    <section className="space-y-6">
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-blue-800 p-7 text-white shadow-lg">
        <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-slate-200">Member Dashboard</p>
        <h1 className="serif-title text-5xl font-semibold leading-tight">Your books, library card, progress, and personalized insights.</h1>
        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-blue-100">Logged in as {user?.name || "Student"}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <article className={metricCardStyle}><p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Currently Borrowed</p><p className="serif-title mt-2 text-5xl font-semibold text-slate-900">{stats.borrowed}</p></article>
        <article className={metricCardStyle}><p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Total Borrowed</p><p className="serif-title mt-2 text-5xl font-semibold text-slate-900">{stats.total}</p></article>
        <article className={metricCardStyle}><p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Due Soon</p><p className="serif-title mt-2 text-5xl font-semibold text-slate-900">{stats.dueSoon}</p></article>
        <article className={metricCardStyle}><p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Overdue Books</p><p className="serif-title mt-2 text-5xl font-semibold text-slate-900">{stats.overdue}</p></article>
      </div>

      {error && <p className="rounded-xl bg-red-100 px-3 py-2 text-sm text-red-700">{error}</p>}

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-700">
            <tr><th className="px-4 py-3">Book</th><th className="px-4 py-3">Borrowed</th><th className="px-4 py-3">Due</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Action</th></tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record._id} className="border-t border-slate-100">
                <td className="px-4 py-3">
                  {record.bookTitle || "Deleted book"}
                </td>
                <td className="px-4 py-3">{new Date(record.borrowDate).toLocaleDateString()}</td>
                <td className="px-4 py-3">{new Date(record.dueDate).toLocaleDateString()}</td>
                <td className="px-4 py-3">{record.status}</td>
                <td className="px-4 py-3"><span className="text-slate-400">Admin Only</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default UserDashboardPage;
