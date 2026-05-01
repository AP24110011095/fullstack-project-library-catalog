import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <Link to="/" className="text-xl font-bold text-pink-700">
          Full Stack Project
        </Link>

        <nav className="flex items-center gap-3 text-sm font-semibold">
          <NavLink to="/" className="text-slate-700 hover:text-pink-600">
            Home
          </NavLink>

          {user?.role === "user" && (
            <NavLink to="/dashboard" className="text-slate-700 hover:text-pink-600">
              Dashboard
            </NavLink>
          )}

          {user?.role === "admin" && (
            <NavLink to="/admin" className="text-slate-700 hover:text-pink-600">
              Admin
            </NavLink>
          )}

          {!user ? (
            <>
              <NavLink to="/login" className="rounded-lg border border-slate-300 px-3 py-1.5 hover:border-pink-500">
                User Login
              </NavLink>
              <NavLink to="/admin-login" className="rounded-lg border border-slate-300 px-3 py-1.5 hover:border-slate-700">
                Admin Login
              </NavLink>
              <NavLink to="/register" className="rounded-lg bg-pink-600 px-3 py-1.5 text-white hover:bg-pink-700">
                Register
              </NavLink>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="rounded-lg bg-slate-900 px-3 py-1.5 text-white hover:bg-slate-700"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
