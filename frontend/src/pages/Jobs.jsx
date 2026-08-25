import { useEffect, useState } from "react";
import api from "../services/api";
import JobCard from "../components/JobCard";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    search: "", location: "", jobType: "", experience: ""
  });
  const [loading, setLoading] = useState(false);

  async function loadJobs() {
    setLoading(true);
    try {
      const { data } = await api.get("/jobs", { params: filters });
      setJobs(data.jobs);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadJobs(); }, []);

  function submit(e) {
    e.preventDefault();
    loadJobs();
  }

  return (
    <>
      <div className="page-heading">
        <div>
          <h1>Find Jobs</h1>
          <p className="muted">Search and filter opportunities.</p>
        </div>
      </div>

      <form className="filter card" onSubmit={submit}>
        <input
          placeholder="Search title or skill"
          value={filters.search}
          onChange={e => setFilters({...filters, search: e.target.value})}
        />
        <input
          placeholder="Location"
          value={filters.location}
          onChange={e => setFilters({...filters, location: e.target.value})}
        />
        <select
          value={filters.jobType}
          onChange={e => setFilters({...filters, jobType: e.target.value})}
        >
          <option value="">All types</option>
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Internship</option>
          <option>Contract</option>
          <option>Remote</option>
        </select>
        <input
          placeholder="Experience"
          value={filters.experience}
          onChange={e => setFilters({...filters, experience: e.target.value})}
        />
        <button className="button">Search</button>
      </form>

      {loading ? <p>Loading jobs...</p> : (
        <div className="grid">
          {jobs.length ? jobs.map(job => <JobCard key={job._id} job={job} />) :
            <div className="card"><h3>No jobs found</h3><p>Try different filters.</p></div>}
        </div>
      )}
    </>
  );
}
