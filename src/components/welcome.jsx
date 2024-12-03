import PropTypes from 'prop-types';

const Welcome = ({ next }) => {
  return (
    <section id="welcomePage" className="h-full w-full">
      <div className="flex flex-col justify-center items-center gap-14 p-10 h-full">
        <h1 className="text-squirtle-950 text-8xl font-bold select-none">
          Welcome to CV Generator
        </h1>
        <button onClick={next} className="button-base">
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
