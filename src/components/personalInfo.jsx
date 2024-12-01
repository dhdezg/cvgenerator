import PropTypes from 'prop-types';
import { useState } from 'react';
import InputField from './ui/inputField';

const PersonalInfo = ({ next, onSave }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
    location: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNextStep = () => {
    onSave(formData);
    next();
  };

  return (
    <section id="personalInfo" className="h-full w-full">
      <div className="flex flex-col justify-center items-center gap-20 p-10 h-full">
        <h2 className="text-5xl text-ronchi-950 font-bold select-none">
          Your personal data
        </h2>
        <div className="grid grid-cols-3 gap-6 font-bold text-ronchi-950">
          {Object.keys(formData).map((key) => (
            <InputField
              key={key}
              onChange={handleInputChange}
              label={key
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, (str) => str.toUpperCase())}
              name={key}
              value={formData[key]}></InputField>
          ))}
        </div>
        <button onClick={handleNextStep} className="button-base">
          Next step
        </button>
      </div>
    </section>
  );
};

PersonalInfo.propTypes = {
  next: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default PersonalInfo;
