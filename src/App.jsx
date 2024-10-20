import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Notes from "./Pages/Notes";
import NotesHome from "./Components/Notes/NotesHome";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/notes" element={<Notes/>}>
        <Route index element={<NotesHome/>} />
      </Route>
    </Routes>
  )
}

export default App