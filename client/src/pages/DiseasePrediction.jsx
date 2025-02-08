import React, { useEffect } from "react";
import MultiValue from "../components/MultiValue";
import "../../assets/styles/DiseasePrediction.css"; // Importing CSS

const DiseasePrediction = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="disease-container">
      {/* Background Section */}
      <div className="background-image">
        <div className="overlay"></div>
      </div>

      {/* Content Section */}
      <div className="content">
        <h1 className="heading">Disease Prediction System</h1>
        <div className="input-container">
          <MultiValue />
        </div>
      </div>
    </div>
  );
};

export default DiseasePrediction;
