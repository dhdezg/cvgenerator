import { X } from 'lucide-react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';

const Auth = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const { t } = useTranslation();

  // Use auth context methods and state
  const { login, register, loginWithGoogle, authError } = useAuth();

  const handleAuth = async (event) => {
    event.preventDefault();

    try {
      if (isRegister) {
        const result = await register(email, password);
        if (result.success) {
          if (result.message === 'verification_email_sent') {
            // Show verification email message if needed
            // We could add a UI state here to show a success message
          }
          onClose();
        }
      } else {
        const result = await login(email, password);
        if (result.success) {
          onClose();
        }
      }
    } catch (err) {
      // Error handling is now in the context
      console.error(err);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await loginWithGoogle();
      if (result.success) {
        onClose();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 transform transition-all">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-midnight-900">
            {isRegister ? t('auth.register') : t('auth.login')}
          </h2>
          <button onClick={onClose}>
            <X className="text-midnight-800 hover:text-midnight-500" />
          </button>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder={t('auth.email')}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full p-3 border border-midnight-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-midnight-700"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder={t('auth.password')}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full p-3 border border-midnight-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-midnight-700"
              required
            />
          </div>

          {authError && (
            <p className="text-red-500 text-sm text-center">
              {t(`authErrors.${authError}`) || authError}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-midnight-600 text-white py-3 rounded-lg hover:bg-midnight-700 transition-colors"
          >
            {isRegister ? t('auth.registerButton') : t('auth.loginButton')}
          </button>
        </form>

        <div className="my-4 flex items-center">
          <div className="flex-grow border-t border-midnight-500"></div>
          <span className="px-4 text-midnight-500 select-none">
            {t('auth.or')}
          </span>
          <div className="flex-grow border-t border-midnight-500"></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full border border-midnight-500 py-3 rounded-lg hover:bg-midnight-50 transition-colors flex items-center justify-center gap-2"
        >
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google"
            className="w-5 h-5"
          />
          {t('auth.googleLogin')}
        </button>

        <p className="mt-4 text-center text-midnight-600">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="hover:underline"
          >
            {isRegister ? t('auth.haveAccount') : t('auth.noAccount')}
          </button>
        </p>
      </div>
    </div>
  );
};

Auth.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Auth;
