import { Globe, House, UserRound, UserRoundX } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Routes, useNavigate } from 'react-router';
import '../i18n.js';
import Auth from './components/auth';
import Languages from './components/languages';
import PersonalInfo from './components/personalInfo';
import Resume from './components/resume';
import Skills from './components/skills';
import StepProgressBar from './components/stepProgressBar.jsx';
import Studies from './components/studies';
import Tooltip from './components/ui/tooltip.jsx';
import Welcome from './components/welcome';
import WorkExperience from './components/workExperience';
import { useAuth } from './contexts/AuthContext.jsx';
import './index.css';

const App = () => {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const [language, setLanguage] = useState(i18n.language || 'es');
  const [showAuth, setShowAuth] = useState(false);

  // Use auth context instead of local state
  const { user, formData, logout, saveFormData, clearFormData } = useAuth();

  const STEPS = {
    WELCOME: 0, // Set WELCOME to 0 to exclude it from the progress bar
    PERSONAL_INFO: 1,
    WORK_EXPERIENCE: 2,
    SKILLS: 3,
    STUDIES: 4,
    LANGUAGES: 5,
    RESUME: 6,
  };

  const NAVIGATE_TO = {
    [STEPS.WELCOME]: () => navigate('/'),
    [STEPS.PERSONAL_INFO]: () => navigate('/personal-info'),
    [STEPS.WORK_EXPERIENCE]: () => navigate('/work-experience'),
    [STEPS.SKILLS]: () => navigate('/skills'),
    [STEPS.STUDIES]: () => navigate('/studies'),
    [STEPS.LANGUAGES]: () => navigate('/languages'),
    [STEPS.RESUME]: () => navigate('/resume'),
  };

  const [currentStep, setCurrentStep] = useState(STEPS.WELCOME);

  const nextStep = () => {
    setCurrentStep(
      currentStep < Object.keys(STEPS).length - 1
        ? currentStep + 1
        : currentStep
    );
    NAVIGATE_TO[currentStep + 1]();
  };

  const prevStep = () => {
    setCurrentStep(
      currentStep > STEPS.PERSONAL_INFO ? currentStep - 1 : currentStep
    );
    NAVIGATE_TO[currentStep - 1]();
  };

  const goHome = () => {
    setCurrentStep(STEPS.WELCOME);
    clearFormData();
    NAVIGATE_TO[STEPS.WELCOME]();
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

  const stepLabels = [
    t('personalInfo'),
    t('workExperienceTitle'),
    t('skills'),
    t('studiesTitle'),
    t('languages'),
    t('resumeTitle'),
  ];

  return (
    <div className="font-poppins bg-midnight-950 min-h-screen flex flex-col w-full overflow-x-hidden">
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
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-midnight-50">{user.email}</span>
              <div className="relative flex items-center group">
                <button onClick={logout}>
                  <UserRoundX size={36} className="header-button" />
                </button>
                <Tooltip message={t('logOut')} position="left"></Tooltip>
              </div>
            </div>
          ) : (
            <div className="relative flex items-center group">
              <button onClick={() => setShowAuth(true)}>
                <UserRound size={36} className="header-button" />
              </button>
              <Tooltip message={t('logIn')} position="left" />
            </div>
          )}
          <div className="relative flex items-center group">
            <button onClick={toggleLanguage}>
              <Globe size={36} className="header-button" />
            </button>
            <Tooltip message={t('changeLanguage')} position="left" />
          </div>
        </div>
      </div>
      {currentStep !== STEPS.WELCOME ? (
        <StepProgressBar steps={stepLabels} currentStep={currentStep} />
      ) : null}

      <main className="flex-grow flex-shrink-0 flex items-center justify-center">
        {showAuth && <Auth onClose={() => setShowAuth(false)} />}
        <Routes>
          <Route path="/" element={<Welcome next={nextStep} />} />
          <Route
            path="/personal-info"
            element={
              <PersonalInfo
                next={nextStep}
                prev={prevStep}
                onSave={(data) => saveFormData(data, 'personalInfo')}
              />
            }
          />
          <Route
            path="/work-experience"
            element={
              <WorkExperience
                next={nextStep}
                prev={prevStep}
                onSave={(data) => saveFormData(data, 'workExperience')}
              />
            }
          />
          <Route
            path="/skills"
            element={
              <Skills
                next={nextStep}
                prev={prevStep}
                onSave={(data) => saveFormData(data, 'skills')}
              />
            }
          />
          <Route
            path="/studies"
            element={
              <Studies
                next={nextStep}
                prev={prevStep}
                onSave={(data) => saveFormData(data, 'studies')}
              />
            }
          />
          <Route
            path="/languages"
            element={
              <Languages
                next={nextStep}
                prev={prevStep}
                onSave={(data) => saveFormData(data, 'languages')}
              />
            }
          />
          <Route
            path="/resume"
            element={<Resume data={formData} prev={prevStep} />}
          />
          <Route
            path="*"
            element={
              <span
                style={{ fontWeight: 'bold', color: 'white', fontSize: '30px' }}
              >
                404 Not Found
              </span>
            }
          />
        </Routes>
      </main>
      <footer className="mx-auto text-midnight-50">
        {t('footerText')}&nbsp;
        <a
          href="https://dario-dev.vercel.app/"
          className="hover:text-midnight-800 hover:underline"
        >
          dario.dev
        </a>
      </footer>
    </div>
  );
};

export default App;
