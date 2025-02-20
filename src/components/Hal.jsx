import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HalakList.css';

const Hal = () => {
  const { id } = useParams(); 
  const [hal, setHal] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    axios.get(`https://localhost:7067/api/Halak/${id}`)
      .then(response => {
        setHal(response.data);
      })
      .catch(error => {
        console.error('Hiba történt a hal adatok betöltése közben:', error);
      });
  }, [id]);

  const handleBackClick = () => {
    navigate('/'); 
  };

  if (!hal) {
    return <p>Betöltés...</p>;
  }

  return (
    <div className="hal-details">
      <h1>{hal.nev} Részletek</h1>
      <img src={`data:image/jpeg;base64,${hal.kep}`} alt={hal.nev} />
      <p>Faj: {hal.faj}</p>
      <p>Méret: {hal.meretCm} cm</p>
      <p>Leírás: {hal.leiras}</p>

      <button className="back-btn" onClick={handleBackClick}>
        Vissza
      </button>
    </div>
  );
};

export default Hal;
