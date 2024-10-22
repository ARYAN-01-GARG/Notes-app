import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/Note.css';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';

const AddNote = () => {
  const navigate = useNavigate();
  const [note, setNote] = useState({ title: "Title", description: "Add your Content here"});
  const {sessionId } = useContext(UserContext);;

  useEffect(() => {
    if (!sessionId) {
      return navigate('/login');
    }
  }, [sessionId, navigate]);

  const addNote = async () => {
    try {
      await axios.post("https://notes-backend-x9sp.onrender.com/notes", note ,{
        headers: {
          'Authorization': `Bearer ${sessionId}`
        }
      }).then(() => {alert("Note added successfully")});
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