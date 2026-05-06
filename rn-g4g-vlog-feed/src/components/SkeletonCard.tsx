import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

export function SkeletonCard() {
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
    );
    anim.start();
    return () => anim.stop();
  }, [opacity]);

  return (
    <View style={styles.card}>
      <Animated.View style={[styles.line, styles.tag, { opacity }]} />
      <Animated.View style={[styles.line, styles.title, { opacity }]} />
      <Animated.View style={[styles.line, styles.titleShort, { opacity }]} />
      <Animated.View style={[styles.line, styles.meta, { opacity }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  line: {
    backgroundColor: '#E5E7EB',
    borderRadius: 6,
  },
  tag: {
    width: 80,
    height: 18,
    marginBottom: 12,
  },
  title: {
    height: 18,
    marginBottom: 8,
  },
  titleShort: {
    width: '60%',
    height: 18,
    marginBottom: 16,
  },
  meta: {
    width: 120,
    height: 14,
  },
});
