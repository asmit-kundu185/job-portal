import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setError("");

    try {
      const { data } = await api.post("/auth/login", form);
      login(data);

      if (data.user.role === "recruiter") navigate("/recruiter");
      else if (data.user.role === "admin") navigate("/admin");
      else navigate("/jobs");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="form-page">
      <form className="form card" onSubmit={submit}>
        <h2>Login</h2>
        {error && <div className="error">{error}</div>}

        <label>Email</label>
        <input
          type="email"
          value={form.email}
          onChange={e => setForm({...form, email: e.target.value})}
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={form.password}
          onChange={e => setForm({...form, password: e.target.value})}
          required
        />

        <button className="button">Login</button>
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </form>
    </div>
  );
}
