import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const NavigationButtons = ({
  onNext,
  onPrev,
  showPrev = true,
  showNext = true,
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex justify-evenly gap-20 w-full">
      {showPrev && (
        <button onClick={onPrev} className="button-base">
          {t('prevStep')}
        </button>
      )}
      {showNext && (
        <button onClick={onNext} className="button-base">
          {t('nextStep')}
        </button>
      )}
    </div>
  );
};

NavigationButtons.propTypes = {
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
  showPrev: PropTypes.bool,
  showNext: PropTypes.bool,
};

export default NavigationButtons;
