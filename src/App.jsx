import { Globe, House, UserRound, UserRoundX } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Routes, useLocation, useNavigate } from 'react-router';
import '../i18n.js';
import Auth from './components/auth';
import Languages from './components/languages';
import PersonalInfo from './components/personalInfo';
import ProtectedStepRoute from './components/ProtectedRoute.jsx';
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
  const location = useLocation();

  // Use auth context instead of local state
  const { user, formData, logout, saveFormData, clearFormData } = useAuth();

  const STEPS = useMemo(
    () => ({
      WELCOME: 0, // Set WELCOME to 0 to exclude it from the progress bar
      PERSONAL_INFO: 1,
      WORK_EXPERIENCE: 2,
      SKILLS: 3,
      STUDIES: 4,
      LANGUAGES: 5,
      RESUME: 6,
    }),
    []
  );

  const NAVIGATE_TO = {
    [STEPS.WELCOME]: () => navigate('/'),
    [STEPS.PERSONAL_INFO]: () => navigate('/personal-info'),
    [STEPS.WORK_EXPERIENCE]: () => navigate('/work-experience'),
    [STEPS.SKILLS]: () => navigate('/skills'),
    [STEPS.STUDIES]: () => navigate('/studies'),
    [STEPS.LANGUAGES]: () => navigate('/languages'),
    [STEPS.RESUME]: () => navigate('/resume'),
  };

  const PATH_TO_STEP = useMemo(
    () => ({
      '/': STEPS.WELCOME,
      '/personal-info': STEPS.PERSONAL_INFO,
      '/work-experience': STEPS.WORK_EXPERIENCE,
      '/skills': STEPS.SKILLS,
      '/studies': STEPS.STUDIES,
      '/languages': STEPS.LANGUAGES,
      '/resume': STEPS.RESUME,
    }),
    [STEPS]
  );

  const [currentStep, setCurrentStep] = useState(
    PATH_TO_STEP[location.pathname] || STEPS.WELCOME
  );

  useEffect(() => {
    setCurrentStep(PATH_TO_STEP[location.pathname] ?? STEPS.WELCOME);
  }, [PATH_TO_STEP, STEPS.WELCOME, location.pathname]);

  const nextStep = () => {
    if (user) {
      setCurrentStep(STEPS.RESUME);
      NAVIGATE_TO[STEPS.RESUME]();
    } else {
      setCurrentStep(
        currentStep < Object.keys(STEPS).length - 1
          ? currentStep + 1
          : currentStep
      );
      NAVIGATE_TO[currentStep + 1]();
    }
  };

  const prevStep = () => {
    setCurrentStep(
      currentStep > STEPS.PERSONAL_INFO ? currentStep - 1 : currentStep
    );
    NAVIGATE_TO[currentStep - 1]();
  };

  const goHome = () => {
    setCurrentStep(STEPS.WELCOME);
    !user && clearFormData();
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
              <ProtectedStepRoute stepKey="personalInfo">
                <PersonalInfo
                  next={nextStep}
                  prev={prevStep}
                  onSave={(data) => saveFormData(data, 'personalInfo')}
                />
              </ProtectedStepRoute>
            }
          />
          <Route
            path="/work-experience"
            element={
              <ProtectedStepRoute stepKey="workExperience">
                <WorkExperience
                  next={nextStep}
                  prev={prevStep}
                  onSave={(data) => saveFormData(data, 'workExperience')}
                />
              </ProtectedStepRoute>
            }
          />
          <Route
            path="/skills"
            element={
              <ProtectedStepRoute stepKey="skills">
                <Skills
                  next={nextStep}
                  prev={prevStep}
                  onSave={(data) => saveFormData(data, 'skills')}
                />
              </ProtectedStepRoute>
            }
          />
          <Route
            path="/studies"
            element={
              <ProtectedStepRoute stepKey="studies">
                <Studies
                  next={nextStep}
                  prev={prevStep}
                  onSave={(data) => saveFormData(data, 'studies')}
                />
              </ProtectedStepRoute>
            }
          />
          <Route
            path="/languages"
            element={
              <ProtectedStepRoute stepKey="languages">
                <Languages
                  next={nextStep}
                  prev={prevStep}
                  onSave={(data) => saveFormData(data, 'languages')}
                />
              </ProtectedStepRoute>
            }
          />
          <Route
            path="/resume"
            element={
              <ProtectedStepRoute stepKey="resume">
                <Resume data={formData} prev={prevStep} />
              </ProtectedStepRoute>
            }
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
