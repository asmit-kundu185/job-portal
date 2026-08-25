import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function JobDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [message, setMessage] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  useEffect(() => {
    api.get(`/jobs/${id}`).then(({ data }) => setJob(data));
  }, [id]);

  async function apply() {
    try {
      await api.post(`/applications/${id}`, { coverLetter });
      setMessage("Application submitted successfully.");
    } catch (err) {
      setMessage(err.response?.data?.message || "Could not apply.");
    }
  }

  async function save() {
    try {
      await api.post(`/jobs/${id}/save`);
      setMessage("Job saved.");
    } catch (err) {
      setMessage(err.response?.data?.message || "Could not save job.");
    }
  }

  if (!job) return <p>Loading...</p>;

  return (
    <div className="details">
      <div className="card">
        <span className="eyebrow">{job.jobType}</span>
        <h1>{job.title}</h1>
        <h3>{job.company?.name}</h3>
        <p>{job.location} · {job.experience}</p>

        <div className="tags">
          {job.skills.map(skill => <span className="tag" key={skill}>{skill}</span>)}
        </div>

        <h2>Description</h2>
        <p className="pre">{job.description}</p>

        <h2>Requirements</h2>
        <p className="pre">{job.requirements || "Not specified"}</p>

        <h2>Salary</h2>
        <p>
          {job.salaryMin || job.salaryMax
            ? `₹${job.salaryMin || 0} - ₹${job.salaryMax || 0} LPA`
            : "Not disclosed"}
        </p>
      </div>

      <aside className="card sticky">
        <h3>Apply for this job</h3>

        {message && <div className="success">{message}</div>}

        {user?.role === "student" ? (
          <>
            <textarea
              placeholder="Write a short cover letter"
              value={coverLetter}
              onChange={e => setCoverLetter(e.target.value)}
              rows="7"
            />
            <button className="button full" onClick={apply}>Apply Now</button>
            <button className="button secondary full" onClick={save}>Save Job</button>
          </>
        ) : !user ? (
          <p>Login as a student to apply.</p>
        ) : (
          <p>Only students can apply to jobs.</p>
        )}
      </aside>
    </div>
  );
}
