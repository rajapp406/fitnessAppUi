import React from 'react';

interface WelcomeSectionProps {
  userName: string;
  subtitle?: string;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({
  userName,
  subtitle = 'Ready to crush your fitness goals today?',
}) => {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        Welcome back, {userName}! 👋
      </h2>
      {subtitle && (
        <p className="text-gray-600">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default WelcomeSection;
