import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function RecruiterJobs() {
  const [jobs, setJobs] = useState([]);

  async function load() {
    const { data } = await api.get("/jobs/recruiter/mine");
    setJobs(data);
  }

  useEffect(() => { load(); }, []);

  async function closeJob(id) {
    if (!confirm("Close this job?")) return;
    await api.delete(`/jobs/${id}`);
    load();
  }

  return (
    <>
      <div className="page-heading">
        <h1>My Jobs</h1>
        <Link className="button" to="/recruiter/jobs/new">Post New Job</Link>
      </div>

      <div className="grid">
        {jobs.map(job => (
          <div className="card" key={job._id}>
            <h3>{job.title}</h3>
            <p>{job.location} · {job.jobType}</p>
            <span className="status">{job.isActive ? "Active" : "Closed"}</span>
            <div className="actions">
              <Link className="button secondary" to={`/recruiter/applicants/${job._id}`}>
                Applicants
              </Link>
              {job.isActive && (
                <button className="button danger" onClick={() => closeJob(job._id)}>
                  Close
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
