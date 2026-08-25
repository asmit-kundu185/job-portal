import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function RecruiterDashboard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    api.get("/jobs/recruiter/mine").then(({ data }) => setJobs(data));
  }, []);

  return (
    <>
      <div className="page-heading">
        <div>
          <h1>Recruiter Dashboard</h1>
          <p className="muted">Manage your hiring pipeline.</p>
        </div>
        <Link className="button" to="/recruiter/jobs/new">Post Job</Link>
      </div>

      <div className="stat-grid dashboard-stats">
        <div className="card"><strong>{jobs.length}</strong><span>Jobs Posted</span></div>
        <div className="card"><strong>{jobs.filter(j => j.isActive).length}</strong><span>Active Jobs</span></div>
        <div className="card"><strong>{jobs.filter(j => !j.isActive).length}</strong><span>Closed Jobs</span></div>
      </div>

      <h2>Recent Jobs</h2>
      <div className="grid">
        {jobs.slice(0, 6).map(job => (
          <div className="card" key={job._id}>
            <h3>{job.title}</h3>
            <p>{job.company?.name}</p>
            <span className={job.isActive ? "status green" : "status"}>
              {job.isActive ? "Active" : "Closed"}
            </span>
            <Link className="button secondary full" to={`/recruiter/applicants/${job._id}`}>
              View Applicants
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
