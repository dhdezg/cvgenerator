import { doc, getDoc } from 'firebase/firestore';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { auth, db } from '../firebaseConfig';
import InputField from './ui/inputField';
import NavigationButtons from './ui/navigationButtons';
import { InfoTooltip } from './ui/tooltip';

const Skills = ({ next, prev, onSave }) => {
  const { t } = useTranslation();
  const emptySkill = { name: '' };

  const [skills, setSkills] = useState(() => {
    const savedData = localStorage.getItem('formData');
    const storedSkills = savedData ? JSON.parse(savedData).skills || [] : [];
    return storedSkills.length > 0 ? storedSkills : [{ ...emptySkill }];
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (!auth.currentUser) return;

      try {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data().data?.skills || [];
          if (userData.length > 0) {
            setSkills(userData);
          }
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'formData',
      JSON.stringify({
        ...JSON.parse(localStorage.getItem('formData') || '{}'),
        skills: skills,
      })
    );
  }, [skills]);

  const addSkill = () => {
    setSkills((prev) => [...prev, { ...emptySkill }]);
  };

  const handleSkillChange = (index, field, value) => {
    setSkills((prev) =>
      prev.map((skill, i) =>
        i === index ? { ...skill, [field]: value } : skill
      )
    );
  };

  const removeSkill = (index) => {
    setSkills((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    const validSkills = skills.filter((skill) =>
      Object.values(skill).some((value) => value.trim() !== '')
    );

    if (validSkills.length > 0) {
      onSave(validSkills, 'skills');
    } else {
      onSave([], 'skills');
    }
    next();
  };

  const handlePrev = () => {
    const validSkills = skills.filter((skill) =>
      Object.values(skill).some((value) => value.trim() !== '')
    );
    onSave(validSkills, 'skills');
    prev();
  };

  return (
    <section id="skills" className="w-full">
      <div className="step-container">
        <div className="flex items-center gap-4">
          <h2 className="step-title">{t('skillsTitle')}</h2>
          <InfoTooltip message={t('infoMessage')}></InfoTooltip>
        </div>
        <div
          id="steps-container"
          className="flex flex-col gap-4 xs:w-full md:w-3/4">
          {skills.map((skill, index) => (
            <div key={index}>
              <div className="card flex flex-col gap-4">
                <div className="flex justify-between items-center gap-4">
                  <h3 className="text-midnight-100 text-lg font-semibold">
                    {t('skill')} {index + 1}
                  </h3>
                  {skills.length > 1 && (
                    <button
                      onClick={() => removeSkill(index)}
                      className="w-fit self-end px-3 py-1 text-midnight-50 bg-midnight-600 rounded-md hover:bg-midnight-400">
                      {t('remove')}
                    </button>
                  )}
                </div>
                {Object.keys(emptySkill).map((key) => (
                  <InputField
                    key={key}
                    label={t('skillName')}
                    name="skill"
                    value={skill[key]}
                    onChange={(e) =>
                      handleSkillChange(index, key, e.target.value)
                    }
                    t={t}
                  />
                ))}
              </div>
            </div>
          ))}
          <button
            className="funcionality-button w-fit self-center"
            onClick={addSkill}>
            {t('addSkill')}
          </button>
        </div>
        <NavigationButtons onNext={handleNext} onPrev={handlePrev} />
      </div>
    </section>
  );
};

Skills.propTypes = {
  next: PropTypes.func.isRequired,
  prev: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default Skills;
