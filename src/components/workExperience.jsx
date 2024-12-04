import { useState } from "react";
import NavigationButtons from "./navigationButtons";
import InputField from "./ui/inputField";

const WorkExperience = ({ next, prev, onSave }) => {
  const emptyExperience = {
    companyName: "",
    startDate: "",
    endDate: "",
    position: "",
    skills: "",
    technologies: "",
    tasks: "",
  };

  const [experiences, setExperiences] = useState([{ ...emptyExperience }]);

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
    const label = key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());

    if (key === "startDate" || key === "endDate") {
      return (
        <InputField
          type="date"
          onChange={(e) => handleInputChange(index, e)}
          label={label}
          name={key}
          value={value}
        />
      );
    } else if (key === "tasks") {
      return (
        <div className="flex flex-col col-span-3">
          <label className="mb-2">{label}</label>
          <textarea
            name={key}
            value={value}
            onChange={(e) => handleInputChange(index, e)}
            rows={4}
            placeholder="What are your main tasks in this position?"
            className="bg-squirtle-100 p-2 border rounded-md font-normal focus:outline-none focus:ring-2 focus:ring-squirtle-500"
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
      />
    );
  };

  return (
    <section id="workExperience" className="w-full">
      <div className="step-container">
        <h2 className="step-title">Work experience</h2>
        <div className="flex flex-col gap-4 w-3/4">
          {experiences.map((experience, index) => (
            <div key={index} className="card">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-squirtle-950 text-lg font-semibold">
                  Experience {index + 1}
                </h3>
                {experiences.length > 1 && (
                  <button
                    onClick={() => removeExperience(index)}
                    className="px-3 py-1 text-squirtle-50 bg-squirtle-600 rounded-md hover:bg-squirtle-400"
                  >
                    Remove
                  </button>
                )}
              </div>
              <div className="grid grid-cols-3 gap-6 font-bold text-squirtle-950">
                {Object.entries(experience).map(([key, value]) => (
                  <div
                    key={key}
                    className={key === "tasks" ? "col-span-3" : ""}
                  >
                    {renderFormField(key, value, index)}
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button
            onClick={addExperience}
            className="funcionality-button w-fit self-center"
          >
            Add another experience
          </button>
        </div>
        <NavigationButtons onNext={handleNext} onPrev={handlePrev} />
      </div>
    </section>
  );
};

export default WorkExperience;
