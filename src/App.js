import { Route, Routes} from 'react-router-dom';
import Note from './Notes/Note';
import Todos from './To-dos/Todos.js';
import './App.css'

function App() {

  return (
    <Routes>
      <Route exact path="/" element={<Note />} />
      <Route path="/Todos" element={<Todos />} />
    </Routes>
  );
}

export default App