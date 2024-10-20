import { useNavigate } from "react-router-dom"
import PropTypes from 'prop-types'
import '../css/Button.css'

Button.propTypes = {
    label : PropTypes.string.isRequired,
    redirectURL: PropTypes.string.isRequired,
    // type: PropTypes.string
};

// Button.defaultProps = {
//     type: "small"
// }

function Button({ label , redirectURL }) {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(redirectURL)
    }
  return (
    <button
        className="btn"
        onClick={handleClick}
        aria-label={label}
    >
        {label}
    </button>
  )
}

export default Button