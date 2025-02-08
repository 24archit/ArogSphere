import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/Navbar.css"; // Using the correct import path
import Logo from "../../assets/media/Logo.png"; // Using the correct import path
const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);

  return (
    <nav className="navbar">
      {/* Links for Desktop */}
      <div className="logo">
        <img src={Logo} alt="ArogSphere Logo" />
      </div>
      <ul className={isMobile ? "nav-links mobile" : "nav-links"}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/ai-disease-prediction">AI Disease Prediction</Link></li>
        <li><Link to="/search">Medicine Price Comparator</Link></li>
        <li><Link to="/treatment-budget">Find Nearby Hospital</Link></li>
        <li><Link to="/govt-schemes">Health Schemes</Link></li>
        <li><Link to="/crowd-sourcing">Crowd Source</Link></li>
        <li><Link to="/articles-awareness">Articles</Link></li>
        <li><Link to="/signup">Sign up</Link></li>
      </ul>
      <button className="hamburger" onClick={() => setIsMobile(!isMobile)}>
        ☰
      </button>
    </nav>
  );
};

export default Navbar;
