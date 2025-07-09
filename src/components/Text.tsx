import React from 'react';
import { Text as RNText, TextProps } from 'react-native';
import { colors, typography, spacing } from '../theme';

interface CustomTextProps extends TextProps {
  variant?: 'title' | 'subtitle' | 'body' | 'label' | 'button' | 'detail';
  children: React.ReactNode;
}

const CustomText: React.FC<CustomTextProps> = ({ variant = 'body', style, children, ...props }) => {
  const getVariantStyle = () => {
    switch (variant) {
      case 'title':
        return {
          fontSize: typography.sizes['4xl'],
          fontWeight: typography.weights.bold,
          textAlign: 'center' as const,
          marginTop: spacing.base,
          color: colors.textPrimary,
        };
      case 'subtitle':
        return {
          fontSize: typography.sizes.base,
          textAlign: 'center' as const,
          color: colors.textSecondary,
          marginBottom: spacing['2xl'],
        };
      case 'label':
        return {
          fontWeight: typography.weights.semibold,
          color: colors.textTertiary,
          fontSize: typography.sizes.md,
          marginBottom: spacing.sm,
        };
      case 'button':
        return {
          color: colors.white,
          fontWeight: typography.weights.bold,
          fontSize: typography.sizes.lg,
        };
      case 'detail':
        return {
          color: colors.textSecondary,
          fontSize: typography.sizes.sm,
        };
      case 'body':
      default:
        return {
          fontSize: typography.sizes.lg,
          color: colors.textSecondary,
          fontWeight: typography.weights.medium,
        };
    }
  };

  return (
    <RNText style={[getVariantStyle(), style]} {...props}>
      {children}
    </RNText>
  );
};

export default CustomText; 