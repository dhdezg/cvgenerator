import PropTypes from 'prop-types';

const InputField = ({ label, name, value, onChange, type = "text" }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={`Tell me about your ${label}`}
        className="text-ronchi-900 bg-ronchi-100 font-normal p-2 border border-ronchi-200 rounded-md focus:outline-none focus:ring-2 focus:ring-ronchi-500"
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
