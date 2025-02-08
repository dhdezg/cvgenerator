import { PDFDownloadLink } from '@react-pdf/renderer';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  hasValidLanguages,
  hasValidPersonalInfo,
  hasValidSkills,
  hasValidStudies,
  hasValidWorkExperience,
} from '../helper';
import ResumePDF from './ResumePDF';
import NavigationButtons from './ui/navigationButtons';

const Resume = ({ data, prev }) => {
  const { t } = useTranslation();
  const { personalInfo, workExperience, skills, languages, studies } = data;

  return (
    <section id="resume" className="w-full">
      <div className="step-container">
        <h2 className="step-title">{t('resumeTitle')}</h2>
        <div className="xs:w-full md:w-3/4 space-y-6">
          {/* Personal Info Section */}
          {hasValidPersonalInfo(personalInfo) && (
            <div className="card">
              <h3 className="xs:text-lg md:text-xl font-bold mb-4">
                {t('personalInfo')}
              </h3>
              <div className="xs:flex flex-col md:grid grid-cols-2 gap-4">
                {Object.entries(personalInfo).map(([key, value]) => (
                  <div key={key}>
                    <span className="font-bold">{t(key)}: </span>
                    <span className="xs:text-base md:text-base">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Work Experience Section */}
          {hasValidWorkExperience(workExperience) && (
            <div className="card">
              <h3 className="xs:text-lg md:text-xl font-bold mb-4">
                {t('workExperienceTitle')}
              </h3>
              {workExperience.map((exp, index) => (
                <div key={index} className="mb-4">
                  <h4 className="font-bold">{exp.companyName}</h4>
                  <p>{exp.position}</p>
                  <p>
                    {exp.startDate} / {exp.endDate ? exp.endDate : 'Present'}
                  </p>
                  <p>{exp.tasks}</p>
                </div>
              ))}
            </div>
          )}

          {/* Skills Section */}
          {hasValidSkills(skills) && (
            <div className="card">
              <h3 className="xs:text-lg md:text-xl font-bold mb-4">
                {t('skills')}
              </h3>
              <div className="xs:flex flex-col md:grid grid-cols-4 gap-4">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages Section */}
          {hasValidLanguages(languages) && (
            <div className="card">
              <h3 className="xs:text-lg md:text-xl font-bold mb-4">
                {t('languages')}
              </h3>
              <div className="xs:flex flex-col md:grid grid-cols-2 gap-4">
                {languages.map((language, index) => (
                  <div key={index}>
                    <span className="font-bold">{language.language}: </span>
                    <span>{language.level}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Studies Section */}
          {hasValidStudies(studies) && (
            <div className="card">
              <h3 className="xs:text-lg md:text-xl font-bold mb-4">
                {t('education')}
              </h3>
              {studies.map((study, index) => (
                <div key={index} className="mb-4">
                  <h4 className="font-bold">{study.schoolName}</h4>
                  <p>{study.degree}</p>
                  <p>
                    {study.startDate} / {study.endDate}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex gap-10">
          <NavigationButtons showNext={false} onPrev={prev} />

          <div className="funcionality-button flex items-center">
            <PDFDownloadLink
              document={<ResumePDF data={data} />}
              fileName="resume.pdf"
              className="text-nowrap text-center">
              {({ loading }) => (
                <p>{loading ? 'Loading document...' : t('download')}</p>
              )}
            </PDFDownloadLink>
          </div>
        </div>
      </div>
    </section>
  );
};

Resume.propTypes = {
  data: PropTypes.shape({
    personalInfo: PropTypes.object,
    workExperience: PropTypes.array,
    skills: PropTypes.array,
    studies: PropTypes.array,
    languages: PropTypes.array,
  }).isRequired,
  prev: PropTypes.func.isRequired,
};

export default Resume;
