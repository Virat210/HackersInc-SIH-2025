import React, { useState } from "react";
import Select from "react-select";
import "./style.css"

function App() {
  const [crop, setCrop] = useState(null);
  const [season, setSeason] = useState(null);
  const [state, setState] = useState(null);
  const [result, setResult] = useState("");

  const statesOfIndia = [
    "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa",
    "Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala",
    "Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland",
    "Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura",
    "Uttar Pradesh","Uttarakhand","West Bengal","Delhi","Jammu and Kashmir","Ladakh"
  ].map((s) => ({ value: s, label: s }));

  const crops = [
    "Rice","Wheat","Maize","Barley","Bajra","Jowar","Sugarcane","Cotton",
    "Mustard","Soybean","Pulses","Groundnut","Tea","Coffee","Potato","Onion","Tomato"
  ].map((c) => ({ value: c, label: c }));

  const seasons = ["Kharif","Rabi","Zaid"].map((s) => ({ value: s, label: s }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (crop && season && state) {
      setResult(
        `🌾 Predicting yield for **${crop.value}** in **${season.value}** season at 📍 ${state.value}`
      );
    }
  };

  return (
    <div className="app-container">
      <h2>🌱 AI-Powered Crop Yield Prediction</h2>
      <form onSubmit={handleSubmit}>
        
        {/* Crop */}
        <label>Select Crop</label>
        <Select
          options={crops}
          value={crop}
          onChange={setCrop}
          placeholder="Type or select crop..."
          isSearchable
        />

        {/* Season */}
        <label>Select Season</label>
        <Select
          options={seasons}
          value={season}
          onChange={setSeason}
          placeholder="Type or select season..."
          isSearchable
        />

        {/* State */}
        <label>Select State</label>
        <Select
          options={statesOfIndia}
          value={state}
          onChange={setState}
          placeholder="Type or select state..."
          isSearchable
        />

        <button type="submit">🌿 Predict Yield</button>
      </form>

      {result && <div className="result-card">{result}</div>}
    </div>
  );
}

export default App;
