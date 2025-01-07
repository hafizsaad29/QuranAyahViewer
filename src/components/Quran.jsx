import React, { useEffect, useState } from "react";
import axios from "axios";
// import './App.css';

const QuranAyahViewer = () => {
  const [ayah, setAyah] = useState(null);
  const [translation, setTranslation] = useState(null);
  const [error, setError] = useState(null);
  const [ayahNumber, setAyahNumber] = useState(1);

  const fetchAyah = async (number) => {
    try {
      const response = await axios.get(
        `http://api.alquran.cloud/v1/ayah/${number}/en.asad -`
      );
      const translationResponse = await axios.get(
        `https://api.alquran.cloud/v1/ayah/${number}/ur.junagarhi`
      );
      setAyah(response.data.data);
      setTranslation(translationResponse.data.data);
      setError(null);
    } catch (err) {
      setError("Error fetching Ayah or Translation. Please try again.");
      setAyah(null);
      setTranslation(null);
    }
  };

  useEffect(() => {
    fetchAyah(ayahNumber);
  }, [ayahNumber]);

  const handleInputChange = (e) => {
    setAyahNumber(e.target.value);
  };

  const handleFetchAyah = () => {
    if (ayahNumber > 0) {
      fetchAyah(ayahNumber);
    } else {
      setError("Please enter a valid Ayah number.");
      setAyah(null);
      setTranslation(null);
    }
  };

  return (
    <div className="ayah-container">
      <h1 className="title">Quran Ayah Viewer</h1>
      <div className="input-group">
        <input
          type="number"
          value={ayahNumber}
          onChange={handleInputChange}
          placeholder="Enter Ayah Number"
          className="ayah-input"
        />
        <button onClick={handleFetchAyah} className="fetch-button">
          Fetch Ayah
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      {ayah ? (
        <div className="ayah-card">
          <h2 className="surah-name">Surah: {ayah.surah.englishName}</h2>
          <p className="ayah-text">{ayah.text}</p>
          <p className="ayah-translation">Translation: {translation?.text}</p>
          <p className="ayah-number">Ayah: {ayah.numberInSurah}</p>
        </div>
      ) : (
        !error && <p className="loading">Loading Ayah...</p>
      )}
    </div>
  );
};

export default QuranAyahViewer;
