import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="hero">
      <div>
        <span className="eyebrow">MERN Job Recruitment Platform</span>
        <h1>Find a job you actually want.</h1>
        <p>
          Search jobs, build your profile, apply in seconds and track every
          application from one dashboard.
        </p>
        <div className="actions">
          <Link className="button" to="/jobs">Explore Jobs</Link>
          <Link className="button secondary" to="/register">Create Account</Link>
        </div>
      </div>

      <div className="hero-card">
        <h3>JobPortal</h3>
        <p>Students · Recruiters · Companies</p>
        <div className="stat-grid">
          <div><strong>100+</strong><span>Jobs</span></div>
          <div><strong>50+</strong><span>Companies</span></div>
          <div><strong>3</strong><span>User Roles</span></div>
        </div>
      </div>
    </section>
  );
}
