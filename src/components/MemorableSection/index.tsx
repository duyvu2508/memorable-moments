import { useEffect, useRef } from 'react';
import { Animated, Easing, ScrollView, Text, View } from 'react-native';

import { useReducedMotion } from '../../hooks/useReducedMotion';
import { StoryCarousel } from './StoryCarousel';
import { styles } from './styles';

export function MemorableSection() {
  const prefersReducedMotion = useReducedMotion();
  const headerProgress = useRef(new Animated.Value(prefersReducedMotion ? 1 : 0)).current;
  const carouselProgress = useRef(new Animated.Value(prefersReducedMotion ? 1 : 0)).current;

  useEffect(() => {
    if (prefersReducedMotion) {
      headerProgress.setValue(1);
      carouselProgress.setValue(1);
      return;
    }

    Animated.stagger(120, [
      Animated.timing(headerProgress, {
        toValue: 1,
        duration: 520,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(carouselProgress, {
        toValue: 1,
        duration: 640,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [carouselProgress, headerProgress, prefersReducedMotion]);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="always"
      contentContainerStyle={styles.section}
      style={styles.container}
    >
      <Animated.View
        style={[
          styles.header,
          {
            opacity: headerProgress,
            transform: [
              {
                translateY: headerProgress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [18, 0],
                }),
              },
            ],
          },
        ]}
      >
        <Text style={styles.eyebrow}>ZIM home section</Text>
        <Text style={styles.title}>6602 khoảnh khắc đáng nhớ</Text>
        <Text style={styles.description}>
          Hàng ngàn khoảnh khắc đáng nhớ về hành trình học tập thú vị luôn được
          ZIM ghi lại mỗi ngày tại 21 trung tâm Anh Ngữ ZIM trên toàn quốc.
        </Text>
      </Animated.View>

      <Animated.View
        style={{
          opacity: carouselProgress,
          transform: [
            {
              translateY: carouselProgress.interpolate({
                inputRange: [0, 1],
                outputRange: [28, 0],
              }),
            },
            {
              scale: carouselProgress.interpolate({
                inputRange: [0, 1],
                outputRange: [0.985, 1],
              }),
            },
          ],
        }}
      >
        <StoryCarousel prefersReducedMotion={prefersReducedMotion} />
      </Animated.View>
    </ScrollView>
  );
}
