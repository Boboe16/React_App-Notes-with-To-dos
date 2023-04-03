import React from "react";
import { Route, Routes } from 'react-router-dom';
import Note from './Notes/Note';
import Todos from './Todos/Todos.js';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Note />} />
      <Route path="/Todos" element={<Todos />} />
    </Routes>
  );
}

export default App
