import Header from "../Components/Header/Header"
import { Outlet } from "react-router-dom"
import "../css/Notes.css"

const Notes = () => {
  return (
    <div className="notes-page">
        <Header/>
        <Outlet/>
    </div>
  )
}

export default Notes