import { Animated } from 'react-native';

import { stories } from '../../constants/stories';
import { useMemorableCarousel } from '../../hooks/useMemorableCarousel';
import { StoryCard } from './StoryCard';
import { styles } from './styles';

type StoryCarouselProps = {
  prefersReducedMotion: boolean;
};

export function StoryCarousel({ prefersReducedMotion }: StoryCarouselProps) {
  const {
    activeIndex,
    activateCard,
    animatedScrollHandler,
    cardMinHeight,
    cardGap,
    cardWidth,
    getItemLayout,
    handleSnapEnd,
    isCompact,
    listRef,
    pageWidth,
    sideInset,
    snapInterval,
    scrollX,
  } = useMemorableCarousel();

  return (
    <>
      <Animated.FlatList
        ref={listRef}
        accessibilityLabel="Danh sách story có thể vuốt ngang"
        contentContainerStyle={[
          styles.carouselContent,
          { paddingHorizontal: sideInset - cardGap / 2 },
        ]}
        data={stories}
        decelerationRate="fast"
        getItemLayout={getItemLayout}
        horizontal
        initialNumToRender={1}
        keyExtractor={(item) => item.id}
        maxToRenderPerBatch={2}
        onMomentumScrollEnd={handleSnapEnd}
        onScroll={prefersReducedMotion ? undefined : animatedScrollHandler}
        renderItem={({ item, index }) => (
          <StoryCard
            cardMinHeight={cardMinHeight}
            cardGap={cardGap}
            cardWidth={cardWidth}
            index={index}
            isActive={index === activeIndex}
            isCompact={isCompact}
            onActivateIndex={activateCard}
            pageWidth={snapInterval}
            prefersReducedMotion={prefersReducedMotion}
            scrollX={scrollX}
            story={item}
          />
        )}
        removeClippedSubviews
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        snapToAlignment="start"
        snapToInterval={snapInterval}
        windowSize={3}
      />
    </>
  );
}
