import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authService, getApiErrorMessage } from "../services/api";
import { useAuth } from "../context/AuthContext";

const AdminLoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const accessMessage = location.state?.message || "";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await authService.login(form);
      if (data.role !== "admin") {
        setError("Only admin account can login here.");
        setLoading(false);
        return;
      }
      login(data);
      navigate("/admin");
    } catch (apiError) {
      setError(getApiErrorMessage(apiError, "Admin login failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto mt-10 w-full max-w-md rounded-2xl border border-pink-100 bg-white/95 p-6 shadow-lg">
      <h1 className="mb-2 text-2xl font-bold text-slate-900">Admin Login</h1>
      <p className="mb-6 text-sm text-slate-500">Use admin credentials to access admin dashboard.</p>
      {accessMessage && <p className="mb-4 rounded-lg bg-red-100 px-3 py-2 text-sm text-red-700">{accessMessage}</p>}
      {error && <p className="mb-4 rounded-lg bg-red-100 px-3 py-2 text-sm text-red-700">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Admin Email"
          required
          className="w-full rounded-lg border border-pink-200 bg-pink-50/40 px-3 py-2 outline-none focus:border-pink-400"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          required
          className="w-full rounded-lg border border-pink-200 bg-pink-50/40 px-3 py-2 outline-none focus:border-pink-400"
          value={form.password}
          onChange={(event) => setForm({ ...form, password: event.target.value })}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-slate-900 py-2 font-semibold text-white hover:bg-slate-700 disabled:bg-slate-400"
        >
          {loading ? "Please wait..." : "Login as Admin"}
        </button>
      </form>

      <p className="mt-4 text-sm text-slate-600">
        Normal user? <Link className="text-pink-700" to="/login">Go to User Login</Link>
      </p>
    </section>
  );
};

export default AdminLoginPage;
