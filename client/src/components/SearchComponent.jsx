import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/SearchComponent.css";

const SearchComponent = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <div className="search-box">
        <h2 className="typewriter">
          Find the Best Medicine Prices in Real-Time – Compare & Save Instantly!
        </h2>
        <div className="search-input-container">
          <input
            type="text"
            className="search-bar"
            placeholder="Search for medicines..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown} // Listen for Enter key
          />
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
