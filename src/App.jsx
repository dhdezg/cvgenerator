import { useState } from 'react';
import PersonalInfo from './components/personalInfo';
import Welcome from './components/welcome';
import WorkExperience from './components/workExperience';
import './index.css';

const App = () => {
  const STEPS = {
    WELCOME: 1,
    PERSONAL_INFO: 2,
    WORK_EXPERIENCE: 3,
    SKILLS: 4,
    STUDIES: 5,
    LANGUAGES: 6,
  };
  const [currentStep, setCurrentStep] = useState(STEPS.WELCOME);
  const [userData, setUserData] = useState({});
  const nextStep = () =>
    setCurrentStep((prev) =>
      prev < Object.keys(STEPS).length ? prev + 1 : prev
    );
  const prevStep = () =>
    setCurrentStep((prev) => (prev > STEPS.WELCOME ? prev - 1 : prev));

  const handleSave = (data) => {
    setUserData((prevData) => ({
      ...prevData,
      ...data,
    }));
    console.log(userData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case STEPS.WELCOME:
        return <Welcome next={nextStep} />;
      case STEPS.PERSONAL_INFO:
        return (
          <PersonalInfo next={nextStep} prev={prevStep} onSave={handleSave} />
        );
      case STEPS.WORK_EXPERIENCE:
        return (<WorkExperience next={nextStep} prev={prevStep} onSave={handleSave}/>)
      case STEPS.SKILLS:
        return <div>SKILLS</div>
      case STEPS.STUDIES:
        return <div>STUDIES</div>
      case STEPS.LANGUAGES:
        return <div>LANGUAGES</div>
      default:
        return <div>Error: Step not found</div>;
    }
  };

  return (
    <div className="font-poppins bg-gradient-to-br from-squirtle-800 to-squirtle-200 flex flex-col h-screen">
      <main className="flex-grow">{renderStep()}</main>
      <footer className="mx-auto">
        Done with ❤️ by&nbsp;
        <a
          href="https://dario-dev.vercel.app/"
          className="hover:text-squirtle-950 hover:underline">
          dario.dev
        </a>
      </footer>
    </div>
  );
};

export default App;
