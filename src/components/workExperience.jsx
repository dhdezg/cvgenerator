import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import InputField from './ui/inputField';
import NavigationButtons from './ui/navigationButtons';

const WorkExperience = ({ next, prev, onSave }) => {
  const { t } = useTranslation();
  const emptyExperience = {
    companyName: '',
    startDate: '',
    endDate: '',
    position: '',
    technologies: '',
    tasks: '',
  };

  const [experiences, setExperiences] = useState([{ ...emptyExperience }]);

  useEffect(() => {
    const savedData = JSON.parse(
      localStorage.getItem('formData')
    )?.workExperience;
    if (savedData && savedData.length > 0) {
      setExperiences(savedData);
    }
  }, []);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    setExperiences((prev) => {
      const newExperiences = [...prev];
      newExperiences[index] = {
        ...newExperiences[index],
        [name]: value,
      };
      return newExperiences;
    });
  };

  const handleNext = () => {
    onSave(experiences);
    next();
  };

  const handlePrev = () => {
    onSave(experiences);
    prev();
  };

  const addExperience = () => {
    setExperiences((prev) => [...prev, { ...emptyExperience }]);
  };

  const removeExperience = (index) => {
    setExperiences((prev) => prev.filter((_, i) => i !== index));
  };

  const renderFormField = (key, value, index) => {
    const label = t(key);

    if (key === 'startDate' || key === 'endDate') {
      return (
        <InputField
          type="date"
          onChange={(e) => handleInputChange(index, e)}
          label={label}
          name={key}
          value={value || ''}
          t={t}
        />
      );
    } else if (key === 'tasks') {
      return (
        <div className="flex flex-col col-span-3">
          <label className="xs:text-sm md:text-lg mb-2">
            {label}
            <span className="md:text-xs font-normal xs:text-2xs md:text-nowrap">
              {t('tasksClarification')}
            </span>
          </label>
          <textarea
            name={key}
            value={value || ''}
            onChange={(e) => handleInputChange(index, e)}
            rows={4}
            placeholder={t('placeholders.tasks')}
            className="xs:placeholder:text-xs md:placeholder:text-sm bg-midnight-100 p-2 border rounded-md text-midnight-950 font-normal focus:outline-none focus:ring-2 focus:ring-midnight-500"
          />
        </div>
      );
    } else if (key === 'technologies') {
      return (
        <div className="flex flex-col">
          <InputField
            label={label}
            clarificationMessage={t('technologiesClarification')}
            onChange={(e) => handleInputChange(index, e)}
            name={key}
            value={value}
            t={t}
          />
        </div>
      );
    }

    return (
      <InputField
        key={key}
        onChange={(e) => handleInputChange(index, e)}
        label={label}
        name={key}
        value={value}
        t={t}
      />
    );
  };

  return (
    <section id="workExperience" className="w-full">
      <div className="step-container">
        <h2 className="step-title">{t('workExperienceTitle')}</h2>
        <div className="flex flex-col gap-4 xs:w-full md:w-3/4">
          {experiences.map((experience, index) => (
            <div key={index} className="card">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-midnight-100 xs:text-base md:text-lg font-semibold">
                  {t('experience')} {index + 1}
                </h3>
                {experiences.length > 1 && (
                  <button
                    onClick={() => removeExperience(index)}
                    className="px-3 py-1 text-midnight-50 bg-midnight-600 rounded-md hover:bg-midnight-400">
                    {t('remove')}
                  </button>
                )}
              </div>
              <div className="xs:flex flex-col md:grid grid-cols-3 xs:gap-4 md:gap-6 font-bold text-midnight-100">
                {Object.entries(experience).map(([key, value]) => (
                  <div
                    key={key}
                    className={key === 'tasks' ? 'col-span-3' : ''}>
                    {renderFormField(key, value, index)}
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button
            onClick={addExperience}
            className="funcionality-button w-fit self-center">
            {t('addExperience')}
          </button>
        </div>
        <NavigationButtons onNext={handleNext} onPrev={handlePrev} />
      </div>
    </section>
  );
};

WorkExperience.propTypes = {
  next: PropTypes.func.isRequired,
  prev: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default WorkExperience;
