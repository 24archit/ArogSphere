import {useNavigate} from 'react-router-dom'
import Heading from "./Heading";
import "../../assets/styles/AISearchSection.css";  

export default function AISearchSection() {

  const navigate=useNavigate()

  const clickOnPredict=()=>{
    navigate("/ai-disease-prediction")
  }

  return (
    <div className="ai-search-section">
      <div className="ai-search-content">
        <Heading text="AI-Powered Health Predictions at Your Fingertips" />
        <div className="ai-input-container">
          {/* <input 
            type="text" 
            className="ai-input" 
            placeholder="Enter your symptoms (e.g., fever, headache)"
          />
          <input 
            type="number" 
            className="ai-input" 
            placeholder="Enter your age"
          /> */}
         <button onClick={clickOnPredict} className="ai-search-button">Start Predicting</button>
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
