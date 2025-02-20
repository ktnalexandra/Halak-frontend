import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';  

const HalakList = () => {
  const [halak, setHalak] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://localhost:7067/api/Halak')
      .then(response => {
        setHalak(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Biztosan törölni szeretnéd ezt a halat?")) {
      axios.delete(`https://localhost:7067/api/Halak/${id}`)
        .then(() => {
          setHalak(halak.filter(hal => hal.id !== id));
        })
        .catch(error => {
          console.error('Hiba történt a törlés közben:', error);
        });
    }
  };

  return (
    <div className="halak-list">
      <h1>Halak Listája</h1>
      <ul>
        {halak.map(hal => (
          <li key={hal.id}>
            <h2>{hal.nev}</h2>
            <p>Faj: {hal.faj}</p>
            <p>Méret: {hal.meretCm} cm</p>
            <img src={`data:image/jpeg;base64,${hal.kep}`} alt={hal.nev} />
            <div className="halak-actions">
              <Link to={`/hal/${hal.id}`}>
                <button className="details-btn">Részletek</button>
              </Link>
              <button onClick={() => navigate(`/hal/${hal.id}/edit`)}>Módosítás</button>
              <button onClick={() => handleDelete(hal.id)}>Törlés</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HalakList;
