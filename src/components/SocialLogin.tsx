import React from 'react';
import { useNavigate } from 'react-router';
import { useSocialLogin } from '../hooks/queries/socialAuth';
import { useAppSelector } from '../hooks/redux';
import { Mail, Facebook, Loader2 } from 'lucide-react';

interface SocialLoginProps {
  mode: 'login' | 'register';
}

const SocialLogin: React.FC<SocialLoginProps> = ({ mode }) => {
  const navigate = useNavigate();
  const socialLoginMutation = useSocialLogin();
  const { isLoading } = useAppSelector((state) => state.auth);

  const handleSocialLogin = async (provider: string) => {
    try {
      await socialLoginMutation.mutateAsync(provider);
      navigate('/app/onboarding');
    } catch (error) {
      // Error is handled by the mutation
      console.error(`${provider} login failed:`, error);
    }
  };

  const isProviderLoading = (provider: string) => {
    return isLoading && socialLoginMutation.variables === provider;
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">
            Or {mode} with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <button
          type="button"
          onClick={() => handleSocialLogin('google')}
          disabled={isLoading}
          className="w-full inline-flex justify-center items-center gap-3 py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isProviderLoading('google') ? (
            <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
          ) : (
            <Mail className="h-5 w-5 text-red-500" />
          )}
          Continue with Google
        </button>

        <button
          type="button"
          onClick={() => handleSocialLogin('facebook')}
          disabled={isLoading}
          className="w-full inline-flex justify-center items-center gap-3 py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isProviderLoading('facebook') ? (
            <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
          ) : (
            <Facebook className="h-5 w-5 text-blue-600" />
          )}
          Continue with Facebook
        </button>
      </div>

      {socialLoginMutation.error && (
        <div className="mt-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
          {socialLoginMutation.error.message}
        </div>
      )}
    </div>
  );
};

export default SocialLogin;