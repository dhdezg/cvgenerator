
import PropTypes from 'prop-types';
import NavigationButtons from './navigationButtons';

const Resume = ({ data, prev }) => {
  const { personalInfo, workExperience, skills, studies } = data;

  return (
    <section id="resume" className="w-full">
      <div className="step-container">
        <h2 className="step-title">Your Resume</h2>
        <div className="w-3/4 space-y-6">
          {/* Personal Info Section */}
          <div className="card">
            <h3 className="text-xl font-bold mb-4">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(personalInfo).map(([key, value]) => (
                <div key={key}>
                  <span className="font-bold">{key}: </span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Work Experience Section */}
          <div className="card">
            <h3 className="text-xl font-bold mb-4">Work Experience</h3>
            {workExperience.map((exp, index) => (
              <div key={index} className="mb-4">
                <h4 className="font-bold">{exp.companyName}</h4>
                <p>{exp.position}</p>
                <p>{exp.startDate} - {exp.endDate}</p>
                <p>{exp.tasks}</p>
              </div>
            ))}
          </div>

          {/* Skills Section */}
          <div className="card">
            <h3 className="text-xl font-bold mb-4">Skills</h3>
            <div className="grid grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <div key={index}>
                  <span className="font-bold">{skill.name}: </span>
                  <span>{skill.level}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Studies Section */}
          <div className="card">
            <h3 className="text-xl font-bold mb-4">Education</h3>
            {studies.map((study, index) => (
              <div key={index} className="mb-4">
                <h4 className="font-bold">{study.schoolName}</h4>
                <p>{study.degree}</p>
                <p>{study.startDate} - {study.endDate}</p>
              </div>
            ))}
          </div>
        </div>
        <NavigationButtons showNext={false} onPrev={prev} />
      </div>
    </section>
  );
};

Resume.propTypes = {
  data: PropTypes.shape({
    personalInfo: PropTypes.object,
    workExperience: PropTypes.array,
    skills: PropTypes.array,
    studies: PropTypes.array
  }).isRequired,
  prev: PropTypes.func.isRequired
};

export default Resume;