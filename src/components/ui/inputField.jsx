import PropTypes from 'prop-types';

const InputField = ({
  label,
  clarificationMessage,
  name,
  value,
  onChange,
  type = 'text',
  t,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center">
        <label className="font-bold mr-2 xs:text-sm md:text-lg">{label}</label>
        {clarificationMessage && (
          <span className="font-normal xs:text-2xs md:text-xs md:text-nowrap">
            {clarificationMessage}
          </span>
        )}
      </div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={t(`placeholders.${name}`)}
        className="input-form"
      />
    </div>
  );
};

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  clarificationMessage: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default InputField;
