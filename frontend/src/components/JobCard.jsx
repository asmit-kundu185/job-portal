import { Link } from "react-router-dom";

export default function JobCard({ job }) {
  return (
    <div className="card job-card">
      <div>
        <h3>{job.title}</h3>
        <p className="muted">{job.company?.name || "Company"}</p>
        <p>{job.location || "Location not specified"} · {job.jobType}</p>
        <p>
          {job.salaryMin || job.salaryMax
            ? `₹${job.salaryMin || 0} - ₹${job.salaryMax || 0} LPA`
            : "Salary not disclosed"}
        </p>
      </div>

      <div className="tags">
        {(job.skills || []).slice(0, 5).map(skill => (
          <span className="tag" key={skill}>{skill}</span>
        ))}
      </div>

      <Link className="button" to={`/jobs/${job._id}`}>View Job</Link>
    </div>
  );
}
