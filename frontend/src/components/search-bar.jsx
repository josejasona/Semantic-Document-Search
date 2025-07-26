import React, { useState, useCallback, useEffect } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim() !== "") {
      onSearch(query);
    }
  };

  const sendQuery = async (query) => {
    const res = await fetch("http://localhost:8000/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const data = await res.json();
    console.log("Search results:", data.results);
    // Now display these in your React component
  };

  return (
    <div className="flex flex-row items-center gap-2 border-4 border-yellow-500">
      <input
        className="flex-grow bg-white px-2 py2"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      ></input>
      <button
        className="bg-blue-500 text-white ml-auto text-right rounded px-2 py-2"
        type="Submit"
        onClick={sendQuery}
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
