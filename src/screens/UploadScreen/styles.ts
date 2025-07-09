import { StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../../theme';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing['2xl'],
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: typography.sizes['4xl'],
    fontWeight: typography.weights.bold,
    textAlign: 'center',
    marginTop: spacing.base,
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: typography.sizes.base,
    textAlign: 'center',
    color: colors.textSecondary,
    marginBottom: spacing['2xl'],
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing['2xl'],
    marginBottom: spacing.sm,
  },
  sectionIcon: {
    color: colors.textSecondary,
    marginRight: spacing.sm,
  },
  sectionTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  audioSubtitle: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginTop: -spacing.xs,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: spacing['3xl'],
    gap: spacing.lg,
  },
  videoSlot: {
    width: 140,
    height: 110,
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
    borderRadius: spacing.base,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    backgroundColor: colors.background,
  },
  icon: {
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  slotText: {
    fontSize: typography.sizes.lg,
    color: colors.textSecondary,
    fontWeight: typography.weights.medium,
  },
  audioSlot: {
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
    borderRadius: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing['2xl'],
    marginBottom: spacing['2xl'],
    backgroundColor: colors.white,
  },
  audioText: {
    fontSize: typography.sizes.base,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  compileButton: {
    backgroundColor: colors.primary,
    borderRadius: spacing.sm,
    paddingVertical: spacing.base,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  compileButtonText: {
    color: colors.white,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes.lg,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: spacing.sm,
    marginBottom: spacing.sm,
    backgroundColor: '#eee',
  },
});

export default styles; 