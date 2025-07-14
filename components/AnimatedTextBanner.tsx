import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function AnimatedTextBanner() {
  const translateX = useSharedValue(0);
  const [textWidth, setTextWidth] = useState(0);

  useEffect(() => {
    // Start the animation when component mounts
    translateX.value = withRepeat(
      withTiming(1, { duration: 15000 }), // 15 seconds for one complete cycle
      -1, // Infinite repeat
      false // Don't reverse
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    // Calculate the text movement from right edge to completely off-screen left
    const startPosition = width;
    const endPosition = -(textWidth + 50); // Add some buffer
    
    return {
      transform: [
        {
          translateX: interpolate(
            translateX.value,
            [0, 1],
            [startPosition, endPosition]
          ),
        },
      ],
    };
  });

  const handleTextLayout = (event: any) => {
    const { width: measuredWidth } = event.nativeEvent.layout;
    setTextWidth(measuredWidth);
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Animated.View style={[styles.animatedText, animatedStyle]}>
          <Text 
            style={styles.text}
            onLayout={handleTextLayout}
            numberOfLines={1}
          >
            Large selection of summer sandals and slippers
          </Text>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fbbf24', // Yellow background (same as your add to cart button)
    paddingVertical: 30, // Increased padding for larger text
    overflow: 'hidden',
  },
  textContainer: {
    height: 60, // Increased height to accommodate larger text
    justifyContent: 'center',
    overflow: 'hidden',
  },
  animatedText: {
    position: 'absolute',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center', // Center the text vertically
    minWidth: 1000, // Give enough width for 40px text
  },
  text: {
    fontSize: 44, // Large font size as requested
    fontWeight: '300',
    color: '#1f2937',
    letterSpacing: 1,
    fontFamily: 'Assistant, sans-serif',
    lineHeight: 50, // Explicit line height for better control
    includeFontPadding: false, // Remove extra padding on Android
    flexShrink: 0, // Prevent text from shrinking
    whiteSpace: 'nowrap', // Prevent wrapping (web compatibility)
  },
});