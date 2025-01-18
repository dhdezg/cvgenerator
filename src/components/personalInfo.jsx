import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import NavigationButtons from './navigationButtons';
import InputField from './ui/inputField';

const PersonalInfo = ({ next, onSave }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
  });

  useEffect(() => {
    const savedData = JSON.parse(
      localStorage.getItem('formData')
    )?.personalInfo;
    if (savedData) {
      setFormData(savedData);
    }
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    onSave(formData);
    next();
  };

  return (
    <section id="personalInfo" className="w-full">
      <div className="step-container">
        <h2 className="step-title">Your personal data</h2>
        <div className="card xs:w-full md:w-3/4 xs:flex flex-col md:grid grid-cols-3 xs:gap-4 md:gap-6 font-bold text-squirtle-950">
          {Object.keys(formData).map((key) => (
            <InputField
              key={key}
              onChange={handleInputChange}
              label={key
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, (str) => str.toUpperCase())}
              name={key}
              value={formData[key]}
            />
          ))}
        </div>
        <NavigationButtons showPrev={false} onNext={handleNext} />
      </div>
    </section>
  );
};

PersonalInfo.propTypes = {
  next: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default PersonalInfo;
