import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function signOut() {
    logout();
    navigate("/");
  }

  return (
    <nav className="nav">
      <Link className="brand" to="/">JobPortal</Link>

      <div className="nav-links">
        <Link to="/jobs">Jobs</Link>
        <Link to="/companies">Companies</Link>

        {user?.role === "student" && (
          <>
            <Link to="/applications">Applications</Link>
            <Link to="/profile">Profile</Link>
          </>
        )}

        {user?.role === "recruiter" && (
          <>
            <Link to="/recruiter">Dashboard</Link>
            <Link to="/recruiter/jobs">My Jobs</Link>
            <Link to="/recruiter/company">Company</Link>
          </>
        )}

        {user?.role === "admin" && <Link to="/admin">Admin</Link>}

        {user ? (
          <button className="link-button" onClick={signOut}>Logout</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link className="button small" to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
