import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Notes from "./Pages/Notes";
import AllNotes from "./Components/Notes/AllNotes";
import Note from "./Components/Notes/Note";
import AddNote from "./Components/Notes/AddNote";
import Register from "./Pages/Register";
import LogIn from "./Pages/Login";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route index element={<Home/>} />

        {/* Protected note routes */}
          <Route path="/notes" element={<Notes/>}>
            <Route index element={<AllNotes/>} />
          </Route>
          <Route path="/notes/:id" element={<Note/>} />
          <Route path="/add-note" element={<AddNote/>} />

        {/* login routes */}
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<LogIn/>} />
      </Routes>
    </UserProvider>
  )
}

export default App