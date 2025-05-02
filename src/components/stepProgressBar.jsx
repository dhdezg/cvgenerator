import PropTypes from 'prop-types';

const StepProgressBar = ({ steps, currentStep }) => {
  const progressPercentage = (currentStep / steps.length) * 100;

  return (
    <div className="w-full px-4 py-2">
      {/* Mobile view */}
      <div className="sm:hidden text-center text-sm text-gray-500 mb-2">
        {`Step ${currentStep} of ${steps.length}`}
      </div>
      {/* Step labels for larger screens */}
      <div className="hidden sm:flex justify-between mb-2">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`text-xs sm:text-sm ${
              index + 1 <= currentStep ? 'text-blue-500' : 'text-gray-400'
            }`}
          >
            {step}
          </div>
        ))}
      </div>
      {/* Progress bar */}
      <div className="w-full bg-gray-300 h-2 rounded">
        <div
          className="bg-blue-500 h-2 rounded transition-all ease-in-out duration-300"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

StepProgressBar.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentStep: PropTypes.number.isRequired,
};

export default StepProgressBar;
