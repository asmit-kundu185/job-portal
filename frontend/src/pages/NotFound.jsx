import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="center">
      <h1>404</h1>
      <p>Page not found.</p>
      <Link className="button" to="/">Go Home</Link>
    </div>
  );
}
