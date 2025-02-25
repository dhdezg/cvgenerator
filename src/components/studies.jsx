import { doc, getDoc } from 'firebase/firestore';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { auth, db } from '../firebaseConfig';
import InputField from './ui/inputField';
import NavigationButtons from './ui/navigationButtons';
import { InfoTooltip } from './ui/tooltip';

const Studies = ({ next, prev, onSave }) => {
  const { t } = useTranslation();
  const emptyStudy = {
    schoolName: '',
    degree: '',
    startDate: '',
    endDate: '',
  };

  const [studies, setStudies] = useState(() => {
    const savedData = localStorage.getItem('formData');
    const storedStudies = savedData ? JSON.parse(savedData).studies || [] : [];
    return storedStudies.length > 0 ? storedStudies : [{ ...emptyStudy }];
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (!auth.currentUser) return;

      const userRef = doc(db, 'users', auth.currentUser.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data().data?.studies || [];
        if (userData.length > 0) {
          setStudies(userData);
          localStorage.setItem(
            'formData',
            JSON.stringify({
              ...JSON.parse(localStorage.getItem('formData') || '{}'),
              studies: userData,
            })
          );
        }
      }
    };

    fetchUserData();
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
    const validStudies = studies.filter((study) =>
      Object.values(study).some((value) => value.trim() !== '')
    );

    if (validStudies.length > 0) {
      onSave(validStudies, 'studies');
    } else {
      onSave([], 'studies');
    }
    next();
  };

  const handlePrev = () => {
    const validStudies = studies.filter((study) =>
      Object.values(study).some((value) => value.trim() !== '')
    );
    onSave(validStudies, 'studies');
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
        <div className="flex items-center gap-4">
          <h2 className="step-title">{t('studiesTitle')}</h2>
          <InfoTooltip message={t('infoMessage')}></InfoTooltip>
        </div>
        <div className="flex flex-col gap-4 xs:w-full md:w-3/4">
          {studies.map((study, index) => (
            <div key={index}>
              <div className="card flex flex-col gap-4">
                <div className="flex justify-between items-center gap-4">
                  <h3 className="text-midnight-100 text-lg font-semibold">
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
                {Object.keys(emptyStudy).map((key) =>
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
