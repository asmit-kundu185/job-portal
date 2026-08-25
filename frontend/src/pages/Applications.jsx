import { useEffect, useState } from "react";
import api from "../services/api";

export default function Applications() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    api.get("/applications/mine").then(({ data }) => setApps(data));
  }, []);

  return (
    <>
      <div className="page-heading">
        <h1>My Applications</h1>
      </div>

      <div className="grid">
        {apps.map(app => (
          <div className="card" key={app._id}>
            <h2>{app.job?.title}</h2>
            <p>{app.job?.company?.name}</p>
            <p>{app.job?.location}</p>
            <span className="status">{app.status}</span>
            <p className="muted">
              Applied: {new Date(app.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}

        {!apps.length && <div className="card">You have not applied to any jobs yet.</div>}
      </div>
    </>
  );
}
