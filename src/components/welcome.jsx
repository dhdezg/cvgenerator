import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const Welcome = ({ next }) => {
  const { t } = useTranslation();

  return (
    <section id="welcomePage" className="h-full w-full">
      <div className="flex flex-col justify-center items-center gap-14 p-10 h-full">
        <h1 className="text-midnight-100 xs:text-5xl md:text-8xl font-bold select-none text-center">
          {t('welcome')}
        </h1>
        <button onClick={next} className="button-base">
          {t('start')}
        </button>
      </div>
    </section>
  );
};

Welcome.propTypes = {
  next: PropTypes.func.isRequired,
};

export default Welcome;
