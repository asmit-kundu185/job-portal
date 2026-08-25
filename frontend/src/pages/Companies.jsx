import { useEffect, useState } from "react";
import api from "../services/api";

export default function Companies() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    api.get("/companies").then(({ data }) => setCompanies(data));
  }, []);

  return (
    <>
      <div className="page-heading">
        <h1>Companies</h1>
      </div>

      <div className="grid">
        {companies.map(company => (
          <div className="card" key={company._id}>
            <h2>{company.name}</h2>
            <p>{company.location}</p>
            <p>{company.description || "No description available."}</p>
            {company.website && (
              <a href={company.website} target="_blank" rel="noreferrer">
                Visit website
              </a>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
