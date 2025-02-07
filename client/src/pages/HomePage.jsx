import AISearhSection from "../components/AISearchSection";
import Heading from "../components/Heading";
import HomeService from "../components/HomeService";
import SearchComponent from "../components/SearchComponent";
export default function HomePage() {
  return (
    <div>
      <SearchComponent />
      <HomeService />
      <AISearhSection/>
    </div>
  );
}
