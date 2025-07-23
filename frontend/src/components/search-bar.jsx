import React, { useState } from "react";
import axios from "axios";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await axios.post("http://localhost:8000/search", { query });
      setResults(res.data.results);
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  return (
    <div className="p-4">
      <input
        className="border p-2 w-full"
        type="text"
        placeholder="..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className="mt-2 p-2 bg-blue-600 text-white"
        onClick={handleSearch}
      >
        Search
      </button>

      <div className="mt-4">
        {results.map((r, i) => (
          <div key={i} className="p-3 border rounded mb-3">
            <p className="font-bold">Context:</p>
            <p>{r.context}</p>
            <p className="text-sm text-gray-600">Score: {r.score.toFixed(4)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;
