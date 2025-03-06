import { doc, getDoc } from 'firebase/firestore';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { auth, db } from '../firebaseConfig';
import InputField from './ui/inputField';
import NavigationButtons from './ui/navigationButtons';
import { InfoTooltip } from './ui/tooltip';

const PersonalInfo = ({ next, onSave }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('formData');
    return savedData
      ? JSON.parse(savedData).personalInfo || {}
      : {
          fullName: '',
          email: '',
          phone: '',
          address: '',
          linkedin: '',
          interestingLinks: '',
          workPosition: '',
          aboutMe: '',
        };
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      if (!auth.currentUser) return;

      const userRef = doc(db, 'users', auth.currentUser.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data().data?.personalInfo || {};
        setFormData((prev) => ({ ...prev, ...userData }));

        localStorage.setItem(
          'formData',
          JSON.stringify({
            ...JSON.parse(localStorage.getItem('formData') || '{}'),
            personalInfo: userData,
          })
        );
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    localStorage.setItem(
      'formData',
      JSON.stringify({
        ...JSON.parse(localStorage.getItem('formData') || '{}'),
        personalInfo: { ...formData, [name]: value },
      })
    );
  };

  const handleNext = () => {
    const requiredFields = ['fullName', 'email', 'phone', 'workPosition'];
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = t('fieldRequired');
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave(formData, 'personalInfo');
    next();
  };

  const renderFormField = (key) => {
    const label = t(key);

    if (key === 'aboutMe') {
      return (
        <div key={key} className="flex flex-col col-span-3">
          <label className="xs:text-sm md:text-lg mb-2">{label}</label>
          <textarea
            name={key}
            value={formData[key] || ''}
            onChange={handleInputChange}
            rows={3}
            placeholder={t('placeholders.aboutMe')}
            className="min-h-[100px] resize-y xs:placeholder:text-xs md:placeholder:text-sm bg-midnight-100 p-2 border rounded-md text-midnight-950 font-normal focus:outline-none focus:ring-2 focus:ring-midnight-500"
          />
        </div>
      );
    }

    return (
      <div key={key} className="flex flex-col gap-1">
        <InputField
          onChange={handleInputChange}
          label={label}
          name={key}
          value={formData[key]}
          t={t}
        />
        {errors[key] && (
          <span className="text-red-500 text-sm">{errors[key]}</span>
        )}
      </div>
    );
  };

  return (
    <section id="personalInfo" className="w-full">
      <div className="step-container">
        <div className="flex items-center gap-4">
          <h2 className="step-title">{t('personalInfoTitle')}</h2>
          <InfoTooltip message={t('infoMessage')}></InfoTooltip>
        </div>
        <div className="card xs:w-full md:w-3/4 xs:flex flex-col md:grid grid-cols-3 xs:gap-4 md:gap-6 font-bold text-midnight-100">
          {Object.keys(formData).map((key) => renderFormField(key))}
        </div>
        <NavigationButtons showPrev={false} onNext={handleNext} />
      </div>
    </section>
  );
};

PersonalInfo.propTypes = {
  next: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default PersonalInfo;
