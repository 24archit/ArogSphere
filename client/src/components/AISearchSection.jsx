import Heading from "./Heading";
import "../../assets/styles/AISearchSection.css";  

import Button from "./Button";
export default function AISearchSection() {
  return (
    <div className="ai-search-section">
      <div className="ai-search-content">
        <Heading text="AI-Powered Health Predictions at Your Fingertips" />
        <div className="ai-input-container">
          <input 
            type="text" 
            className="ai-input" 
            placeholder="Enter your symptoms (e.g., fever, headache)"
          />
          <input 
            type="number" 
            className="ai-input" 
            placeholder="Enter your age"
          />
         <Button role="Predict Now"/>
        </div>
        
        <div className="ai-info-box">
          <h3>How It Works?</h3>
          <ul>
            <li>✔ Enter your symptoms and age.</li>
            <li>✔ Our AI analyzes patterns from medical databases.</li>
            <li>✔ Get possible conditions and next steps instantly.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
