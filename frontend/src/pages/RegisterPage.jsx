import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService, getApiErrorMessage } from "../services/api";
import { useAuth } from "../context/AuthContext";

const RegisterPage = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await authService.register(form);
      login(data);
      navigate("/dashboard");
    } catch (apiError) {
      setError(getApiErrorMessage(apiError, "Registration failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto mt-10 w-full max-w-md rounded-2xl border border-pink-100 bg-white/95 p-6 shadow-lg">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Create Account</h1>
      {error && <p className="mb-4 rounded-lg bg-red-100 px-3 py-2 text-sm text-red-700">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          required
          className="w-full rounded-lg border border-pink-200 bg-pink-50/40 px-3 py-2 outline-none focus:border-pink-400"
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
        />
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
          {loading ? "Please wait..." : "Register"}
        </button>
      </form>

      <p className="mt-4 text-sm text-slate-600">
        Already registered? <Link className="text-pink-700" to="/login">Login</Link>
      </p>
    </section>
  );
};

export default RegisterPage;
