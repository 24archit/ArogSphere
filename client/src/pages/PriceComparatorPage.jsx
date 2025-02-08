import { useEffect, useState } from "react";
import SearchComponent from "../components/SearchComponent";
import SearchResults from "../components/SearchResults";
import LoadingSkeleton from "../components/LoadingSkeleton"; // Import the loading component
import { search } from "../api/priceComparator";
import { useSearchParams } from "react-router-dom";

export default function PriceComparatorPage() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");

  const fetchSearchResults = async () => {
    try {
      setLoading(true); // Start loading before fetching data
      const results = await search(searchQuery);
      console.log(results)
      setSearchResults(results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Stop loading after fetching
    }
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  useEffect(() => {
    fetchSearchResults();
  }, [searchQuery]);

  return (
    <div>
      <SearchComponent />
      {loading ? <LoadingSkeleton /> : <SearchResults results={searchResults} />}
    </div>
  );
}
