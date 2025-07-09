import { StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../../theme';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing['2xl'],
    backgroundColor: colors.background,
  },
  container: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: typography.sizes['3xl'],
    fontWeight: typography.weights.bold,
    textAlign: 'center',
    marginTop: spacing.base,
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: typography.sizes.sm,
    textAlign: 'center',
    color: colors.textSecondary,
    marginBottom: spacing.lg,
    marginTop: spacing.xs,
  },
  previewLabel: {
    fontWeight: typography.weights.semibold,
    color: colors.textTertiary,
    fontSize: typography.sizes.md,
    marginBottom: spacing.sm,
    alignSelf: 'flex-start',
  },
  previewBox: {
    alignItems: 'center',
    marginBottom: spacing['2xl'],
    width: '100%',
  },
  videoPreview: {
    width: 220,
    height: 390,
    borderRadius: spacing['2xl'],
    backgroundColor: colors.videoPreviewBg,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: spacing.md,
    shadowColor: colors.shadow,
    shadowOpacity: 0.10,
    shadowRadius: spacing.md,
    elevation: 6,
  },
  videoImage: {
    width: 220,
    height: 390,
    resizeMode: 'cover',
    borderRadius: spacing['2xl'],
  },
  detailsBox: {
    backgroundColor: colors.white,
    borderRadius: spacing.base,
    padding: spacing.xl,
    width: '100%',
    marginBottom: spacing['2xl'],
    shadowColor: colors.shadow,
    shadowOpacity: 0.06,
    shadowRadius: spacing.sm,
    elevation: 3,
  },
  detailsTitle: {
    fontWeight: typography.weights.semibold,
    fontSize: typography.sizes.md,
    marginBottom: spacing.sm,
    color: colors.textQuaternary,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  detailLabel: {
    color: colors.textSecondary,
    fontSize: typography.sizes.sm,
  },
  detailValue: {
    color: colors.textQuaternary,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
  },
  downloadButton: {
    backgroundColor: colors.primary,
    borderRadius: spacing.sm,
    paddingVertical: spacing.md + 2,
    alignItems: 'center',
    width: '100%',
    marginBottom: spacing.sm,
  },
  downloadButtonText: {
    color: colors.white,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes.lg,
  },
  createAnother: {
    marginTop: spacing.xs,
  },
  createAnotherText: {
    color: colors.primaryLight,
    fontSize: typography.sizes.md,
    textAlign: 'center',
  },
});

export default styles; 