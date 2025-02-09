export const formatDate = (dateString) => {
  if (!dateString) return '';

  const date = new Date(dateString);
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

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
