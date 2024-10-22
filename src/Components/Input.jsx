import PropTypes from "prop-types"


function Input ({
    label,
    type="text",
    value,
    setValue,
    disabled=false,
}) {
  return (
    <div className="input-field">
        <input
            className="input"
            disabled={disabled}
            type={type}
            placeholder=""
            value={value}
            onChange={(e) => setValue(e.target.value)}
        >
        </input>
        <label>
            {label}
        </label>
    </div>
  )
}

Input.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    value: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
}

export default Input