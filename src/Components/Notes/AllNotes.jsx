import { useState , useEffect } from "react";
import notesData from "../../model/notes.json";
import { useNavigate } from "react-router-dom";

const AllNotes = () => {
    const navigate = useNavigate();
    const [search , setSearch] = useState("");
    const [notes, setNotes] = useState(notesData);

    useEffect(() => {
        setNotes(notesData);
    }, []);

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.content.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = (index) => {
        const newNotes = [...notes];
        newNotes.splice(index, 1);
        setNotes(newNotes);
    }

    const handleNoteClick = (id) => {
        navigate(`/notes/${id}`);
    }

  return (
    <div className="notes-area">
        <div>
            <div className="heading">
                <h1>Notes</h1>
                <form className="search-box">
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
            </div>
            <div>
                {filteredNotes.length === 0 ? (
                    <div className="no-notes">
                        <h2>No notes found</h2>
                    </div>
                ) :
                filteredNotes.map((note,index) => (
                    <div key={note.id} className="note">
                        <div onClick={() => handleNoteClick(note.id)}>
                            <h3>{note.title}</h3>
                            <p>{note.content.length > 80 ? `${note.content.substring(0, 80)}...` : note.content}</p>
                            <p className="time">{note.created_at.toString()}</p>
                        </div>
                        <button onClick={()=> handleDelete(index)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default AllNotes;