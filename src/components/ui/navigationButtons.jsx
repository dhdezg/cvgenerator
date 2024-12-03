
import PropTypes from 'prop-types';

const NavigationButtons = ({ onNext, onPrev, showPrev = true, showNext = true }) => {
  return (
    <div className="flex justify-between mt-6">
      {showPrev && (
        <button onClick={onPrev} className="button-base">
          Previous step
        </button>
      )}
      {showNext && (
        <button onClick={onNext} className="button-base ml-auto">
          Next step
        </button>
      )}
    </div>
  );
};

NavigationButtons.propTypes = {
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  showPrev: PropTypes.bool,
  showNext: PropTypes.bool,
};

export default NavigationButtons;