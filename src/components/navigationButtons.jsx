import PropTypes from "prop-types";

const NavigationButtons = ({ onNext, onPrev, showPrev = true, showNext = true }) => {
  return (
    <div className="flex justify-evenly gap-20 w-full">
      {showPrev && (
        <button onClick={onPrev} className="button-base">
          Previous step
        </button>
      )}
      {showNext && (
        <button onClick={onNext} className="button-base">
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