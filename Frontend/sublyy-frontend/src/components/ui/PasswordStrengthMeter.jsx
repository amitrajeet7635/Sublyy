import React from 'react';

export const PasswordStrengthMeter = ({ password }) => {
  const calculateStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 8) strength++;
    if (/[A-Z]/.test(pass)) strength++;
    if (/[0-9]/.test(pass)) strength++;
    if (/[^A-Za-z0-9]/.test(pass)) strength++;
    return strength;
  };

  const strength = calculateStrength(password);
  const getColor = () => {
    switch (strength) {
      case 0: return 'bg-gray-300';
      case 1: return 'bg-red-500';
      case 2: return 'bg-orange-500';
      case 3: return 'bg-yellow-500';
      case 4: return 'bg-green-500';
      default: return 'bg-gray-200';
    }
  };

  const getMessage = () => {
    switch (strength) {
      case 0: return 'Very Weak';
      case 1: return 'Weak';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Strong';
      default: return '';
    }
  };

  return (
    <div className="w-full space-y-2">
      <div className="flex gap-1 h-1">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`h-full w-1/4 rounded-full transition-all duration-300 ${
              i < strength ? getColor() : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
      <p className={`text-xs ${getColor().replace('bg-', 'text-')} transition-colors`}>
        {getMessage()}
      </p>
    </div>
  );
};