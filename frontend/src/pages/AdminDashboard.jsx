import { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);

  async function load() {
    const [a, b, c] = await Promise.all([
      api.get("/admin/dashboard"),
      api.get("/admin/users"),
      api.get("/admin/jobs")
    ]);
    setStats(a.data);
    setUsers(b.data);
    setJobs(c.data);
  }

  useEffect(() => { load(); }, []);

  async function deleteUser(id) {
    if (!confirm("Delete this user?")) return;
    await api.delete(`/admin/users/${id}`);
    load();
  }

  async function deleteJob(id) {
    if (!confirm("Delete this job?")) return;
    await api.delete(`/admin/jobs/${id}`);
    load();
  }

  return (
    <>
      <div className="page-heading"><h1>Admin Dashboard</h1></div>

      <div className="stat-grid dashboard-stats">
        <div className="card"><strong>{stats.users || 0}</strong><span>Users</span></div>
        <div className="card"><strong>{stats.students || 0}</strong><span>Students</span></div>
        <div className="card"><strong>{stats.recruiters || 0}</strong><span>Recruiters</span></div>
        <div className="card"><strong>{stats.jobs || 0}</strong><span>Jobs</span></div>
        <div className="card"><strong>{stats.companies || 0}</strong><span>Companies</span></div>
        <div className="card"><strong>{stats.applications || 0}</strong><span>Applications</span></div>
      </div>

      <h2>Users</h2>
      <div className="table-wrap card">
        <table>
          <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Action</th></tr></thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td><button className="button danger" onClick={() => deleteUser(user._id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Jobs</h2>
      <div className="table-wrap card">
        <table>
          <thead><tr><th>Title</th><th>Company</th><th>Recruiter</th><th>Action</th></tr></thead>
          <tbody>
            {jobs.map(job => (
              <tr key={job._id}>
                <td>{job.title}</td>
                <td>{job.company?.name}</td>
                <td>{job.recruiter?.name}</td>
                <td><button className="button danger" onClick={() => deleteJob(job._id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
