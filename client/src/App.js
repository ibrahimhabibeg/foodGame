import './App.css'
import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import EasyGame from './pages/EasyGame/EasyGame';
import HardGame from './pages/HardGame/HardGame';
import UnbeatableGame from './pages/UnbeatableGame/UnbeatableGame';

export default function App() {
  return (
    <Router>
        <Routes>
          <Route exact path='/' element={<LandingPage/>} />
          <Route exact path='/easy' element={<EasyGame/>} />
          <Route exact path='/hard' element={<HardGame/>} />
          <Route exact path='/unbeatable' element={<UnbeatableGame/>} />
        </Routes>
    </Router>
  );
}

