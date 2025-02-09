import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import InputField from './ui/inputField';
import NavigationButtons from './ui/navigationButtons';

const Skills = ({ next, prev, onSave }) => {
  const { t } = useTranslation();
  const emptySkill = {
    name: '',
  };
  const [skills, setSkills] = useState([emptySkill]);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('formData'))?.skills;
    if (savedData && savedData.length > 0) {
      setSkills(savedData);
    }
  }, []);

  const addSkill = () => {
    setSkills((prev) => [...prev, { ...emptySkill }]);
  };

  const handleSkillChange = (index, field, value) => {
    setSkills((prev) =>
      prev.map((skill, i) =>
        i === index ? { ...skill, [field]: value } : skill
      )
    );
  };

  const removeSkill = (index) => {
    setSkills((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    onSave(skills);
    next();
  };

  const handlePrev = () => {
    onSave(skills);
    prev();
  };

  return (
    <section id="skills" className="w-full">
      <div className="step-container">
        <h2 className="step-title">{t('skillsTitle')}</h2>
        <div
          id="steps-container"
          className="flex flex-col gap-4 xs:w-full md:w-3/4">
          {skills.map((skill, index) => (
            <div key={index}>
              <div className="card flex flex-col gap-4">
                <div className="flex justify-between items-center gap-4">
                  <h3 className="text-squirtle-950 text-lg font-semibold">
                    {t('skill')} {index + 1}
                  </h3>
                  {skills.length > 1 && (
                    <button
                      onClick={() => removeSkill(index)}
                      className="w-fit self-end px-3 py-1 text-squirtle-50 bg-squirtle-600 rounded-md hover:bg-squirtle-400">
                      {t('remove')}
                    </button>
                  )}
                </div>
                <InputField
                  label={t('skillName')}
                  name="skill"
                  value={skill.name}
                  onChange={(e) =>
                    handleSkillChange(index, 'name', e.target.value)
                  }
                  t={t}
                />
              </div>
            </div>
          ))}
          <button
            className="funcionality-button w-fit self-center"
            onClick={addSkill}>
            {t('addSkill')}
          </button>
        </div>
        <NavigationButtons onNext={handleNext} onPrev={handlePrev} />
      </div>
    </section>
  );
};

Skills.propTypes = {
  next: PropTypes.func.isRequired,
  prev: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default Skills;
