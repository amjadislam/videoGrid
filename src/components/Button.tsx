import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import CustomText from './Text';
import { colors, spacing } from '../theme';

interface CustomButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'link';
  title: string;
  loading?: boolean;
}

const Button: React.FC<CustomButtonProps> = ({ 
  variant = 'primary', 
  title, 
  loading = false, 
  style, 
  disabled,
  ...props 
}) => {
  const getVariantStyle = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: colors.primary,
          borderRadius: spacing.sm,
          paddingVertical: spacing.md + 2,
          alignItems: 'center' as const,
          width: '100%',
          marginBottom: spacing.sm,
        };
      case 'secondary':
        return {
          backgroundColor: colors.background,
          borderRadius: spacing.sm,
          paddingVertical: spacing.md + 2,
          alignItems: 'center' as const,
          width: '100%',
          marginBottom: spacing.sm,
          borderWidth: 1,
          borderColor: colors.border,
        };
      case 'link':
        return {
          marginTop: spacing.xs,
        };
      default:
        return {};
    }
  };

  const getTextVariant = () => {
    switch (variant) {
      case 'primary':
        return 'button';
      case 'secondary':
        return 'body';
      case 'link':
        return 'body';
      default:
        return 'body';
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'primary':
        return colors.white;
      case 'secondary':
        return colors.primary;
      case 'link':
        return colors.primaryLight;
      default:
        return colors.white;
    }
  };

  return (
    <TouchableOpacity 
      style={[getVariantStyle(), style]} 
      disabled={disabled || loading}
      {...props}
    >
      <CustomText 
        variant={getTextVariant()} 
        style={{ color: getTextColor() }}
      >
        {loading ? 'Loading...' : title}
      </CustomText>
    </TouchableOpacity>
  );
};

export default Button; 