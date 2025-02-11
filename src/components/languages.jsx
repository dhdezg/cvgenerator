import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import InputField from './ui/inputField';
import NavigationButtons from './ui/navigationButtons';

const Languages = ({ next, prev, onSave }) => {
  const { t } = useTranslation();
  const emptyLanguage = {
    language: '',
    level: '',
    institution: '',
  };
  const [languages, setLanguages] = useState([{ ...emptyLanguage }]);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('formData'))?.languages;
    if (savedData && savedData.length > 0) {
      setLanguages(savedData);
    }
  }, []);

  const addLanguage = () => {
    setLanguages((prev) => [...prev, { ...emptyLanguage }]);
  };
  const handleLanguageChange = (index, e) => {
    const { name, value } = e.target;
    setLanguages((prev) =>
      prev.map((lang, i) => (i === index ? { ...lang, [name]: value } : lang))
    );
  };
  const removeLanguage = (index) => {
    setLanguages((prev) => prev.filter((_, i) => i !== index));
  };
  const handleNext = () => {
    onSave(languages);
    next();
  };
  const handlePrev = () => {
    onSave(languages);
    prev();
  };

  return (
    <section id="languages" className="w-full">
      <div className="step-container">
        <h2 className="step-title">{t('languageTitle')}</h2>
        <div className="flex flex-col gap-4 xs:w-full md:w-3/4">
          {languages.map((language, index) => (
            <div key={index}>
              <div className="card flex flex-col gap-4">
                <div className="flex justify-between items-center gap-4">
                  <h3 className="text-midnight-100 xs:text-base md:text-lg font-semibold">
                    {t('language')} {index + 1}
                  </h3>
                  {languages.length > 1 && (
                    <button
                      onClick={() => removeLanguage(index)}
                      className="w-fit self-end px-3 py-1 text-midnight-50 bg-midnight-600 rounded-md hover:bg-midnight-400">
                      {t('remove')}
                    </button>
                  )}
                </div>
                {Object.entries(language).map(([key, value]) => (
                  <InputField
                    key={`${index}-${key}`}
                    onChange={(e) => handleLanguageChange(index, e)}
                    label={t(key)}
                    name={key}
                    value={value || ''}
                    t={t}
                  />
                ))}
              </div>
            </div>
          ))}
          <button
            onClick={addLanguage}
            className="funcionality-button w-fit self-center">
            {t('addLanguage')}
          </button>
        </div>
        <NavigationButtons onNext={handleNext} onPrev={handlePrev} />
      </div>
    </section>
  );
};

Languages.propTypes = {
  next: PropTypes.func.isRequired,
  prev: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default Languages;
