import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import InputField from './ui/inputField';
import NavigationButtons from './ui/navigationButtons';

const Studies = ({ next, prev, onSave }) => {
  const { t } = useTranslation();
  const emptyStudy = {
    schoolName: '',
    degree: '',
    startDate: '',
    endDate: '',
  };
  const [studies, setStudies] = useState([{ ...emptyStudy }]);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('formData'))?.studies;
    if (savedData && savedData.length > 0) {
      setStudies(savedData);
    }
  }, []);

  const addStudy = () => {
    setStudies((prev) => [...prev, { ...emptyStudy }]);
  };
  const handleStudyChange = (index, field, value) => {
    setStudies((prev) =>
      prev.map((study, i) =>
        i === index ? { ...study, [field]: value } : study
      )
    );
  };
  const removeStudy = (index) => {
    setStudies((prev) => prev.filter((_, i) => i !== index));
  };
  const handleNext = () => {
    onSave(studies);
    next();
  };
  const handlePrev = () => {
    onSave(studies);
    prev();
  };

  const renderFormField = (key, value, index) => {
    const label = t(key);

    if (key === 'startDate' || key === 'endDate') {
      return (
        <InputField
          key={`${index}-${key}`}
          type="date"
          onChange={(e) => handleStudyChange(index, key, e.target.value)}
          label={label}
          name={key}
          value={value || ''}
          t={t}
        />
      );
    }
    return (
      <InputField
        key={`${index}-${key}`}
        onChange={(e) => handleStudyChange(index, key, e.target.value)}
        label={label}
        name={key}
        value={value}
        t={t}
      />
    );
  };

  return (
    <section id="studies" className="w-full">
      <div className="step-container">
        <h2 className="step-title">{t('studiesTitle')}</h2>
        <div className="flex flex-col gap-4 xs:w-full md:w-3/4">
          {studies.map((study, index) => (
            <div key={index}>
              <div className="card flex flex-col gap-4">
                <div className="flex justify-between items-center gap-4">
                  <h3 className="text-midnight-950 text-lg font-semibold">
                    {t('study')} {index + 1}
                  </h3>
                  {studies.length > 1 && (
                    <button
                      onClick={() => removeStudy(index)}
                      className="w-fit self-end px-3 py-1 text-midnight-50 bg-midnight-600 rounded-md hover:bg-midnight-400">
                      {t('remove')}
                    </button>
                  )}
                </div>
                {Object.keys(study).map((key) =>
                  renderFormField(key, study[key], index)
                )}
              </div>
            </div>
          ))}
          <button
            className="funcionality-button w-fit self-center"
            onClick={addStudy}>
            {t('addStudy')}
          </button>
        </div>
        <NavigationButtons onNext={handleNext} onPrev={handlePrev} />
      </div>
    </section>
  );
};

Studies.propTypes = {
  next: PropTypes.func.isRequired,
  prev: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default Studies;
