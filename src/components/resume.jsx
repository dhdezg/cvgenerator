import { PDFDownloadLink } from '@react-pdf/renderer';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { auth, db } from '../firebaseConfig';
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
  const [cvData, setCvData] = useState(data);

  useEffect(() => {
    setCvData(data);
  }, [data]);

  const handleDownloadClick = async () => {
    if (auth.currentUser) {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userRef, { data: cvData });
    }
  };

  const [selectedTemplate, setSelectedTemplate] = useState('harvard');
  const SelectedTemplateComponent = templates[selectedTemplate];

  useEffect(() => {
    const fetchCvData = async () => {
      if (!auth.currentUser) return;

      const userRef = doc(db, 'users', auth.currentUser.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setCvData(userSnap.data().data || {});
      }
    };

    fetchCvData();
  }, []);

  return (
    <section id="resume" className="w-full">
      <div className="step-container">
        <h2 className="step-title">{t('resumeTitle')}</h2>
        <div className="xs:w-full md:w-3/4 space-y-6">
          {/* Personal Info Section */}
          {hasValidPersonalInfo(data.personalInfo) && (
            <div className="card">
              <h3 className="xs:text-lg md:text-xl font-bold mb-4">
                {t('personalInfo')}
              </h3>
              <div className="xs:flex flex-col md:grid grid-cols-2 gap-4">
                {Object.entries(data.personalInfo).map(([key, value]) => (
                  <div key={key}>
                    <span className="font-bold">{t(key)}: </span>
                    <span className="xs:text-base md:text-base">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Work Experience Section */}
          {hasValidWorkExperience(data.workExperience) && (
            <div className="card">
              <h3 className="xs:text-lg md:text-xl font-bold mb-4">
                {t('workExperienceTitle')}
              </h3>
              {data.workExperience.map((exp, index) => (
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
          {hasValidSkills(data.skills) && (
            <div className="card">
              <h3 className="xs:text-lg md:text-xl font-bold mb-4">
                {t('skills')}
              </h3>
              <div className="xs:flex flex-col md:grid grid-cols-4 gap-4">
                {data.skills.map((skill, index) => (
                  <div key={index}>
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages Section */}
          {hasValidLanguages(data.languages) && (
            <div className="card">
              <h3 className="xs:text-lg md:text-xl font-bold mb-4">
                {t('languages')}
              </h3>
              <div className="xs:flex flex-col md:grid grid-cols-2 gap-4">
                {data.languages.map((language, index) => (
                  <div key={index}>
                    <span className="font-bold">{language.language}: </span>
                    <span>{language.level}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Studies Section */}
          {hasValidStudies(data.studies) && (
            <div className="card">
              <h3 className="xs:text-lg md:text-xl font-bold mb-4">
                {t('education')}
              </h3>
              {data.studies.map((study, index) => (
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
              className="p-2 rounded-full bg-midnight-200">
              <option value="harvard">{t('harvard')}</option>
              <option value="modern">{t('modern')}</option>
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
                      aboutMe: t('aboutMe'),
                      techStack: t('techStack'),
                    }}
                  />
                }
                fileName={`resume_${
                  data.personalInfo.fullName || 'cv'
                }_${selectedTemplate}.pdf`}
                onClick={handleDownloadClick}
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
