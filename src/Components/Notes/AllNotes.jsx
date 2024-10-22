import { useState , useEffect ,useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

const AllNotes = () => {
    const navigate = useNavigate();
    const { sessionId, notes , setNotes } = useContext(UserContext);

    const [search , setSearch] = useState("");

    const fetchNotes = useCallback(async () => {
        try {
            const response = await axios.get("https://notes-backend-x9sp.onrender.com/notes/",{
                headers: {
                    Authorization: `Bearer ${sessionId}`,
            }});
            setNotes(response.data.data);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    }, [sessionId , setNotes]);

    useEffect(() => {
        if (!sessionId) {
            return navigate("/login");
        }
        fetchNotes();
    }, [fetchNotes,navigate,sessionId]);


    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.description.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = async (note) => {
        try {
            await axios.delete(`https://notes-backend-x9sp.onrender.com/notes/${note._id}`, {
                headers: {
                    'Authorization': `Bearer ${sessionId}`,
                    "Content-Type": "application/json",
                }
            });
            const updatedNotes = notes.filter(n => n.note_id !== note.note_id);
            setNotes(updatedNotes);
            localStorage.setItem('notes', JSON.stringify(updatedNotes));
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    }

    const handleNoteClick = (note) => {
        navigate(`/notes/${note._id}`);
    }

return (
    <div className="notes-area">
        <div>
            <div className="heading">
                <h1>Notes</h1>
                <div className="search-box">
                        <form >
                                <label htmlFor="search">Search Notes</label>
                                <input
                                type="text"
                                id="search"
                                name="search"
                                placeholder=""
                                value={search}
                                onChange= {(e) => setSearch(e.target.value)}
                                />
                        </form>
                        <Button label="Add Note" redirectURL="/add-note"/>
                </div>
            </div>
            <div>
                {filteredNotes.length === 0 ?
                        <p>No notes found</p> :
                filteredNotes.map((note) => (
                        <div key={note.note_id} className="note">
                                <div onClick={() => handleNoteClick(note)}>
                                        <h3>{note.title}</h3>
                                        <p>{note.description.length > 80 ? `${note.description.substring(0, 80)}...` : note.description}</p>
                                        <p>{new Date(note.created_at).toLocaleDateString()}</p>
                                </div>
                                <button onClick={()=> handleDelete(note)}>Delete</button>
                        </div>
                ))}
            </div>
        </div>
    </div>
)
}

export default AllNotes;