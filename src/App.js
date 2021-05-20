import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import AppRouter from './Routes';
import Footer from './Component/Footer';





function App() {
  return (
    <>
      <div className="App">
         
        <AppRouter />
        <Footer />
      </div>
    </>
  );
}

export default App;
