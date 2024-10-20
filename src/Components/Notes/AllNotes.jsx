import { useState , useEffect ,useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button";

const AllNotes = () => {
    const navigate = useNavigate();
    const [search , setSearch] = useState("");
    const [notes, setNotes] = useState([]);

    const fetchNotes = useCallback(() => {
        const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
        setNotes(storedNotes);
    }, []);

    useEffect(() => {
        fetchNotes();
    }, [fetchNotes]);

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.content.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = (id) => {
        const updatedNotes = notes.filter(n => n.id !== id);
        setNotes(updatedNotes);
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
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
                    <div key={note.id} className="note">
                        <div onClick={() => handleNoteClick(note.id)}>
                            <h3>{note.title}</h3>
                            <p>{note.content.length > 80 ? `${note.content.substring(0, 80)}...` : note.content}</p>
                            <p className="time">{note.created_at.toString()}</p>
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