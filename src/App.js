import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Reactbasic from './Reactbasic';
import Reduxprac from'./Reduxprac';

function App(){


  return (
     
       <Router>
       <Routes>
        <Route path="/" element={<Reactbasic/>}/>
        <Route path="/reduxprac" element={<Reduxprac/>}/>
        </Routes>
        </Router>
    
  );
}

export default App;
