import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { authService, getApiErrorMessage } from "../services/api";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await authService.login(form);
      login(data);

      if (data.role === "admin") {
        navigate("/admin");
      } else {
        navigate(location.state?.from?.pathname || "/dashboard");
      }
    } catch (apiError) {
      setError(getApiErrorMessage(apiError, "Login failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto mt-10 w-full max-w-md rounded-2xl border border-pink-100 bg-white/95 p-6 shadow-lg">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Login</h1>
      {error && <p className="mb-4 rounded-lg bg-red-100 px-3 py-2 text-sm text-red-700">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
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
          className="w-full rounded-lg bg-pink-600 py-2 font-semibold text-white hover:bg-pink-700 disabled:bg-slate-400"
        >
          {loading ? "Please wait..." : "Login"}
        </button>
      </form>

      <p className="mt-4 text-sm text-slate-600">
        No account? <Link className="text-pink-700" to="/register">Create one</Link>
      </p>
    </section>
  );
};

export default LoginPage;
