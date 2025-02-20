import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './HalakList.css';

const AddHal = () => {
  const [hal, setHal] = useState({
    nev: '',
    faj: '',
    meretCm: '',
    kep: ''
  });

  const navigate = useNavigate(); // useNavigate hook meghívása

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHal(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ellenőrizzük, hogy minden adat kitöltésre került
    if (!hal.nev || !hal.faj || !hal.meretCm || !hal.kep) {
      alert("Minden mezőt ki kell tölteni!");
      return;
    }

    // Axios kérés küldése a szerverre
    axios.post('https://localhost:7067/api/Halak', hal)
      .then(response => {
        // Sikeres kérés után navigálunk a halak listájához
        navigate('/Halak');  // Navigálás a halak listájára
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.errors) {
          console.error('Validációs hibák:', error.response.data.errors);
          alert('Hiba történt a hal hozzáadása közben: ' + JSON.stringify(error.response.data.errors));
        } else {
          console.error('Hiba történt:', error);
          alert('Hiba történt a hal hozzáadása közben.');
        }
      });
  };

  return (
    <div>
      <h1>Új hal hozzáadása</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Hal neve:</label>
          <input
            type="text"
            name="nev"
            value={hal.nev}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Faj:</label>
          <input
            type="text"
            name="faj"
            value={hal.faj}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Méret (cm):</label>
          <input
            type="number"
            name="meretCm"
            value={hal.meretCm}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Kép URL:</label>
          <input
            type="text"
            name="kep"
            value={hal.kep}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Hal hozzáadása</button>
      </form>
    </div>
  );
};

export default AddHal;
