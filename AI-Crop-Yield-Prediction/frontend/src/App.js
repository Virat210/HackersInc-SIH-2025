import React, { useState } from "react";
import Select from "react-select";
import "./style.css";

function App() {
  const [crop, setCrop] = useState(null);
  const [season, setSeason] = useState(null);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(2024);
  const [state, setState] = useState(null);
  const [district, setDistrict] = useState("");
  const [area, setArea] = useState("");
  const [soil, setSoil] = useState(null);
  const [language, setLanguage] = useState({ value: "en", label: "English" });
  const [result, setResult] = useState("");

  // Months based on season
  const monthMapping = {
    Kharif: ["June", "July", "August", "September", "October"],
    Rabi: ["November", "December", "January", "February", "March"],
    Zaid: ["April", "May"],
  };

  // Crops
  const crops = [
    "Rice","Wheat","Maize","Barley","Bajra","Jowar","Sugarcane","Cotton",
    "Mustard","Soybean","Pulses","Groundnut","Tea","Coffee","Potato","Onion","Tomato",
  ].map((c) => ({ value: c, label: c }));

  // Seasons
  const seasons = ["Kharif", "Rabi", "Zaid"].map((s) => ({ value: s, label: s }));

  // States
  const statesOfIndia = [
    "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana",
    "Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur",
    "Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana",
    "Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Delhi","Jammu and Kashmir","Ladakh",
  ].map((s) => ({ value: s, label: s }));

  // Crop-Soil mapping
  const cropSoilMapping = {
    Rice: ["Alluvial", "Clay", "Loamy"],
    Wheat: ["Alluvial", "Loamy"],
    Maize: ["Loamy", "Red"],
    Barley: ["Loamy", "Black"],
    Bajra: ["Black", "Red", "Laterite"],
    Jowar: ["Red", "Black"],
    Sugarcane: ["Alluvial", "Loamy"],
    Cotton: ["Black", "Red"],
    Mustard: ["Loamy", "Alluvial"],
    Soybean: ["Black", "Red", "Loamy"],
    Pulses: ["Red", "Loamy"],
    Groundnut: ["Red", "Laterite"],
    Tea: ["Laterite", "Acidic"],
    Coffee: ["Laterite", "Acidic"],
    Potato: ["Loamy", "Alluvial"],
    Onion: ["Loamy", "Alluvial"],
    Tomato: ["Loamy", "Red"]
  };

  // Fertilizer & pesticide recommendations
  const recommendations = {
    Rice: { fertilizer: "Urea, DAP, MOP", pesticide: "Buprofezin, Chlorpyrifos" },
    Wheat: { fertilizer: "Urea, DAP, MOP", pesticide: "Carbendazim, Imidacloprid" },
    Maize: { fertilizer: "NPK (High N)", pesticide: "Thiamethoxam, Mancozeb" },
    Barley: { fertilizer: "NPK balanced", pesticide: "Fungicides for leaf rust" },
    Bajra: { fertilizer: "NPK 10-26-26", pesticide: "Stem borer insecticide" },
    Jowar: { fertilizer: "NPK balanced", pesticide: "Aphid insecticide" },
    Sugarcane: { fertilizer: "High N fertilizer", pesticide: "Fipronil" },
    Cotton: { fertilizer: "NPK 10-26-26", pesticide: "Bollworm insecticide" },
    Mustard: { fertilizer: "DAP, Urea", pesticide: "White rust fungicide" },
    Soybean: { fertilizer: "NPK 20-20-20", pesticide: "Leaf miner insecticide" },
    Pulses: { fertilizer: "DAP, NPK", pesticide: "Pod borer insecticide" },
    Groundnut: { fertilizer: "Phosphorus rich fertilizers", pesticide: "Endosulfan" },
    Tea: { fertilizer: "Nitrogen, Potassium", pesticide: "Red spider mite insecticide" },
    Coffee: { fertilizer: "Organic manure, NPK", pesticide: "Coffee borer beetle pesticide" },
    Potato: { fertilizer: "NPK balanced", pesticide: "Late blight fungicide" },
    Onion: { fertilizer: "NPK 10-26-26", pesticide: "Thrips insecticide" },
    Tomato: { fertilizer: "Balanced NPK, Calcium", pesticide: "Leaf miner and blight control" }
  };

  // Crop to main season mapping
  const cropSeasonMapping = {
    Rice: "Kharif",
    Wheat: "Rabi",
    Maize: "Kharif",
    Barley: "Rabi",
    Bajra: "Kharif",
    Jowar: "Kharif",
    Sugarcane: "Rabi",
    Cotton: "Kharif",
    Mustard: "Rabi",
    Soybean: "Kharif",
    Pulses: "Rabi",
    Groundnut: "Kharif",
    Tea: "Rabi",
    Coffee: "Rabi",
    Potato: "Rabi",
    Onion: "Rabi",
    Tomato: "Kharif"
  };

  // Crop water requirements
  const waterRequirements = {
    Rice: { water: 1200, advice: "High water requirement. Avoid if irrigation is insufficient." },
    Wheat: { water: 450, advice: "Moderate water requirement. Can be grown with moderate irrigation." },
    Maize: { water: 500, advice: "Moderate water requirement. Ensure regular watering." },
    Barley: { water: 400, advice: "Low-moderate water requirement." },
    Bajra: { water: 300, advice: "Low water requirement. Drought tolerant." },
    Jowar: { water: 350, advice: "Low water requirement. Can tolerate dry conditions." },
    Sugarcane: { water: 1500, advice: "Very high water requirement. Only suitable if water available." },
    Cotton: { water: 600, advice: "Moderate water requirement. Avoid water stress during flowering." },
    Mustard: { water: 350, advice: "Low water requirement. Minimal irrigation needed." },
    Soybean: { water: 500, advice: "Moderate water requirement. Ensure proper irrigation." },
    Pulses: { water: 400, advice: "Moderate water requirement. Avoid waterlogging." },
    Groundnut: { water: 450, advice: "Moderate water requirement. Needs regular watering." },
    Tea: { water: 1200, advice: "High water requirement. Grow only in regions with sufficient rainfall." },
    Coffee: { water: 1200, advice: "High water requirement. Needs irrigation if rainfall is low." },
    Potato: { water: 500, advice: "Moderate water requirement. Keep soil moist." },
    Onion: { water: 400, advice: "Moderate water requirement. Avoid water stress." },
    Tomato: { water: 600, advice: "Moderate water requirement. Regular irrigation improves yield." }
  };

  // Soil options based on selected crop
  const soilOptions = crop
    ? (cropSoilMapping[crop.value] || []).map((s) => ({ value: s, label: s }))
    : [];

  // Month options based on season
  const monthOptions = season
    ? monthMapping[season.value].map((m) => ({ value: m, label: m }))
    : [];

  // Languages
  const languages = [
    { value: "en", label: "English" },
    { value: "hi", label: "हिन्दी (Hindi)" },
  ];

  const translations = {
    en: { title: "🌱 KISAN SAHAYTA", selectCrop: "Select Crop", selectSeason: "Select Season", selectMonth: "Select Month", selectYear: "Select Year", selectState: "Select State", selectDistrict: "Enter District", selectArea: "Enter Area (in acres)", selectSoil: "Select Soil Type", predict: "🌿 Predict Yield", language: "🌐 Language" },
    hi: { title: "🌱 किसान सहायता", selectCrop: "फसल चुनें", selectSeason: "मौसम चुनें", selectMonth: "महीना चुनें", selectYear: "साल चुनें", selectState: "राज्य चुनें", selectDistrict: "जिला दर्ज करें", selectArea: "क्षेत्रफल (एकड़) दर्ज करें", selectSoil: "मिट्टी का प्रकार चुनें", predict: "🌿 उपज का अनुमान", language: "🌐 भाषा" },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!crop || !soil) {
      setResult("⚠️ Please select both Crop and Soil to get prediction and recommendation.");
      return;
    }
    const predictedYield = Math.floor(Math.random() * 100) + 50;
    const rec = recommendations[crop.value] || { fertilizer: "N/A", pesticide: "N/A" };
    const water = waterRequirements[crop.value] || { water: "N/A", advice: "No advice available." };

    setResult(
      <>
        Predicted Yield: {predictedYield} quintals/acre
        <br />
        Fertilizer: {rec.fertilizer}
        <br />
        Pesticide: {rec.pesticide}
        <br />
        💧 Water Required: {water.water} mm per season
        <br />
        💡 Advice: {water.advice}
      </>
    );
  };

  // Auto-set season when crop changes
  const handleCropChange = (selectedCrop) => {
    setCrop(selectedCrop);
    const mainSeason = cropSeasonMapping[selectedCrop.value];
    if (mainSeason) setSeason({ value: mainSeason, label: mainSeason });
    setMonth(null);
    setSoil(null);
  };

  return (
    <div className="app-wrapper">
      <div className="language-topbar">
        <Select options={languages} value={language} onChange={setLanguage} placeholder={translations[language.value]?.language || translations.en.language} isSearchable={false} />
      </div>

      <div className="app-container">
        <h2>{translations[language.value]?.title || translations.en.title}</h2>
        <form onSubmit={handleSubmit} className="form-grid">
          <div>
            <label>{translations[language.value]?.selectCrop}</label>
            <Select options={crops} value={crop} onChange={handleCropChange} className="form-control" />
          </div>

          <div>
            <label>{translations[language.value]?.selectSeason}</label>
            <Select options={seasons} value={season} onChange={setSeason} className="form-control" />
          </div>

          <div>
            <label>{translations[language.value]?.selectMonth}</label>
            <Select options={monthOptions} value={month} onChange={setMonth} className="form-control" />
          </div>

          <div>
            <label>{translations[language.value]?.selectYear}</label>
            <input type="number" value={year} onChange={(e) => setYear(e.target.value)} className="form-control" />
          </div>

          <div>
            <label>{translations[language.value]?.selectState}</label>
            <Select options={statesOfIndia} value={state} onChange={setState} className="form-control" />
          </div>

          <div>
            <label>{translations[language.value]?.selectDistrict}</label>
            <input type="text" value={district} onChange={(e) => setDistrict(e.target.value)} className="form-control" />
          </div>

          <div>
            <label>{translations[language.value]?.selectArea}</label>
            <input type="number" value={area} onChange={(e) => setArea(e.target.value)} className="form-control" />
          </div>

          <div>
            <label>{translations[language.value]?.selectSoil}</label>
            <Select options={soilOptions} value={soil} onChange={setSoil} isSearchable className="form-control" />
          </div>

          <div style={{ gridColumn: "span 2" }}>
            <button type="submit">{translations[language.value]?.predict}</button>
          </div>
        </form>

        {result && <div className="result-card">{result}</div>}
      </div>
    </div>
  );
}

export default App;
