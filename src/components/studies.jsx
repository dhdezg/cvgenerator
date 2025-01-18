import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import NavigationButtons from './navigationButtons';
import InputField from './ui/inputField';

const Studies = ({ next, prev, onSave }) => {
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
    const label = key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());

    if (key === 'startDate' || key === 'endDate') {
      return (
        <InputField
          key={`${index}-${key}`}
          type="date"
          onChange={(e) => handleStudyChange(index, key, e.target.value)}
          label={label}
          name={key}
          value={value || ''}
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
      />
    );
  };

  return (
    <section id="studies" className="w-full">
      <div className="step-container">
        <h2 className="step-title">Your studies</h2>
        <div className="flex flex-col gap-4 w-3/4">
          {studies.map((study, index) => (
            <div key={index}>
              <div className="card flex flex-col gap-4">
                <div className="flex justify-between items-center gap-4">
                  <h3 className="text-squirtle-950 text-lg font-semibold">
                    Study {index + 1}
                  </h3>
                  {studies.length > 1 && (
                    <button
                      onClick={() => removeStudy(index)}
                      className="w-fit self-end px-3 py-1 text-squirtle-50 bg-squirtle-600 rounded-md hover:bg-squirtle-400">
                      Remove
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
            Add new study
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
