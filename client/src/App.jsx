import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar.jsx";
import HomePage from "./pages/HomePage.jsx";
import PriceComparatorPage from "./pages/PriceComparatorPage.jsx";
import DiseasePrediction from "./pages/DiseasePrediction.jsx";
import Estimation from "./pages/Estimation.jsx";
import FindingHospital from "./pages/FindingHospital.jsx";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<main><HomePage/></main>} />
        <Route path="/ai-disease-prediction" element={<main><DiseasePrediction/></main>} />
        <Route path="/treatment-budget" element={<main><FindingHospital/></main>} />
        <Route path="/search" element={<main><PriceComparatorPage/></main>} />
        <Route path="/about" element={<h1>Hi</h1>} />
        <Route path="/services" element={<h1>Hi</h1>} />
        <Route path="/contact" element={<h1>Hi</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
