import PropTypes from "prop-types"

Input.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    value: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
}

Input.defaultProps = {
    type: "text",
    disabled: false,
}

function Input ({
    label,
    type,
    value,
    setValue,
    disabled,
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

export default Input