import * as React from "react";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Button } from "@mui/material";
import "../../assets/styles/MultiValue.css"; // Importing the CSS file

export default function MultiValue() {
  const [options, setOptions] = React.useState([]);
  const [value, setValue] = React.useState([]);
  const [predictions, setPredictions] = React.useState(null);

  // Fetch symptoms from the API
  const getAllSymptoms = async () => {
    try {
      const response = await fetch(
        "https://disease-prediction-system-flask-1.onrender.com/getAllSymptoms"
      );
      const data = await response.json();
      if (data?.Symptoms) {
        setOptions(data.Symptoms.map((symptom) => ({ title: symptom })));
      }
    } catch (error) {
      console.error("Error fetching symptoms:", error);
    }
  };

  const getPrediction = async () => {
    if (value.length === 0) {
      return alert("Please select symptoms to predict disease");
    }
    try {
      const symptoms = value.map((val) => val.title);
      const response = await fetch(
        "https://disease-prediction-system-flask-1.onrender.com/predict",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ symptoms }),
        }
      );
      const data = await response.json();
      if (data.success) {
        setPredictions(data.predictions);
      } else {
        alert("Prediction failed, try again.");
      }
    } catch (error) {
      console.error("Error fetching predictions:", error);
    }
  };

  React.useEffect(() => {
    getAllSymptoms();
  }, []);

  return (
    <div className="container">
      <div className="input-section">
        <h2>Symptom-Based Disease Prediction</h2>
        <p>Select symptoms and get an AI-powered prediction.</p>

        <Autocomplete
          multiple
          id="symptoms-autocomplete"
          value={value}
          onChange={(event, newValue) => setValue(newValue)}
          options={options}
          getOptionLabel={(option) => option.title}
          renderTags={(tagValue, getTagProps) =>
            tagValue.map((option, index) => (
              <Chip
                key={index}
                label={option.title}
                {...getTagProps({ index })}
              />
            ))
          }
          className="autocomplete"
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Symptoms"
              placeholder="Start typing..."
              sx={{ marginBottom: "1rem" }}
            />
          )}
        />
        <Button
          onClick={getPrediction}
          variant="contained"
          className="predict-btn"
        >
          Predict Disease
        </Button>
      </div>

      {predictions && (
        <div className="results-section">
          <h3>Prediction Results</h3>
          <div className="result-card">
            <h4>Disease Detected</h4>
            <p className="disease-name">{predictions.disease}</p>
          </div>
          <div className="result-card">
            <h4>Description</h4>
            <p className="description">{predictions.description}</p>
          </div>
          <div className="precaution-section">
            <h4>Precautions</h4>
            <ul>
              {predictions.precautions.split(",").map((precaution, index) => (
                <li key={index}>{precaution.trim()}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
