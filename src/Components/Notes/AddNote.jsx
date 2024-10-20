import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import '../../css/Note.css';

const AddNote = () => {
  const navigate = useNavigate();
  const [note, setNote] = useState({ title: "Title", content: "Add your Content here", created_at: "" });
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(storedNotes);
  }, []);

  const handleTitleChange = (e) => {
    setNote(prevNote => ({ ...prevNote, title: e.target.value }));
  };

  const handleContentChange = (e) => {
    setNote(prevNote => ({ ...prevNote, content: e.target.value }));
  };

  const handleSave = () => {
    const newNote = { ...note, id: uuidv4(), created_at: new Date().toISOString() };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    navigate('/notes');
  };

  const handleBack = () => {
    navigate('/notes');
  };

  return (
    <form className='show-note' onSubmit={(e) => e.preventDefault()}>
      <h2>
        <input
          type="text"
          value={note.title}
          onChange={handleTitleChange}
          placeholder=""
        />
      </h2>
      <textarea
        value={note.content}
        onChange={handleContentChange}
        placeholder=""
      />
      <div className='btns'>
        <button type="button" className='button' onClick={handleSave}>Save</button>
        <button type="button" className='button' onClick={handleBack}>Back</button>
      </div>
    </form>
  );
};

export default AddNote;