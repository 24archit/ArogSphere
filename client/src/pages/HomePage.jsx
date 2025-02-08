import AISearhSection from "../components/AISearchSection";
import Heading from "../components/Heading";
import HomeService from "../components/HomeService";
import SearchComponent from "../components/SearchComponent";
import { useEffect } from "react";
export default function HomePage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div>
      <SearchComponent />
      <HomeService />
      <AISearhSection/>
    </div>
  );
}
