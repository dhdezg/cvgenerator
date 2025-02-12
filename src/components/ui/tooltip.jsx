import { Info } from 'lucide-react';
import PropTypes from 'prop-types';

const Tooltip = ({ icon, message }) => {
  return (
    <div className="relative inline-block group">
      <span className="select-none">{icon}</span>
      <span
        className="invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute bottom-8 left-1/2 -translate-x-1/2 
        px-2 py-1 bg-midnight-900 text-midnight-100 text-sm rounded whitespace-nowrap 
        transition-opacity duration-300 before:content-[''] before:absolute before:top-full before:left-1/2 
        before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-midnight-900">
        {message}
      </span>
    </div>
  );
};

Tooltip.propTypes = {
  icon: PropTypes.element.isRequired,
  message: PropTypes.string.isRequired,
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
