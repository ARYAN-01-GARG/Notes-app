import { useState, useEffect, useContext, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../css/Note.css';
import { UserContext } from '../../context/UserContext';

const Note = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState({ title: "", description: "" });
  const [isChanged, setIsChanged] = useState(false);
  const { sessionId, notes, setNotes } = useContext(UserContext);

  const getNote = useCallback(async () => {
    try {
      const response = await axios.get(`https://notes-backend-x9sp.onrender.com/notes/${id}`, {
        headers: {
          'Authorization': `Bearer ${sessionId}`,
        }
      });
      setNote(response.data.data);
    } catch (error) {
      console.error("Error fetching note:", error);
    }
  }, [id, sessionId]);

  const updateNote = async () => {
    try {
      const response = await axios.put(`https://notes-backend-x9sp.onrender.com/notes/${id}`, note, {
        headers: {
          'Authorization': `Bearer ${sessionId}`,
        }
      });
      const updatedNote = response.data.data;
      const updatedNotes = notes.map(n => n._id === id ? updatedNote : n);
      setNotes(updatedNotes);
      setIsChanged(false);
      navigate('/notes');
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://notes-backend-x9sp.onrender.com/notes/${id}`, {
        headers: {
          'Authorization': `Bearer ${sessionId}`,
        }
      });
      const updatedNotes = notes.filter(n => n._id !== id);
      setNotes(updatedNotes);
      navigate('/notes');
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  useEffect(() => {
    getNote();
  }, [getNote]);

  const handleTitleChange = (e) => {
    setNote(prevNote => ({ ...prevNote, title: e.target.value }));
    setIsChanged(true);
  };

  const handleContentChange = (e) => {
    setNote(prevNote => ({ ...prevNote, description: e.target.value }));
    setIsChanged(true);
  };

  const handleSave = () => {
    updateNote();
  };

  const handleBack = () => {
    navigate('/notes');
  };

  return (
    <form className='show-note' onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        value={note.title}
        onChange={handleTitleChange}
        maxLength={50}
      />
      <textarea
        value={note.description}
        onChange={handleContentChange}
      />
      <div className='btns'>
        {isChanged ? (
          <button type="button" className='button' onClick={handleSave}>Save</button>
        ) : (
          <button type="button" onClick={handleBack} className='button'>Back</button>
        )}
        <button type="button" onClick={handleDelete} className='delete-btn button'>Delete</button>
      </div>
    </form>
  );
};

export default Note;