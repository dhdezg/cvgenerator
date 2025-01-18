import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import NavigationButtons from './navigationButtons';
import InputField from './ui/inputField';

const Skills = ({ next, prev, onSave }) => {
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
        <h2 className="step-title">Your skills</h2>
        <div id="steps-container" className="flex flex-col gap-4 w-3/4">
          {skills.map((skill, index) => (
            <div key={index}>
              <div className="card flex flex-col gap-4">
                <div className="flex justify-between items-center gap-4">
                  <h3 className="text-squirtle-950 text-lg font-semibold">
                    Skill {index + 1}
                  </h3>
                  {skills.length > 1 && (
                    <button
                      onClick={() => removeSkill(index)}
                      className="w-fit self-end px-3 py-1 text-squirtle-50 bg-squirtle-600 rounded-md hover:bg-squirtle-400">
                      Remove
                    </button>
                  )}
                </div>
                <InputField
                  label="Skill Name"
                  name={`skill-${index}`}
                  value={skill.name}
                  onChange={(e) =>
                    handleSkillChange(index, 'name', e.target.value)
                  }
                />
              </div>
            </div>
          ))}
          <button
            className="funcionality-button w-fit self-center"
            onClick={addSkill}>
            Add new skill
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
