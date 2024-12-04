import PropTypes from "prop-types";

const InputField = ({ label, name, value, onChange, type = "text" }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={`Here should be your ${label}`}
        className="input-form"
      />
    </div>
  );
};

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

export default InputField;
