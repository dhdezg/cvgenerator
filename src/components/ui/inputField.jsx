import PropTypes from 'prop-types';

const InputField = ({
  label,
  name,
  type = 'text',
  value = '',
  onChange,
  required = false,
}) => (
  <div className="form">
    <label className="p-2">{label}</label>
    <input
      className="input-base"
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
    />
  </div>
);

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

export default InputField;
