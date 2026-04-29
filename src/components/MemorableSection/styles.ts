import { Platform, StyleSheet } from 'react-native';

export const colors = {
  background: '#ffffff',
  panel: '#ffffff',
  panelMuted: '#f5f7fb',
  border: 'rgba(15, 23, 42, 0.08)',
  borderStrong: 'rgba(15, 23, 42, 0.16)',
  text: '#111827',
  textMuted: '#5b6473',
  accent: '#8a5a12',
  accentSoft: 'rgba(138,90,18,0.12)',
  accentBorder: 'rgba(138,90,18,0.35)',
  overlay: 'rgba(255, 255, 255, 0.18)',
  overlayStrong: 'rgba(12, 18, 28, 0.12)',
  focus: '#a56b18',
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  section: {
    paddingTop: 28,
    paddingBottom: 72,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  eyebrow: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  title: {
    color: colors.text,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '800',
    marginBottom: 10,
    maxWidth: 540,
  },
  description: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 24,
    maxWidth: 620,
  },
  carouselContent: {
    paddingTop: 16,
    paddingBottom: 8,
  },
  cardSlot: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardShell: {
    width: '100%',
    overflow: 'visible',
  },
  card: {
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: colors.panel,
    borderWidth: 1.5,
    borderColor: colors.borderStrong,
    ...Platform.select({
      ios: {
        shadowColor: '#0f172a',
        shadowOpacity: 0.12,
        shadowRadius: 24,
        shadowOffset: { width: 0, height: 16 },
      },
      android: {
        elevation: 6,
      },
      web: {
        boxShadow: '0px 16px 48px rgba(15, 23, 42, 0.12)',
      },
    }),
  },
  cardFocused: {
    borderColor: colors.focus,
    borderWidth: 2,
  },
  image: {
    justifyContent: 'space-between',
  },
  overlayBase: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlay,
  },
  overlayReveal: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlayStrong,
  },
  vignetteTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '42%',
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  content: {
    flex: 1,
    padding: 22,
  },
  pillRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pill: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(15,23,42,0.08)',
  },
  pillText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  indexText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    overflow: 'hidden',
    backgroundColor: 'rgba(17,24,39,0.44)',
  },
  captionBlock: {
    marginTop: 'auto',
    gap: 12,
    padding: 18,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderWidth: 1,
    borderColor: 'rgba(15,23,42,0.08)',
  },
  subtitle: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 26,
    lineHeight: 31,
    fontWeight: '800',
    maxWidth: '100%',
  },
  cardDescription: {
    color: '#4b5563',
    fontSize: 14,
    lineHeight: 21,
    maxWidth: '100%',
  },
  ctaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    minHeight: 32,
  },
  ctaInline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-end',
  },
  ctaText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  ctaArrowInline: {
    color: colors.accent,
    fontSize: 18,
    fontWeight: '700',
  },
  footer: {
    paddingHorizontal: 20,
    marginTop: 18,
    gap: 14,
  },
  helperText: {
    color: 'rgba(193,203,218,0.82)',
    fontSize: 13,
    lineHeight: 20,
  },
  pagination: {
    flexDirection: 'row',
    gap: 10,
  },
  paginationDot: {
    height: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(15,23,42,0.16)',
  },
  contentCompact: {
    padding: 16,
  },
  pillCompact: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  pillTextCompact: {
    fontSize: 11,
  },
  captionBlockCompact: {
    padding: 12,
    gap: 6,
    borderRadius: 18,
  },
  cardTitleCompact: {
    fontSize: 18,
    lineHeight: 22,
  },
  cardDescriptionCompact: {
    fontSize: 11,
    lineHeight: 17,
  },
  ctaTextCompact: {
    fontSize: 13,
  },
});
