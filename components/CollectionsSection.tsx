import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import CollectionCard from './CollectionCard';
import { productImages } from '@/utils/images';

const { width } = Dimensions.get('window');

const collections = [
  {
    id: 1,
    name: 'Summer Shoes',
    image: productImages.shoeOrange1, // Local image
  },
  {
    id: 2,
    name: 'Leather Bags',
    image: productImages.shoePink1, // Local image
  },
  {
    id: 3,
    name: 'Accessories',
    image: productImages.shoeGreen1, // Local image
  },
  {
    id: 4,
    name: 'Men\'s Collection',
    image: productImages.shoeCofe1, // Local image
  },
  {
    id: 5,
    name: 'Women\'s Collection',
    image: productImages.shoeViol1, // Local image
  },
  {
    id: 6,
    name: 'Casual Wear',
    image: productImages.shoeBrown2, // Local image
  },
];

export default function CollectionsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const onScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    
    if (roundIndex !== currentIndex) {
      setCurrentIndex(roundIndex);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Summer Collections</Text>
      <Text style={styles.kollektionetTitle}>Kolektionet</Text>
      
      <View style={styles.sliderContainer}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
          decelerationRate="fast"
          snapToInterval={width}
          snapToAlignment="center"
        >
          {collections.map((collection) => (
            <View key={collection.id} style={styles.slide}>
              <CollectionCard
                name={collection.name}
                image={collection.image}
              />
            </View>
          ))}
        </ScrollView>
        
        <View style={styles.pagination}>
          {collections.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentIndex ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    backgroundColor: '#ffffff',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: 'Assistant, sans-serif',
  },
  kollektionetTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Assistant, sans-serif',
  },
  sliderContainer: {
    height: 300,
    position: 'relative',
  },
  slide: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pagination: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#1f2937',
  },
  inactiveDot: {
    backgroundColor: 'rgba(31, 41, 55, 0.3)',
  },
});