export const colors = {
  // Primary colors
  primary: '#232B3A',
  primaryLight: '#3B82F6',
  
  // Background colors
  background: '#F8F9FB',
  white: '#fff',
  
  // Text colors
  textPrimary: '#222',
  textSecondary: '#6B7280',
  textTertiary: '#374151',
  textQuaternary: '#232B3A',
  
  // Border colors
  border: '#D1D5DB',
  
  // Shadow colors
  shadow: '#000',
  
  // Status colors
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  
  // Video preview background
  videoPreviewBg: '#E5E7EB',
} as const;

export type ColorKey = keyof typeof colors; 