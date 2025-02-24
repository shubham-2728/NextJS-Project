"use client";

import { useEffect, useState } from "react";

export default function UserDocuments() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    async function fetchDocuments() {
      const res = await fetch("/api/upload");
      const data = await res.json();
      setDocuments(data.documents || []);
    }

    fetchDocuments();
  }, []);

  return (
    <div>
      <h2>Uploaded Files:</h2>
      <ul>
        {documents.map((doc) => (
          <li key={doc.id}>{doc.content}</li>
        ))}
      </ul>
    </div>
  );
}
