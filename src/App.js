import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import AppRouter from './Routes';
import Header from './Pages/Header';
import Footer from './Pages/Footer';





function App() {
  return (
    <>
      <div className="App">
         <Header /> 
        <AppRouter />
        <Footer />
      </div>
    </>
  );
}

export default App;
