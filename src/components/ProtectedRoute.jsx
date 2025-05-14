import PropTypes from 'prop-types';
import { Navigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ stepKey, children }) => {
  const { user, formData } = useAuth();

  // Users authenticated in Firebase are also authenticated in the app
  if (user) {
    return children;
  }

  // Define each step and its required fields
  const requiredFields = {
    personalInfo: [], // <-- nothing required for this step
    workExperience: ['personalInfo'],
    skills: ['personalInfo', 'workExperience'],
    studies: ['personalInfo', 'workExperience', 'skills'],
    languages: ['personalInfo', 'workExperience', 'skills', 'studies'],
    resume: [
      'personalInfo',
      'workExperience',
      'skills',
      'studies',
      'languages',
    ],
  };

  // If the stepKey is not in requiredFields, we assume it's a public route
  if (!Object.prototype.hasOwnProperty.call(requiredFields, stepKey)) {
    return children;
  }

  // Check if the required fields for the current step are filled
  const isAllowed = requiredFields[stepKey].every((field) => !!formData[field]);

  // If the user is not authenticated and the required fields are not filled, redirect to the first step
  if (!isAllowed) {
    return <Navigate to="/" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  stepKey: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
