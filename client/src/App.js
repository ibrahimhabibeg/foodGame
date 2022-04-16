import './App.css'
import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import TheGame from './pages/TheGame/TheGame';

export default function App() {
  return (
    <Router>
        <Routes>
          <Route exact path='/' element={<LandingPage/>} />
          <Route exact path='/easy' element={<TheGame/>} />
          <Route exact path='/hard' element={<TheGame/>} />
          <Route exact path='/unbeatable' element={<TheGame/>} />
        </Routes>
    </Router>
  );
}

