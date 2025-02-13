import { PDFDownloadLink } from '@react-pdf/renderer';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  formatDate,
  hasValidLanguages,
  hasValidPersonalInfo,
  hasValidSkills,
  hasValidStudies,
  hasValidWorkExperience,
} from '../helper';
import HarvardResume from './ui/harvardResume';
import ModernResume from './ui/modernResume';
import NavigationButtons from './ui/navigationButtons';

const templates = {
  harvard: HarvardResume,
  modern: ModernResume,
};

const Resume = ({ data, prev }) => {
  const { t } = useTranslation();
  const { personalInfo, workExperience, skills, languages, studies } = data;

  const [selectedTemplate, setSelectedTemplate] = useState('harvard');
  const SelectedTemplateComponent = templates[selectedTemplate];

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
                    {formatDate(exp.startDate)} /{' '}
                    {exp.endDate ? formatDate(exp.endDate) : 'Present'}
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
                    {formatDate(study.startDate)} /{' '}
                    {study.endDate ? formatDate(study.endDate) : t('present')}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <section className="flex flex-col items-center gap-3">
          {/* Select template */}
          <div className="flex gap-2 items-center">
            <label className="text-midnight-50">{t('selectTemplate')}:</label>
            <select
              value={selectedTemplate}
              onChange={(event) => setSelectedTemplate(event.target.value)}
              className="p-2 rounded-full bg-midnight-100">
              <option value="harvard">{t('harvard')}</option>
              <option value="modern">{t('modern')}</option>
              <option value="elegant">{t('elegant')}</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-10">
            <NavigationButtons showNext={false} onPrev={prev} />
            <div className="funcionality-button flex items-center">
              <PDFDownloadLink
                document={
                  <SelectedTemplateComponent
                    data={data}
                    translations={{
                      resumeTitle: t('resumeTitle'),
                      personalInfo: t('personalInfo'),
                      workExperienceTitle: t('workExperienceTitle'),
                      skills: t('skills'),
                      languages: t('languages'),
                      education: t('education'),
                      usedTechs: t('usedTechs'),
                      tasks: t('tasks'),
                      present: t('present'),
                      contact: t('contact'),
                    }}
                  />
                }
                fileName={`resume_${personalInfo.fullName}.pdf`}
                className="text-nowrap text-center">
                {({ loading }) => (
                  <p>{loading ? t('loading') : t('download')}</p>
                )}
              </PDFDownloadLink>
            </div>
          </div>
        </section>
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
