import { Globe, House } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../i18n.js';
import Languages from './components/languages';
import PersonalInfo from './components/personalInfo';
import Resume from './components/resume';
import Skills from './components/skills';
import Studies from './components/studies';
import Tooltip from './components/ui/tooltip.jsx';
import Welcome from './components/welcome';
import WorkExperience from './components/workExperience';
import './index.css';

const App = () => {
  const { i18n, t } = useTranslation();
  const [language, setLanguage] = useState(i18n.language || 'es');

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

  useEffect(() => {
    localStorage.removeItem('formData');
  }, []);

  const nextStep = () => {
    setCurrentStep(
      currentStep < Object.keys(STEPS).length ? currentStep + 1 : currentStep
    );
  };

  const prevStep = () => {
    setCurrentStep(currentStep > STEPS.WELCOME ? currentStep - 1 : currentStep);
  };

  const handleSave = (data, section) => {
    const newFormData = {
      ...formData,
      [section]: data,
    };
    setFormData(newFormData);
    localStorage.setItem('formData', JSON.stringify(newFormData));
  };

  const goHome = () => {
    setCurrentStep(STEPS.WELCOME);
    setFormData({
      personalInfo: {},
      workExperience: [],
      skills: [],
      studies: [],
      languages: [],
    });
    localStorage.removeItem('formData');
  };

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'es' : 'en';
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
      setLanguage(savedLanguage);
    }
  }, [i18n]);

  const renderStep = () => {
    switch (currentStep) {
      case STEPS.WELCOME:
        return <Welcome next={nextStep} />;
      case STEPS.PERSONAL_INFO:
        return (
          <PersonalInfo
            next={nextStep}
            prev={prevStep}
            onSave={(data) => handleSave(data, 'personalInfo')}
          />
        );
      case STEPS.WORK_EXPERIENCE:
        return (
          <WorkExperience
            next={nextStep}
            prev={prevStep}
            onSave={(data) => handleSave(data, 'workExperience')}
          />
        );
      case STEPS.SKILLS:
        return (
          <Skills
            next={nextStep}
            prev={prevStep}
            onSave={(data) => handleSave(data, 'skills')}
          />
        );
      case STEPS.STUDIES:
        return (
          <Studies
            next={nextStep}
            prev={prevStep}
            onSave={(data) => handleSave(data, 'studies')}
          />
        );
      case STEPS.LANGUAGES:
        return (
          <Languages
            next={nextStep}
            prev={prevStep}
            onSave={(data) => handleSave(data, 'languages')}
          />
        );
      case STEPS.RESUME:
        return <Resume data={formData} prev={prevStep} />;
      default:
        return <div>Error: Step not found</div>;
    }
  };

  return (
    <div className="font-poppins bg-midnight-950 min-h-screen flex flex-col w-full">
      <div id="header" className="flex justify-between items-center p-5">
        <div className="relative flex items-center group">
          <button onClick={goHome}>
            <House
              size={36}
              className="stroke-midnight-50 hover:stroke-midnight-800 hover:bg-midnight-50 hover:rounded-full p-2"
            />
          </button>
          <Tooltip message={t('goHome')} position="right" />
        </div>
        <div className="relative flex items-center group">
          <button onClick={toggleLanguage}>
            <Globe
              size={36}
              className="stroke-midnight-50 hover:stroke-midnight-800 hover:bg-midnight-50 hover:rounded-full p-2"
            />
          </button>
          <Tooltip message={t('changeLanguage')} position="left" />
        </div>
      </div>
      <main className="flex-grow flex-shrink-0 flex items-center justify-center">
        {renderStep()}
      </main>
      <footer className="mx-auto text-midnight-50">
        {t('footerText')}&nbsp;
        <a
          href="https://dario-dev.vercel.app/"
          className="hover:text-midnight-800 hover:underline">
          dario.dev
        </a>
      </footer>
    </div>
  );
};

export default App;
