import { useState } from "react";
import NavigationButtons from "./navigationButtons";
import InputField from "./ui/inputField";

const Languages = ({ next, prev, onSave }) => {
  const emptyLanguage = {
    language: "",
    level: "",
    institution: "",
  };
  const [languages, setLanguages] = useState([{ ...emptyLanguage }]);
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
        <h2 className="step-title">Your known languages</h2>
        <div className="flex flex-col gap-4 w-3/4">
          {languages.map((language, index) => (
            <div key={index}>
              <div className="card flex flex-col gap-4">
                <div className="flex justify-between items-center gap-4">
                  <h3 className="text-squirtle-950 text-lg font-semibold">
                    Language {index + 1}
                  </h3>
                  {languages.length > 1 && (
                    <button
                      onClick={() => removeLanguage(index)}
                      className="w-fit self-end px-3 py-1 text-squirtle-50 bg-squirtle-600 rounded-md hover:bg-squirtle-400"
                    >
                      Remove
                    </button>
                  )}
                </div>
                {Object.entries(language).map(([key, value]) => (
                  <InputField
                    key={`${index}-${key}`}
                    onChange={(e) => handleLanguageChange(index, e)}
                    label={key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                    name={key}
                    value={value || ""}
                  />
                ))}
              </div>
            </div>
          ))}
          <button
            onClick={addLanguage}
            className="funcionality-button w-fit self-center"
          >
            Add another language
          </button>
        </div>
        <NavigationButtons onNext={handleNext} onPrev={handlePrev} />
      </div>
    </section>
  );
};

export default Languages;
