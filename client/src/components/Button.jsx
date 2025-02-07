import { FaSearch } from "react-icons/fa";
export default function button({role}) {
  return (
    <button className="ai-search-button">
      <FaSearch className="search-icon" /> {role}
    </button>
  );
}
