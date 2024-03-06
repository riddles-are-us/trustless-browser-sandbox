import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Debugger from './pages/debugger';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/debugger" element={<Debugger />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
