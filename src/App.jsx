import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Globe, House, UserRound, UserRoundX } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../i18n.js';
import Auth from './components/auth';
import Languages from './components/languages';
import PersonalInfo from './components/personalInfo';
import Resume from './components/resume';
import Skills from './components/skills';
import Studies from './components/studies';
import Welcome from './components/welcome';
import WorkExperience from './components/workExperience';
import { auth, db } from './firebaseConfig.js';
import './index.css';

const App = () => {
  const { i18n, t } = useTranslation();
  const [language, setLanguage] = useState(i18n.language || 'es');
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    const fetchUserData = async (currentUser) => {
      if (!currentUser) return;

      const userRef = doc(db, 'users', currentUser.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setFormData(
          userSnap.data().data || {
            personalInfo: {},
            workExperience: [],
            skills: [],
            studies: [],
            languages: [],
          }
        );
      }
    };

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await fetchUserData(currentUser);
      }
    });

    return () => unsubscribe();
  }, []);

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

  const handleSave = async (data, section) => {
    if (!auth.currentUser) {
      console.warn('No hay usuario autenticado');
      return;
    }

    const processedData =
      section === 'workExperience' && !Array.isArray(data) ? [data] : data;

    const newFormData = {
      ...formData,
      [section]: processedData,
    };

    console.log('Estado completo a guardar:', newFormData);

    try {
      const userRef = doc(db, 'users', auth.currentUser.uid);

      const docSnap = await getDoc(userRef);
      const existingData = docSnap.exists() ? docSnap.data().data || {} : {};

      const updatedData = {
        ...existingData,
        [section]: processedData,
      };

      await setDoc(userRef, { data: updatedData }, { merge: true });
      console.log(`✅ Datos de ${section} guardados en Firestore`);

      setFormData(newFormData);
      localStorage.setItem('formData', JSON.stringify(newFormData));
    } catch (error) {
      console.error('❌ Error al guardar en Firestore:', error);
    }
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
    <div className="font-poppins bg-midnight-950 min-h-screen flex flex-col w-full overflow-x-hidden">
      <div id="header" className="flex justify-between items-center p-5">
        <button onClick={goHome}>
          <House size={36} className="header-button" />
        </button>
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-midnight-50">{user.email}</span>
              <button onClick={() => signOut(auth)}>
                <UserRoundX size={36} className="header-button" />
              </button>
            </div>
          ) : (
            <button onClick={() => setShowAuth(true)}>
              <UserRound size={36} className="header-button" />
            </button>
          )}
          <button onClick={toggleLanguage}>
            <Globe size={36} className="header-button" />
          </button>
        </div>
      </div>
      <main className="flex-grow flex-shrink-0 flex items-center justify-center">
        {showAuth && <Auth onClose={() => setShowAuth(false)} />}
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
