import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HalakList.css';

const HalEdit = () => {
  const { id } = useParams();
  const [hal, setHal] = useState({
    nev: '',
    faj: '',
    meretCm: '',
    kep: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://localhost:7067/api/Halak/${id}`)
      .then(response => {
        setHal(response.data);
      })
      .catch(error => {
        console.error('Hiba történt a hal adatainak betöltésekor:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHal(prevHal => ({
      ...prevHal,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`https://localhost:7067/api/Halak/${id}`, hal)
      .then(response => {
        navigate(`/hal/${id}`);
      })
      .catch(error => {
        console.error('Hiba történt a hal módosítása közben:', error);
      });
  };

  return (
    <div className="hal-edit">
      <h1>Hal Módosítása</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nev">Név:</label>
          <input
            type="text"
            id="nev"
            name="nev"
            value={hal.nev}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="faj">Faj:</label>
          <input
            type="text"
            id="faj"
            name="faj"
            value={hal.faj}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="meretCm">Méret (cm):</label>
          <input
            type="number"
            id="meretCm"
            name="meretCm"
            value={hal.meretCm}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="kep">Kép URL:</label>
          <input
            type="text"
            id="kep"
            name="kep"
            value={hal.kep}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Módosítás mentése</button>
      </form>
    </div>
  );
};

export default HalEdit;
