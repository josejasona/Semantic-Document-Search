import React, { useState, useCallback, useEffect } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    if (query.trim() !== "") {
      onSearch(query);
    }
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
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
