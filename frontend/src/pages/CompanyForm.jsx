import { useEffect, useState } from "react";
import api from "../services/api";

export default function CompanyForm() {
  const [form, setForm] = useState({
    name: "", description: "", website: "", location: "", logo: ""
  });
  const [message, setMessage] = useState("");

  async function load() {
    const { data } = await api.get("/companies");
    const mine = data.find(c => c.recruiter?._id === JSON.parse(localStorage.getItem("user"))?.id);
    if (mine) setForm(mine);
  }

  useEffect(() => { load(); }, []);

  async function submit(e) {
    e.preventDefault();
    try {
      if (form._id) {
        await api.put(`/companies/${form._id}`, form);
      } else {
        await api.post("/companies", form);
      }
      setMessage("Company saved.");
      load();
    } catch (err) {
      setMessage(err.response?.data?.message || "Could not save company");
    }
  }

  return (
    <div className="form-page wide">
      <form className="form card" onSubmit={submit}>
        <h1>Company Profile</h1>
        {message && <div className="success">{message}</div>}

        <label>Company Name</label>
        <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />

        <label>Description</label>
        <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} />

        <label>Website</label>
        <input value={form.website} onChange={e => setForm({...form, website: e.target.value})} />

        <label>Location</label>
        <input value={form.location} onChange={e => setForm({...form, location: e.target.value})} />

        <label>Logo URL</label>
        <input value={form.logo} onChange={e => setForm({...form, logo: e.target.value})} />

        <button className="button">Save Company</button>
      </form>
    </div>
  );
}
