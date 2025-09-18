import React, { useState, useEffect } from "react";
import Select from "react-select";
import "./style.css";

function App() {
  const [crop, setCrop] = useState(null);
  const [season, setSeason] = useState(null);
  const [state, setState] = useState(null);
  const [district, setDistrict] = useState(null);
  const [language, setLanguage] = useState({ value: "en", label: "English" });
  const [result, setResult] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  // Dummy district data (replace with real mapping later)
  const districtData = {
    "Uttar Pradesh": ["Lucknow", "Varanasi", "Kanpur", "Agra"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
    "Tamil Nadu": ["Chennai", "Madurai", "Coimbatore"],
    "Bihar": ["Patna", "Gaya", "Bhagalpur"]
  };

  // Custom cursor
  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animate form container on load
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Translations
  const translations = {
    en: { title: "🌱 AI-Powered Crop Yield Prediction", selectCrop: "Select Crop", selectSeason: "Select Season", selectState: "Select State", predict: "🌿 Predict Yield", language: "🌐 Language", warning: "⚠️ Please select crop, season, and state!" },
    hi: { title: "🌱 एआई आधारित फसल उपज पूर्वानुमान", selectCrop: "फसल चुनें", selectSeason: "मौसम चुनें", selectState: "राज्य चुनें", predict: "🌿 उपज पूर्वानुमान", language: "🌐 भाषा", warning: "⚠️ कृपया फसल, मौसम और राज्य चुनें!" },
    bn: { title: "🌱 কৃত্রিম বুদ্ধিমত্তা দ্বারা ফসলের ফলন পূর্বাভাস", selectCrop: "ফসল নির্বাচন করুন", selectSeason: "মৌসুম নির্বাচন করুন", selectState: "রাজ্য নির্বাচন করুন", predict: "🌿 ফলন পূর্বাভাস", language: "🌐 ভাষা", warning: "⚠️ দয়া করে ফসল, মৌসুম এবং রাজ্য নির্বাচন করুন!" },
    te: { title: "🌱 కృత్రిమ మేధస్సుతో పంట ఉత్పత్తి అంచనా", selectCrop: "పంటను ఎంచుకోండి", selectSeason: "కాలాన్ని ఎంచుకోండి", selectState: "రాష్ట్రాన్ని ఎంచుకోండి", predict: "🌿 ఉత్పత్తిని అంచనా వేయండి", language: "🌐 భాష", warning: "⚠️ దయచేసి పంట, కాలం మరియు రాష్ట్రాన్ని ఎంచుకోండి!" },
    ta: { title: "🌱 செயற்கை நுண்ணறிவுடன் பயிர் உற்பத்தி முன்னறிவு", selectCrop: "பயிரை தேர்ந்தெடுக்கவும்", selectSeason: "சீசன் தேர்ந்தெடுக்கவும்", selectState: "மாநிலம் தேர்ந்தெடுக்கவும்", predict: "🌿 உற்பத்தியை கணிக்கவும்", language: "🌐 மொழி", warning: "⚠️ தயவுசெய்து பயிர், சீசன் மற்றும் மாநிலத்தை தேர்ந்தெடுக்கவும்!" },
    mr: { title: "🌱 एआय वापरून पीक उत्पादनाचा अंदाज", selectCrop: "पीक निवडा", selectSeason: "हंगाम निवडा", selectState: "राज्य निवडा", predict: "🌿 उत्पादनाचा अंदाज", language: "🌐 भाषा", warning: "⚠️ कृपया पीक, हंगाम आणि राज्य निवडा!" },
    gu: { title: "🌱 AI દ્વારા પાક ઉત્પાદનની આગાહી", selectCrop: "પાક પસંદ કરો", selectSeason: "મૌસમ પસંદ કરો", selectState: "રાજ્ય પસંદ કરો", predict: "🌿 ઉત્પાદનની આગાહી", language: "🌐 ભાષા", warning: "⚠️ કૃપા કરીને પાક, મૌસમ અને રાજ્ય પસંદ કરો!" },
    kn: { title: "🌱 AI ಬಳಸಿ ಬೆಳೆ ಉತ್ಪಾದನೆ ಅಂದಾಜು", selectCrop: "ಬೆಳೆ ಆಯ್ಕೆಮಾಡಿ", selectSeason: "ಋತುವನ್ನು ಆಯ್ಕೆಮಾಡಿ", selectState: "ರಾಜ್ಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ", predict: "🌿 ಉತ್ಪಾದನೆ ಅಂದಾಜು", language: "🌐 ಭಾಷೆ", warning: "⚠️ ದಯವಿಟ್ಟು ಬೆಳೆ, ಋತುವು ಮತ್ತು ರಾಜ್ಯ ಆಯ್ಕೆಮಾಡಿ!" },
    ml: { title: "🌱 എഐ ഉപയോഗിച്ച് വിളയുടെ ഉത്പാദനം പ്രവചനം", selectCrop: "വളൾ തിരഞ്ഞെടുക്കുക", selectSeason: "കാലാവസ്ഥ തിരഞ്ഞെടുക്കുക", selectState: "സംസ്ഥാനം തിരഞ്ഞെടുക്കുക", predict: "🌿 ഉത്പാദനം പ്രവചിക്കുക", language: "🌐 ഭാഷ", warning: "⚠️ ദയവായി വിള, കാലാവസ്ഥ, സംസ്ഥാനം തിരഞ്ഞെടുക്കുക!" },
    pa: { title: "🌱 ਏਆਈ ਨਾਲ ਫਸਲ ਉਪਜ ਅਨੁਮਾਨ", selectCrop: "ਫਸਲ ਚੁਣੋ", selectSeason: "ਮੌਸਮ ਚੁਣੋ", selectState: "ਰਾਜ ਚੁਣੋ", predict: "🌿 ਉਪਜ ਅਨੁਮਾਨ", language: "🌐 ਭਾਸ਼ਾ", warning: "⚠️ ਕਿਰਪਾ ਕਰਕੇ ਫਸਲ, ਮੌਸਮ ਅਤੇ ਰਾਜ ਚੁਣੋ!" },
    or: { title: "🌱 AI ଦ୍ୱାରା ଫସଲ ଉତ୍ପାଦନ ପୂର୍ବାନୁମାନ", selectCrop: "ଫସଲ ଚୟନ କରନ୍ତୁ", selectSeason: "ମୌସମ ଚୟନ କରନ୍ତୁ", selectState: "ରାଜ୍ୟ ଚୟନ କରନ୍ତୁ", predict: "🌿 ଉତ୍ପାଦନ ପୂର୍ବାନୁମାନ", language: "🌐 ଭାଷା", warning: "⚠️ ଦୟାକରି ଫସଲ, ମୌସମ ଏବଂ ରାଜ୍ୟ ଚୟନ କରନ୍ତୁ!" }
  };

  const statesOfIndia = ["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Delhi","Jammu and Kashmir","Ladakh"].map(s => ({ value: s, label: s }));

  const crops = ["Rice","Wheat","Maize","Barley","Bajra","Jowar","Sugarcane","Cotton","Mustard","Soybean","Pulses","Groundnut","Tea","Coffee","Potato","Onion","Tomato"].map(c => ({ value: c, label: c }));

  const seasons = ["Kharif","Rabi","Zaid"].map(s => ({ value: s, label: s }));

  const languages = [
    { value: "en", label: "English" }, { value: "hi", label: "Hindi" }, { value: "bn", label: "Bengali" },
    { value: "te", label: "Telugu" }, { value: "ta", label: "Tamil" }, { value: "mr", label: "Marathi" },
    { value: "gu", label: "Gujarati" }, { value: "kn", label: "Kannada" }, { value: "ml", label: "Malayalam" },
    { value: "pa", label: "Punjabi" }, { value: "or", label: "Odia" }
  ];

  // ✅ Submit function with backend call
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (crop && season && state && district) {
      try {
        const response = await fetch("http://127.0.0.1:8000/predict", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            State_Name: state.value,
            District_Name: district.value,
            Season: season.value,
            Crop: crop.value
          })
        });
        const data = await response.json();
        if (data.Predicted_Production) {
          setResult(
            `🌾 Predicted yield for **${crop.value}** in **${season.value}** season at 📍 ${district.value}, ${state.value} is **${data.Predicted_Production.toFixed(2)} units**`
          );
        } else {
          setResult("⚠️ Error: " + data.error);
        }
      } catch (err) {
        setResult("⚠️ Server not reachable");
      }
    } else {
      setResult(translations[language.value].warning);
    }
  };

  return (
    <div className="app-wrapper">
      <div className="cursor" style={{ left: mousePos.x, top: mousePos.y }}></div>

      <div className="language-topbar">
        <Select 
          options={languages}
          value={language}
          onChange={setLanguage}
          placeholder={translations[language.value].language}
          isSearchable={false}
        />
      </div>

      <video autoPlay loop muted className="background-video">
        <source src="/field-background.mp4" type="video/mp4" />
      </video>

      <div className={`app-container ${visible ? "visible" : ""}`}>
        <h2>{translations[language.value].title}</h2>
        <form onSubmit={handleSubmit}>
          <label>{translations[language.value].selectCrop}</label>
          <Select options={crops} value={crop} onChange={setCrop} placeholder={translations[language.value].selectCrop + "..."} isSearchable />

          <label>{translations[language.value].selectSeason}</label>
          <Select options={seasons} value={season} onChange={setSeason} placeholder={translations[language.value].selectSeason + "..."} isSearchable />

          <label>{translations[language.value].selectState}</label>
          <Select options={statesOfIndia} value={state} onChange={s => { setState(s); setDistrict(null); }} placeholder={translations[language.value].selectState + "..."} isSearchable />

          {state && (
            <>
              <label>{translations[language.value].selectDistrict}</label>
              <Select 
                options={(districtData[state.value] || []).map(d => ({ value: d, label: d }))}
                value={district}
                onChange={setDistrict}
                placeholder={translations[language.value].selectDistrict + "..."}
                isSearchable
              />
            </>
          )}

          <button type="submit">{translations[language.value].predict}</button>
        </form>

        {result && <div className="result-card">{result}</div>}
      </div>
    </div>
  );
}

export default App;
