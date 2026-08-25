import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function JobForm() {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    requirements: "",
    skills: "",
    salaryMin: "",
    salaryMax: "",
    location: "",
    jobType: "Full-time",
    experience: "Fresher",
    company: ""
  });
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/companies").then(({ data }) => {
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const mine = data.filter(c => c.recruiter?._id === currentUser?.id);
      setCompanies(mine);
      if (mine[0]) setForm(f => ({ ...f, company: mine[0]._id }));
    });
  }, []);

  async function submit(e) {
    e.preventDefault();
    setError("");

    if (!form.company) {
      setError("Create a company profile first.");
      return;
    }

    try {
      await api.post("/jobs", {
        ...form,
        skills: form.skills.split(",").map(s => s.trim()).filter(Boolean),
        salaryMin: Number(form.salaryMin) || 0,
        salaryMax: Number(form.salaryMax) || 0
      });
      navigate("/recruiter/jobs");
    } catch (err) {
      setError(err.response?.data?.message || "Could not create job");
    }
  }

  return (
    <div className="form-page wide">
      <form className="form card" onSubmit={submit}>
        <h1>Post a Job</h1>
        {error && <div className="error">{error}</div>}

        <label>Job Title</label>
        <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />

        <label>Company</label>
        <select value={form.company} onChange={e => setForm({...form, company: e.target.value})} required>
          <option value="">Select company</option>
          {companies.map(c => <option value={c._id} key={c._id}>{c.name}</option>)}
        </select>

        <label>Description</label>
        <textarea rows="6" value={form.description} onChange={e => setForm({...form, description: e.target.value})} required />

        <label>Requirements</label>
        <textarea rows="5" value={form.requirements} onChange={e => setForm({...form, requirements: e.target.value})} />

        <label>Skills (comma separated)</label>
        <input value={form.skills} onChange={e => setForm({...form, skills: e.target.value})} placeholder="React, Node.js, MongoDB" />

        <div className="two">
          <div>
            <label>Minimum Salary (LPA)</label>
            <input type="number" value={form.salaryMin} onChange={e => setForm({...form, salaryMin: e.target.value})} />
          </div>
          <div>
            <label>Maximum Salary (LPA)</label>
            <input type="number" value={form.salaryMax} onChange={e => setForm({...form, salaryMax: e.target.value})} />
          </div>
        </div>

        <label>Location</label>
        <input value={form.location} onChange={e => setForm({...form, location: e.target.value})} />

        <label>Job Type</label>
        <select value={form.jobType} onChange={e => setForm({...form, jobType: e.target.value})}>
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Internship</option>
          <option>Contract</option>
          <option>Remote</option>
        </select>

        <label>Experience</label>
        <input value={form.experience} onChange={e => setForm({...form, experience: e.target.value})} />

        <button className="button">Publish Job</button>
      </form>
    </div>
  );
}
