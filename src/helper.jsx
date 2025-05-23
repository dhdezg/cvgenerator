import i18n from '../i18n';

export const formatDate = (dateString) => {
  if (!dateString) return '';

  const date = new Date(dateString);
  if (isNaN(date)) return '';

  const monthNames = i18n.t('months', { returnObjects: true });

  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${month} ${year}`;
};

export const hasValidWorkExperience = (workExperience) => {
  return (
    workExperience &&
    workExperience.some(
      (work) => work.companyName?.trim() || work.position?.trim()
    )
  );
};

export const hasValidSkills = (skills) => {
  return skills && skills.some((skill) => skill.name?.trim());
};

export const hasValidLanguages = (languages) => {
  return (
    languages &&
    languages.some((lang) => lang.language?.trim() || lang.level?.trim())
  );
};

export const hasValidStudies = (studies) => {
  return (
    studies &&
    studies.some((study) => study.schoolName?.trim() || study.degree?.trim())
  );
};

export const hasValidPersonalInfo = (personalInfo) => {
  return (
    personalInfo && Object.values(personalInfo).some((value) => value?.trim())
  );
};

export const getUniqueWorkSkills = (workExperience) => {
  if (!Array.isArray(workExperience)) return [];

  const allSkills = workExperience
    .filter((work) => work.technologies)
    .map((work) => work.technologies.split(',').map((tech) => tech.trim()))
    .flat()
    .filter((tech) => tech);

  return [...new Set(allSkills)];
};
