import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Board from './components/board/Board';
import Login from './components/login/Login';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/board" element={<Board />} />
      </Routes>
    </Router>
  );
}

export default App;