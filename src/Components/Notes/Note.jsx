import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import notesData from '../../model/notes.json';
import '../../css/Note.css';

const Note = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState({ title: "", content: "", created_at: "" });
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    const foundNote = notesData.find(note => note.id === id);
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
    // Simulate saving the note (e.g., update local storage or send to backend)
    const updatedNotes = notesData.map(n => n.id === id ? note : n);
    console.log('Updated notes:', updatedNotes);
    setIsChanged(false);
    navigate('/notes');
  };

  const handleDelete = () => {
    // Simulate deleting the note (e.g., update local storage or send to backend)
    const updatedNotes = notesData.filter(n => n.id !== id);
    console.log('Updated notes after deletion:', updatedNotes);
    navigate('/notes');
  };

  if (!note.id) {
    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "2rem", height: "100vh" }}>Note not found</div>;
  }

  return (
    <form className='show-note' onSubmit={(e) => e.preventDefault()}>
      <h2>
        <input
          type="text"
          value={note.title}
          onChange={handleTitleChange}
        />
      </h2>
      <textarea
        value={note.content}
        onChange={handleContentChange}
      />
      <p>{new Date(note.created_at).toString()}</p>
      {isChanged ? <button type="button" onClick={handleSave}>Save</button> : <button type="button" onClick={() => navigate('/notes')}>Back</button>}
      <button type="button" onClick={handleDelete}>Delete</button>
    </form>
  );
};

export default Note;