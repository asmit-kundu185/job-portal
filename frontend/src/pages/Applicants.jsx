import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

const statuses = [
  "Applied", "Under Review", "Shortlisted",
  "Interview", "Selected", "Rejected"
];

export default function Applicants() {
  const { jobId } = useParams();
  const [apps, setApps] = useState([]);

  async function load() {
    const { data } = await api.get(`/applications/job/${jobId}`);
    setApps(data);
  }

  useEffect(() => { load(); }, [jobId]);

  async function changeStatus(id, status) {
    await api.put(`/applications/${id}/status`, { status });
    load();
  }

  return (
    <>
      <div className="page-heading">
        <h1>Applicants</h1>
      </div>

      <div className="grid">
        {apps.map(app => (
          <div className="card" key={app._id}>
            <h2>{app.student.name}</h2>
            <p>{app.student.email}</p>
            <p>{app.student.education}</p>
            <p>Skills: {(app.student.skills || []).join(", ")}</p>

            {app.student.resume && (
              <a href={app.student.resume} target="_blank" rel="noreferrer">
                View Resume
              </a>
            )}

            <p className="pre">{app.coverLetter || "No cover letter."}</p>

            <label>Status</label>
            <select
              value={app.status}
              onChange={e => changeStatus(app._id, e.target.value)}
            >
              {statuses.map(status => <option key={status}>{status}</option>)}
            </select>
          </div>
        ))}
      </div>
    </>
  );
}
