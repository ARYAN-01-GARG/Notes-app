import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../css/Note.css';

const Note = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState({ title: "", content: "", created_at: "" });
  const [isChanged, setIsChanged] = useState(false);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(storedNotes);
    const foundNote = storedNotes.find(note => note.id === id);
    if (foundNote) {
      setNote(foundNote);
    }
  }, [id]);

  const handleTitleChange = (e) => {
    setNote(prevNote => ({ ...prevNote, title: e.target.value }));
    setIsChanged(true);
  };

  const handleContentChange = (e) => {
    setNote(prevNote => ({ ...prevNote, content: e.target.value }));
    setIsChanged(true);
  };

  const handleSave = () => {
    const updatedNotes = notes.map(n => n.id === id ? note : n);
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    setIsChanged(false);
    navigate('/notes');
  };

  const handleDelete = () => {
    const updatedNotes = notes.filter(n => n.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    navigate('/notes');
  };

  const handleBack = () => {
    navigate('/notes');
    window.location.reload();
  };

  if (!note.id) {
    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "2rem", height: "100vh" }}>Note not found</div>;
  }

  return (
    <form className='show-note' onSubmit={(e) => e.preventDefault()}>
        <input
            type="text"
            value={note.title}
            onChange={handleTitleChange}
        />
        <textarea
            value={note.content}
            onChange={handleContentChange}
        />
        <div className='btns'>
            {isChanged ? <button type="button" className='button' onClick={handleSave}>Save</button> : <button type="button" onClick={() => {handleBack}} className='button'>Back</button>}
            <button type="button" onClick={handleDelete} className='delete-btn button'>Delete</button>
        </div>
    </form>
  );
};

export default Note;