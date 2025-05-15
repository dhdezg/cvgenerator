import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import harvardTemplate from '../assets/harvardTemplate.png';
import modernTemplate from '../assets/modernTemplate.png';
import { useAuth } from '../contexts/AuthContext';

const Welcome = ({ next }) => {
  const { t } = useTranslation();
  const [showPreview, setShowPreview] = useState(false);
  const { user } = useAuth();
  const isLoggedIn = !!user;

  return (
    <section id="welcomePage" className="h-full w-full">
      <div className="flex flex-col justify-center items-center gap-14 p-10 h-full">
        <h1 className="text-midnight-100 xs:text-5xl md:text-8xl font-bold select-none text-center">
          {t('welcome')}
        </h1>
        <div className="flex flex-col gap-4">
          <button onClick={next} className="button-base w-auto self-center">
            {t(isLoggedIn ? 'startUser' : 'start')}
          </button>
          <div className="font-poppins text-midnight-100 p-4">
            <span className="">{t('preview') + ' '}</span>
            <button
              onClick={() => setShowPreview(true)}
              className="hover:text-midnight-900 hover:scale-105 transition-transform"
            >
              <a>{t('clickMe')}</a>
            </button>
          </div>
        </div>
      </div>
      {showPreview && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm cursor-pointer"
          onClick={() => setShowPreview(false)}
        >
          <div className="bg-transparent p-6 rounded-xl shadow-xl flex flex-col lg:flex-row gap-4 max-w-[95%] 2xl:max-w-[80%] max-h-[85vh] overflow-auto transform transition-all hover:scale-[1.02]">
            <div className="flex flex-col justify-center p-4 rounded-lg flex-1 gap-2 shadow-md">
              <h4 className="text-lg text-midnight-100 text-center underline">
                {t('harvardResume')}
              </h4>
              <img
                src={harvardTemplate}
                alt="Preview"
                className="w-full h-auto rounded-lg  2xl:max-h-[70vh]"
              />
            </div>
            <div className="flex flex-col justify-center p-4 rounded-lg flex-1 gap-2 shadow-md">
              <h4 className="text-lg text-midnight-100 text-center underline">
                {t('modernResume')}
              </h4>
              <img
                src={modernTemplate}
                alt="Preview"
                className="w-full h-auto rounded-lg object-contain 2xl:max-h-[70vh]"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

Welcome.propTypes = {
  next: PropTypes.func.isRequired,
};

export default Welcome;
