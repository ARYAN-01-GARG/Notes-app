import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Notes from "./Pages/Notes";
import AllNotes from "./Components/Notes/AllNotes";
import Note from "./Components/Notes/Note";
import AddNote from "./Components/Notes/AddNote";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/notes" element={<Notes/>}>
        <Route index element={<AllNotes/>} />
      </Route>
      <Route path="/notes/:id" element={<Note/>} />
      <Route path="/add-note" element={<AddNote/>} />
    </Routes>
  )
}

export default App