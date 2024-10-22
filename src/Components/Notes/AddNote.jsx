import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import '../../css/Note.css';
import axios from 'axios';

const AddNote = () => {
  const navigate = useNavigate();
  const [note, setNote] = useState({ title: "Title", description: "Add your Content here"});
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(storedNotes);
  }, []);

  const addNote = async () => {
    const newNote = { ...note, id: uuidv4()};
    try {
      const response = await axios.post("https://notes-backend-x9sp.onrender.com/notes", newNote);
      const updatedNotes = [...notes, response.data];
      setNotes(updatedNotes);
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
      navigate('/notes');
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const handleTitleChange = (e) => {
    setNote(prevNote => ({ ...prevNote, title: e.target.value }));
  };

  const handleContentChange = (e) => {
    setNote(prevNote => ({ ...prevNote, description: e.target.value }));
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
        value={note.description}
        onChange={handleContentChange}
        placeholder=""
      />
      <div className='btns'>
        <button type="button" className='button' onClick={addNote}>Save</button>
        <button type="button" className='button' onClick={handleBack}>Back</button>
      </div>
    </form>
  );
};

export default AddNote;