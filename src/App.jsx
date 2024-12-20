import { useState } from "react";
import Languages from "./components/languages";
import PersonalInfo from "./components/personalInfo";
import Resume from "./components/resume";
import Skills from "./components/skills";
import Studies from "./components/studies";
import Welcome from "./components/welcome";
import WorkExperience from "./components/workExperience";
import "./index.css";

const App = () => {
  const STEPS = {
    WELCOME: 1,
    PERSONAL_INFO: 2,
    WORK_EXPERIENCE: 3,
    SKILLS: 4,
    STUDIES: 5,
    LANGUAGES: 6,
    RESUME: 7,
  };

  const [currentStep, setCurrentStep] = useState(STEPS.WELCOME);
  const [formData, setFormData] = useState({
    personalInfo: {},
    workExperience: [],
    skills: [],
    studies: [],
    languages: [],
  });

  const nextStep = () =>
    setCurrentStep((prev) =>
      prev < Object.keys(STEPS).length ? prev + 1 : prev
    );
  const prevStep = () =>
    setCurrentStep((prev) => (prev > STEPS.WELCOME ? prev - 1 : prev));

  const handleSave = (data, section) => {
    setFormData((prev) => ({
      ...prev,
      [section]: data,
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case STEPS.WELCOME:
        return <Welcome next={nextStep} />;
      case STEPS.PERSONAL_INFO:
        return (
          <PersonalInfo
            next={nextStep}
            prev={prevStep}
            onSave={(data) => handleSave(data, "personalInfo")}
          />
        );
      case STEPS.WORK_EXPERIENCE:
        return (
          <WorkExperience
            next={nextStep}
            prev={prevStep}
            onSave={(data) => handleSave(data, "workExperience")}
          />
        );
      case STEPS.SKILLS:
        return (
          <Skills
            next={nextStep}
            prev={prevStep}
            onSave={(data) => handleSave(data, "skills")}
          />
        );
      case STEPS.STUDIES:
        return (
          <Studies
            next={nextStep}
            prev={prevStep}
            onSave={(data) => handleSave(data, "studies")}
          />
        );
      case STEPS.LANGUAGES:
        return (
          <Languages
            next={nextStep}
            prev={prevStep}
            onSave={(data) => handleSave(data, "languages")}
          />
        );
      case STEPS.RESUME:
        return <Resume data={formData} prev={prevStep} />;
      default:
        return <div>Error: Step not found</div>;
    }
  };

  return (
    <div className="font-poppins bg-gradient-to-br from-squirtle-800 to-squirtle-200 min-h-screen flex flex-col w-full">
      <main className="flex-grow flex-shrink-0 flex items-center justify-center">
        {renderStep()}
      </main>
      <footer className="mx-auto">
        Done with ❤️ by&nbsp;
        <a
          href="https://dario-dev.vercel.app/"
          className="hover:text-squirtle-950 hover:underline"
        >
          dario.dev
        </a>
      </footer>
    </div>
  );
};

export default App;
