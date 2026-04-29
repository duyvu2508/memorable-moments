import { memo, useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Linking,
  Pressable,
  Text,
  View,
} from 'react-native';

import type { Story } from '../../constants/stories';
import { colors, styles } from './styles';

type StoryCardProps = {
  cardMinHeight: number;
  cardGap: number;
  cardWidth: number;
  index: number;
  isActive: boolean;
  isCompact: boolean;
  pageWidth: number;
  prefersReducedMotion: boolean;
  scrollX: Animated.Value;
  story: Story;
  onActivateIndex: (index: number) => void;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedImage = Animated.createAnimatedComponent(Animated.Image);
const AnimatedButtonPressable = Animated.createAnimatedComponent(Pressable);

function StoryCardComponent({
  cardMinHeight,
  cardGap,
  cardWidth,
  index,
  isActive,
  isCompact,
  pageWidth,
  prefersReducedMotion,
  scrollX,
  story,
  onActivateIndex,
}: StoryCardProps) {
  const hover = useRef(new Animated.Value(0)).current;
  const focus = useRef(new Animated.Value(0)).current;
  const active = useRef(new Animated.Value(isActive ? 1 : 0)).current;
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      active.setValue(isActive ? 1 : 0);
      return;
    }

    Animated.spring(active, {
      toValue: isActive ? 1 : 0,
      useNativeDriver: true,
      stiffness: 180,
      damping: 20,
      mass: 0.9,
    }).start();
  }, [active, isActive, prefersReducedMotion]);

  const runHover = (toValue: number) => {
    if (prefersReducedMotion) {
      hover.setValue(toValue);
      return;
    }

    Animated.timing(hover, {
      toValue,
      duration: 220,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };

  const runFocus = (toValue: number) => {
    if (prefersReducedMotion) {
      focus.setValue(toValue);
      return;
    }

    Animated.timing(focus, {
      toValue,
      duration: 180,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  };

  const parallaxInput = useMemo(
    () => [(index - 1) * pageWidth, index * pageWidth, (index + 1) * pageWidth],
    [index, pageWidth],
  );

  const imageTranslateX = prefersReducedMotion
    ? 0
    : scrollX.interpolate({
        inputRange: parallaxInput,
        outputRange: [cardWidth * 0.035, 0, -cardWidth * 0.035],
        extrapolate: 'clamp',
      });

  const scrollLift = prefersReducedMotion
    ? 0
    : scrollX.interpolate({
        inputRange: parallaxInput,
        outputRange: [14, 0, 14],
        extrapolate: 'clamp',
      });

  const cardScale = prefersReducedMotion
    ? 1
    : Animated.add(
        scrollX.interpolate({
          inputRange: parallaxInput,
          outputRange: [0.965, 1, 0.965],
          extrapolate: 'clamp',
        }),
        Animated.multiply(focus, 0.012),
      );

  const cardLift = prefersReducedMotion
    ? 0
    : Animated.add(
        scrollLift,
        Animated.add(
          Animated.multiply(hover, -10),
          Animated.add(Animated.multiply(active, -8), Animated.multiply(focus, -6)),
        ),
      );

  const cardOpacity = prefersReducedMotion
    ? 1
    : scrollX.interpolate({
        inputRange: parallaxInput,
        outputRange: [0.82, 1, 0.82],
        extrapolate: 'clamp',
      });

  const overlayOpacity = prefersReducedMotion
    ? isActive
      ? 1
      : 0
    : Animated.add(
        0.08,
        Animated.add(
          Animated.multiply(hover, 0.1),
          Animated.add(
            Animated.multiply(active, 0.12),
            Animated.add(
              Animated.multiply(focus, 0.08),
              scrollX.interpolate({
                inputRange: parallaxInput,
                outputRange: [0.1, 0, 0.1],
                extrapolate: 'clamp',
              }),
            ),
          ),
        ),
      );

  const ctaOpacity = prefersReducedMotion
    ? isActive
      ? 1
      : 0.8
    : Animated.add(
        0.56,
        Animated.add(
          Animated.multiply(hover, 0.18),
          Animated.add(
            Animated.multiply(active, 0.18),
            scrollX.interpolate({
              inputRange: parallaxInput,
              outputRange: [0, 0.18, 0],
              extrapolate: 'clamp',
            }),
          ),
        ),
      );

  const ctaArrowShift = prefersReducedMotion
    ? 0
    : Animated.add(Animated.multiply(hover, 7), Animated.multiply(active, 5));

  const imageScale = prefersReducedMotion
    ? 1
    : Animated.add(1.12, Animated.add(Animated.multiply(hover, 0.018), Animated.multiply(active, 0.012)));

  const imageBleed = Math.max(cardWidth * 0.1, 24);

  const ctaTranslateY = prefersReducedMotion
    ? 0
    : Animated.add(
        scrollX.interpolate({
          inputRange: parallaxInput,
          outputRange: [10, 0, 10],
          extrapolate: 'clamp',
        }),
        Animated.add(6, Animated.add(Animated.multiply(hover, -6), Animated.multiply(active, -6))),
      );

  const topRowTranslateY = prefersReducedMotion
    ? 0
    : Animated.add(
        Animated.multiply(active, -4),
        scrollX.interpolate({
          inputRange: parallaxInput,
          outputRange: [10, 0, 10],
          extrapolate: 'clamp',
        }),
      );

  const pressCard = () => {
    onActivateIndex(index);
  };

  const pressCta = async () => {
    if (!isActive) {
      onActivateIndex(index);
      runHover(1);
      return;
    }

    try {
      await Linking.openURL(story.href);
    } catch {
      onActivateIndex(index);
    }
  };

  return (
    <View style={[styles.cardSlot, { width: pageWidth, paddingHorizontal: cardGap / 2 }]}>
      <AnimatedPressable
        accessibilityHint="Chạm để chọn và hiển thị trạng thái nổi bật cho story."
        accessibilityLabel={`${story.title}. ${story.subtitle}`}
        accessibilityRole="button"
        accessibilityState={{ selected: isActive }}
        focusable
        onBlur={() => {
          setIsFocused(false);
          runFocus(0);
        }}
        onFocus={() => {
          setIsFocused(true);
          onActivateIndex(index);
          runFocus(1);
        }}
        onHoverIn={() => {
          onActivateIndex(index);
          runHover(1);
        }}
        onHoverOut={() => runHover(0)}
        onPress={pressCard}
        style={[styles.cardShell, { width: cardWidth }]}
      >
        <Animated.View
          style={[
            styles.card,
            isFocused ? styles.cardFocused : null,
            isActive && !isFocused ? { borderColor: colors.accentBorder } : null,
            {
              opacity: cardOpacity as any,
              transform: [{ translateY: cardLift }, { scale: cardScale }],
            },
          ]}
        >
          <View style={[styles.image, { minHeight: cardMinHeight }]}>
            <AnimatedImage
              resizeMethod="resize"
              resizeMode="cover"
              source={{ uri: story.imageUri }}
              style={[
                styles.imageMedia,
                {
                  top: -imageBleed,
                  right: -imageBleed,
                  bottom: -imageBleed,
                  left: -imageBleed,
                  transform: [
                    { translateX: imageTranslateX as any },
                    { scale: imageScale as any },
                  ],
                },
              ]}
            />
            <View style={styles.overlayBase} />
            <Animated.View style={[styles.overlayReveal, { opacity: overlayOpacity as any }]} />
            <View style={styles.vignetteTop} />

            <View style={[styles.content, isCompact ? styles.contentCompact : null]}>
              <Animated.View
                style={[
                  styles.pillRow,
                  { transform: [{ translateY: topRowTranslateY as any }] },
                ]}
              >
                <View style={[styles.pill, isCompact ? styles.pillCompact : null]}>
                  <Text style={[styles.pillText, isCompact ? styles.pillTextCompact : null]}>Khoảnh khắc đáng nhớ</Text>
                </View>
                <Text style={styles.indexText}>{`0${index + 1}`}</Text>
              </Animated.View>

              <Animated.View
                style={[
                  styles.captionBlock,
                  isCompact ? styles.captionBlockCompact : null,
                ]}
              >
                <Text style={styles.subtitle}>{story.subtitle}</Text>
                <Text numberOfLines={2} style={[styles.cardTitle, isCompact ? styles.cardTitleCompact : null]}>
                  {story.title}
                </Text>
                <Text style={[styles.cardDescription, isCompact ? styles.cardDescriptionCompact : null]}>
                  {story.description}
                </Text>
                <Animated.View
                  style={[
                    styles.ctaRow,
                    {
                    opacity: ctaOpacity as any,
                    transform: [{ translateY: ctaTranslateY as any }],
                  },
                  ]}
                >
                  <AnimatedButtonPressable
                    accessibilityHint="Mở câu chuyện chi tiết."
                    accessibilityLabel={story.ctaLabel}
                    accessibilityRole="link"
                    onPress={pressCta}
                    style={styles.ctaInline}
                  >
                    <Text style={[styles.ctaText, isCompact ? styles.ctaTextCompact : null]}>{story.ctaLabel}</Text>
                    <Animated.Text style={[styles.ctaArrowInline, { transform: [{ translateX: ctaArrowShift as any }] }]}>
                      →
                    </Animated.Text>
                  </AnimatedButtonPressable>
                </Animated.View>
              </Animated.View>
            </View>
          </View>
        </Animated.View>
      </AnimatedPressable>
    </View>
  );
}

export const StoryCard = memo(StoryCardComponent);
