import React, { useState, useRef, useEffect } from 'react';
import { useAppDispatch } from './app/hooks';
import { Main } from './layout/Main';
import Home from './pages/home';

import './App.css';


function App() {
  return (
    <div className="screen">
      <Home />
      {/*
      <Main></Main>
      */}
    </div>
  );
}

export default App;
