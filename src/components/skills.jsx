import { useState } from "react";
import NavigationButtons from "./navigationButtons";
import InputField from "./ui/inputField";

const Skills = ({next, prev, onSave}) => {
    const skillLevels = ['beginner', 'intermediate', 'advanced'];
    const emptySkill = {
        name: '',
        level: skillLevels[0]
    };
    const [skills, setSkills] = useState([emptySkill]);
    const addSkill = () => {
        setSkills(prev => [...prev, { ...emptySkill }]);
    };

    const handleSkillChange = (index, field, value) => {
        setSkills(prev => prev.map((skill, i) => 
            i === index ? { ...skill, [field]: value } : skill
        ));
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
                <div id="steps-container" className="">
                {skills.map((skill, index) => (
                    <div key={index} className="w-4/5" >
                        <div className="card flex flex-col gap-4">
                        <InputField 
                            label="Skill Name"
                            name={`skill-${index}`}
                            value={skill.name}
                            placeholder="Skill name"
                            onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                        />
                        <div className="flex flex-col gap-2">
                            <label htmlFor={`level-${index}`}>Skill Level</label>
                            <select
                                id={`level-${index}`}
                                name={`level-${index}`}
                                value={skill.level}
                                onChange={(e) => handleSkillChange(index, 'level', e.target.value)}
                                className="select select-bordered w-full"
                            >
                                {skillLevels.map(level => (
                                    <option key={level} value={level}>
                                        {level.charAt(0).toUpperCase() + level.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>
                        </div>
                    </div>
                ))}
                </div>
                <button className="funcionality-button" onClick={addSkill}>Add new skill</button>
                <NavigationButtons onNext={handleNext} onPrev={handlePrev}/>
            </div>
        </section>
    );
}

export default Skills;