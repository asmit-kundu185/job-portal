import { useEffect, useState } from "react";
import api from "../services/api";

export default function Profile() {
  const [form, setForm] = useState({
    name: "", phone: "", skills: [], education: "", experience: "", resume: ""
  });
  const [skillsText, setSkillsText] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/users/profile").then(({ data }) => {
      setForm(data);
      setSkillsText((data.skills || []).join(", "));
    });
  }, []);

  async function submit(e) {
    e.preventDefault();

    const payload = {
      ...form,
      skills: skillsText.split(",").map(s => s.trim()).filter(Boolean)
    };

    try {
      await api.put("/users/profile", payload);
      setMessage("Profile updated successfully.");
    } catch (err) {
      setMessage(err.response?.data?.message || "Update failed");
    }
  }

  return (
    <div className="form-page wide">
      <form className="form card" onSubmit={submit}>
        <h1>My Profile</h1>
        {message && <div className="success">{message}</div>}

        <label>Name</label>
        <input value={form.name || ""} onChange={e => setForm({...form, name: e.target.value})} />

        <label>Phone</label>
        <input value={form.phone || ""} onChange={e => setForm({...form, phone: e.target.value})} />

        <label>Skills (comma separated)</label>
        <input value={skillsText} onChange={e => setSkillsText(e.target.value)} />

        <label>Education</label>
        <textarea value={form.education || ""} onChange={e => setForm({...form, education: e.target.value})} />

        <label>Experience</label>
        <textarea value={form.experience || ""} onChange={e => setForm({...form, experience: e.target.value})} />

        <label>Resume URL</label>
        <input value={form.resume || ""} onChange={e => setForm({...form, resume: e.target.value})} />

        <button className="button">Save Profile</button>
      </form>
    </div>
  );
}
