import { useCallback, useMemo, useRef, useState } from 'react';
import { Animated, FlatList, NativeScrollEvent, NativeSyntheticEvent, useWindowDimensions } from 'react-native';

import { stories } from '../constants/stories';

export function useMemorableCarousel() {
  const { width, height } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const listRef = useRef<FlatList>(null);

  const isLandscape = width > height;
  const isCompact = width < 400;
  const pageWidth = width;
  const cardWidth = useMemo(() => {
    const viewport = Math.min(width, 960);
    return isLandscape ? Math.min(viewport * 0.6, 560) : Math.min(viewport - 40, 420);
  }, [isLandscape, width]);

  const cardMinHeight = useMemo(() => {
    if (isCompact) {
      return Math.min(Math.max(height * 0.5, 460), 560);
    }

    return Math.min(Math.max(height * 0.54, 500), 640);
  }, [height, isCompact]);

  const clampIndex = useCallback((index: number) => {
    return Math.max(0, Math.min(stories.length - 1, index));
  }, []);

  const activateCard = useCallback(
    (index: number) => {
      const nextIndex = clampIndex(index);
      setActiveIndex((currentIndex) => (currentIndex === nextIndex ? currentIndex : nextIndex));
      listRef.current?.scrollToOffset({
        animated: true,
        offset: nextIndex * pageWidth,
      });
    },
    [clampIndex, pageWidth],
  );

  const handleSnapEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const nextIndex = clampIndex(Math.round(event.nativeEvent.contentOffset.x / pageWidth));
      setActiveIndex((currentIndex) => (currentIndex === nextIndex ? currentIndex : nextIndex));
    },
    [clampIndex, pageWidth],
  );

  const getItemLayout = useCallback(
    (_: ArrayLike<typeof stories[number]> | null | undefined, index: number) => ({
      length: pageWidth,
      offset: pageWidth * index,
      index,
    }),
    [pageWidth],
  );

  const animatedScrollHandler = useMemo(
    () =>
      Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
        useNativeDriver: true,
      }),
    [scrollX],
  );

  return {
    activeIndex,
    activateCard,
    animatedScrollHandler,
    cardMinHeight,
    cardWidth,
    getItemLayout,
    handleSnapEnd,
    isCompact,
    listRef,
    pageWidth,
    scrollX,
  };
}
