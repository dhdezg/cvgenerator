import { useState } from "react";
import NavigationButtons from "./navigationButtons";
import InputField from "./ui/inputField";

const Skills = ({ next, prev, onSave }) => {
  const skillLevels = ["beginner", "intermediate", "advanced"];
  const emptySkill = {
    name: "",
    level: skillLevels[0],
  };
  const [skills, setSkills] = useState([emptySkill]);
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
                      className="w-fit self-end px-3 py-1 text-squirtle-50 bg-squirtle-600 rounded-md hover:bg-squirtle-400"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <InputField
                  label="Skill Name"
                  name={`skill-${index}`}
                  value={skill.name}
                  onChange={(e) =>
                    handleSkillChange(index, "name", e.target.value)
                  }
                />
                <div className="flex flex-col gap-2">
                  <label htmlFor={`level-${index}`}>Skill Level</label>
                  <select
                    id={`level-${index}`}
                    name={`level-${index}`}
                    value={skill.level}
                    onChange={(e) =>
                      handleSkillChange(index, "level", e.target.value)
                    }
                    className="text-squirtle-900 bg-squirtle-100 font-normal p-2 border border-squirtle-200 rounded-md focus:outline-none focus:ring-2 focus:ring-squirtle-500"
                  >
                    {skillLevels.map((level) => (
                      <option key={level} value={level}>
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
          <button
            className="funcionality-button w-fit self-center"
            onClick={addSkill}
          >
            Add new skill
          </button>
        </div>
        <NavigationButtons onNext={handleNext} onPrev={handlePrev} />
      </div>
    </section>
  );
};

export default Skills;
