import { useState , useEffect } from "react";
import notesData from "../../model/notes.json";

const NotesHome = () => {
    const [search , setSearch] = useState("");
    const [notes, setNotes] = useState(notesData);

    useEffect(() => {
        setNotes(notesData);
    }, []);

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.content.toLowerCase().includes(search.toLowerCase())
    );

    const handleCreate = (title, content) => {
        const newNote = {
            title,
            content,
            created_at: new Date().toString()
        };
        setNotes([...notes, newNote]);
    };

    const handleDelete = (index) => {
        const newNotes = [...notes];
        newNotes.splice(index, 1);
        setNotes(newNotes);
    }
  return (
    <div>
        <h1>Dashboard</h1>
        <div>
            <form>
                <label htmlFor="search">Search</label>
                <input
                   type="text"
                   id="search"
                   name="search"
                   value={search}
                   onChange= {(e) => setSearch(e.target.value)}
                />
            </form>
            <div>
                <h1>Notes</h1>
                <div>
                    {filteredNotes.map((note, index) => (
                        <div key={index}>
                            <h3>{note.title}</h3>
                            <p>{note.content}</p>
                            <p>{note.created_at.toString()}</p>
                            <button onClick={()=> handleDelete(index)}>Delete</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default NotesHome