import { string } from "prop-types"
import PropTypes from "prop-types"

AddNote.proptypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({string})).isRequired,
}

const AddNote = ({
  notes,
  setNotes
}) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title) {
      alert('Title is required')
      return
    }
    if (!description) {
      alert('Description is required')
      return
    }

    const note = { title, description, created_at: new Date().toISOString() };
    setNotes([note, ...notes]);

    setTitle('')
    setDescription('')
  }
  return (
    <div>
      <div>
        <h1>
          Add Your Note
        </h1>
        <div>
          <form>
            <label htmlFor="title" style={{position:"absolute",left:"99999px"}}>Title</label>
            <input type="text" id="title" value={title} />
          </form>
        </div>

      </div>
    </div>
  )
}

export default AddNote