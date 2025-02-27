import { Info } from 'lucide-react';
import PropTypes from 'prop-types';

const Tooltip = ({ icon, message, position = 'top' }) => {
  const positionClasses = {
    top: 'bottom-8 left-1/2 -translate-x-1/2 before:top-full before:left-1/2 before:-translate-x-1/2 before:border-t-midnight-900',
    bottom:
      'top-8 left-1/2 -translate-x-1/2 before:bottom-full before:left-1/2 before:-translate-x-1/2 before:border-b-midnight-900',
    left: 'right-11 top-1/2 -translate-y-1/2 before:left-full before:top-1/2 before:-translate-y-1/2 before:border-l-midnight-900',
    right:
      'left-2 top-1/2 -translate-y-1/2 before:right-full before:top-1/2 before:-translate-y-1/2 before:border-r-midnight-900',
  };

  return (
    <div className="relative inline-block group">
      <span className="select-none">{icon}</span>
      <span
        className={`invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute
        px-2 py-1 bg-midnight-900 text-midnight-100 text-sm rounded whitespace-nowrap 
        transition-opacity duration-300 before:content-[''] before:absolute
        before:border-4 before:border-transparent ${positionClasses[position]}`}>
        {message}
      </span>
    </div>
  );
};

Tooltip.propTypes = {
  icon: PropTypes.element,
  message: PropTypes.string.isRequired,
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
};

const InfoTooltip = ({ message }) => (
  <Tooltip
    icon={<Info size={28} className="text-midnight-100" />}
    message={message}
  />
);

InfoTooltip.propTypes = {
  message: PropTypes.string.isRequired,
};

export { InfoTooltip };
export default Tooltip;
