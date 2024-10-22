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

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://notes-backend-x9sp.onrender.com/notes/${id}`, {
                headers: {
                    'Authorization': `Bearer ${sessionId}`
                }
            });
            const updatedNotes = notes.filter(n => n.note_id !== id);
            setNotes(updatedNotes);
            localStorage.setItem('notes', JSON.stringify(updatedNotes));
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    }

    const handleNoteClick = (id) => {
        navigate(`/notes/${id}`);
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
                                <div onClick={() => handleNoteClick(note.note_id)}>
                                        <h3>{note.title}</h3>
                                        <p>{note.description.length > 80 ? `${note.description.substring(0, 80)}...` : note.description}</p>
                                        <p>{new Date(note.created_at).toLocaleDateString()}</p>
                                </div>
                                <button onClick={()=> handleDelete(note.id)}>Delete</button>
                        </div>
                ))}
            </div>
        </div>
    </div>
)
}

export default AllNotes;