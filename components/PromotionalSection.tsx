import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function PromotionalSection() {
  const handleShopNow = () => {
    // Handle shop now navigation
    console.log('Shop now pressed');
  };

  return (
    <View style={styles.container}>
      {/* Hero Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ 
            uri: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=800' 
          }}
          style={styles.heroImage}
          resizeMode="cover"
        />
      </View>
      
      {/* Orange Content Section */}
      <View style={styles.contentSection}>
        <Text style={styles.subtitle}>TIMELESS MUST-HAVES</Text>
        <Text style={styles.title}>GET READY FOR SUMMER</Text>
        <Text style={styles.description}>
          See our selection of colorful sandals in several models. All produced in Europe.
        </Text>
        
        <TouchableOpacity style={styles.shopButton} onPress={handleShopNow}>
          <Text style={styles.shopButtonText}>SHOP NOW</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
  imageContainer: {
    width: '100%',
    height: 500,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  contentSection: {
    backgroundColor: '#f97316',
    paddingHorizontal: 32,
    paddingVertical: 48,
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    letterSpacing: 2,
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'Assistant, sans-serif',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1f2937',
    letterSpacing: 1,
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 38,
    fontFamily: 'Assistant, sans-serif',
  },
  description: {
    fontSize: 16,
    color: '#1f2937',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
    maxWidth: 300,
    fontFamily: 'Assistant, sans-serif',
  },
  shopButton: {
    borderWidth: 2,
    borderColor: '#1f2937',
    paddingVertical: 16,
    paddingHorizontal: 32,
    backgroundColor: 'transparent',
  },
  shopButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    letterSpacing: 1,
    fontFamily: 'Assistant, sans-serif',
  },
});