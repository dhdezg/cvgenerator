import { useState } from 'react';
import Welcome from './components/welcome';
import './index.css';

const App = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Welcome next={nextStep} prev={prevStep} />;
    }
  };

  return (
    <div className="font-poppins bg-gradient-to-br from-ronchi-800 to-ronchi-200 flex flex-col h-screen">
      <main className="flex-grow">{renderStep()}</main>
      <footer className="mx-auto">
        Done with ❤️ by&nbsp;
        <a
          href="https://dario-dev.vercel.app/"
          className="hover:text-ronchi-950 hover:underline">
          dario.dev
        </a>
      </footer>
    </div>
  );
};

export default App;
