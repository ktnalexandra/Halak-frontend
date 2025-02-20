import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HalakList from './components/HalakList';
import Hal from './components/Hal';
import HalEdit from './components/HalEdit';
import AddHal from './components/AddHal';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HalakList />} />
        <Route path="/hal/:id" element={<Hal />} />
        <Route path="/hal/:id/edit" element={<HalEdit />} />
        <Route path="/add-hal" element={<AddHal />} />
      </Routes>
    </Router>
  );
};

export default App;
