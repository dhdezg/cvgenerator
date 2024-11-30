import PropTypes from 'prop-types';

const Welcome = ({ next }) => {
  return (
    <section id="welcomePage" className="h-full w-full">
      <div className="flex flex-col justify-center items-center gap-14 p-10 h-full">
        <h1 className="text-ronchi-950 text-7xl font-bold select-none">
          Welcome to CV Generator
        </h1>
        <button
          onClick={next}
          className="bg-ronchi-700 hover:bg-ronchi-600 hover:scale-125 rounded-full p-5 w-28 text-xl text-white shadow-lg shadow-ronchi-600 transition-all duration-300">
          Start
        </button>
      </div>
    </section>
  );
};

Welcome.propTypes = {
  next: PropTypes.func.isRequired,
};

export default Welcome;
