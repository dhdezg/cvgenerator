import { useState } from "react";
import NavigationButtons from "./navigationButtons";
import InputField from "./ui/inputField";

const WorkExperience = ({next, prev, onSave}) => {
  const [formData, setFormData] = useState({
    companyName: '',
    position: '',
    tasks: '',
    startDate: '',
    endDate: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    onSave(formData);
    next();
  };

  const handlePrev = () => {
    onSave(formData);
    prev();
  };

  return (
    <section id="workExperience" className="h-full w-full">
      <div className="step-container">
        <h2 className="step-title">Work experience</h2>
        <div className="grid grid-cols-3 gap-6 font-bold text-ronchi-950">
          {Object.keys(formData).map((key) => (
            <InputField
              key={key}
              onChange={handleInputChange}
              label={key
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, (str) => str.toUpperCase())}
              name={key}
              value={formData[key]}></InputField>
          ))}
        </div>
        <NavigationButtons onNext={handleNext} onPrev={handlePrev}/>
      </div>
    </section>
  );
}

export default WorkExperience;