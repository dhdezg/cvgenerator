import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import InputField from './ui/inputField';
import NavigationButtons from './ui/navigationButtons';
import { InfoTooltip } from './ui/tooltip';

const PersonalInfo = ({ next, onSave }) => {
  const { t } = useTranslation();

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
        <div className="flex items-center gap-4">
          <h2 className="step-title">{t('personalInfoTitle')}</h2>
          <InfoTooltip message={t('infoMessage')}></InfoTooltip>
        </div>
        <div className="card xs:w-full md:w-3/4 xs:flex flex-col md:grid grid-cols-3 xs:gap-4 md:gap-6 font-bold text-midnight-100">
          {Object.keys(formData).map((key) => (
            <InputField
              key={key}
              onChange={handleInputChange}
              label={t(key)}
              name={key}
              value={formData[key]}
              t={t}
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
