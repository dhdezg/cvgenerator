import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import resumeExample from '../assets/resume_example.png';

const Welcome = ({ next }) => {
  const { t } = useTranslation();
  const [showPreview, setShowPreview] = useState(false);

  return (
    <section id="welcomePage" className="h-full w-full">
      <div className="flex flex-col justify-center items-center gap-14 p-10 h-full">
        <h1 className="text-midnight-100 xs:text-5xl md:text-8xl font-bold select-none text-center">
          {t('welcome')}
        </h1>
        <div className="flex flex-col gap-3">
          <button onClick={next} className="button-base w-auto self-center">
            {t('start')}
          </button>
          <div className="font-poppins text-midnight-100 p-4">
            <span className="">{t('preview') + ' '}</span>
            <button
              onClick={() => setShowPreview(true)}
              className="hover:text-midnight-900 hover:scale-105 transition-transform">
              <a>{t('clickMe')}</a>
            </button>
          </div>
        </div>
      </div>
      {showPreview && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setShowPreview(false)}>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <img
              src={resumeExample}
              alt="Preview"
              className="max-w-full h-auto rounded-lg"
            />
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
