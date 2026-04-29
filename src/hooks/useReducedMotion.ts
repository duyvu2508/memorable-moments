import { AccessibilityInfo, Platform } from 'react-native';
import { useEffect, useState } from 'react';

function getInitialWebPreference() {
  if (Platform.OS !== 'web' || typeof window === 'undefined' || !window.matchMedia) {
    return false;
  }

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(getInitialWebPreference);

  useEffect(() => {
    let isMounted = true;

    AccessibilityInfo.isReduceMotionEnabled()
      .then((enabled) => {
        if (isMounted) {
          setPrefersReducedMotion(enabled || getInitialWebPreference());
        }
      })
      .catch(() => {
        if (isMounted) {
          setPrefersReducedMotion(getInitialWebPreference());
        }
      });

    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', (enabled) => {
      setPrefersReducedMotion(enabled || getInitialWebPreference());
    });

    let mediaQuery: MediaQueryList | undefined;
    let handleChange: ((event: MediaQueryListEvent) => void) | undefined;

    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.matchMedia) {
      mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      handleChange = (event) => {
        setPrefersReducedMotion(event.matches);
      };
      mediaQuery.addEventListener?.('change', handleChange);
    }

    return () => {
      isMounted = false;
      subscription.remove();
      if (mediaQuery && handleChange) {
        mediaQuery.removeEventListener?.('change', handleChange);
      }
    };
  }, []);

  return prefersReducedMotion;
}
