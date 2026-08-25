import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [form, setForm] = useState({
    name: "", email: "", password: "", role: "student"
  });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setError("");

    try {
      const { data } = await api.post("/auth/register", form);
      login(data);
      navigate(data.user.role === "recruiter" ? "/recruiter" : "/jobs");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  }

  return (
    <div className="form-page">
      <form className="form card" onSubmit={submit}>
        <h2>Create Account</h2>
        {error && <div className="error">{error}</div>}

        <label>Name</label>
        <input
          value={form.name}
          onChange={e => setForm({...form, name: e.target.value})}
          required
        />

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
          minLength="6"
          value={form.password}
          onChange={e => setForm({...form, password: e.target.value})}
          required
        />

        <label>Account Type</label>
        <select
          value={form.role}
          onChange={e => setForm({...form, role: e.target.value})}
        >
          <option value="student">Student</option>
          <option value="recruiter">Recruiter</option>
        </select>

        <button className="button">Register</button>
        <p>Already registered? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
}
