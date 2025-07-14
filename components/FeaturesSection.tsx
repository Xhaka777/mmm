import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Truck, RotateCcw, Star, Smartphone } from 'lucide-react-native';

export default function FeaturesSection() {
  return (
    <View style={styles.container}>
      <View style={styles.featuresGrid}>
        {/* Fast Delivery */}
        <View style={styles.featureItem}>
          <Truck size={32} color="#1f2937" style={styles.icon} />
          <Text style={styles.featureText}>FAST DELIVERY</Text>
        </View>

        {/* Free Exchange */}
        <View style={styles.featureItem}>
          <RotateCcw size={32} color="#1f2937" style={styles.icon} />
          <Text style={styles.featureText}>FREE EXCHANGE</Text>
        </View>

        {/* Produced in Europe */}
        <View style={styles.featureItem}>
          <Star size={32} color="#1f2937" style={styles.icon} />
          <Text style={styles.featureText}>PRODUCED IN EUROPE</Text>
        </View>

        {/* Pay with MobilePay */}
        <View style={styles.featureItem}>
          <Smartphone size={32} color="#1f2937" style={styles.icon} />
          <Text style={styles.featureText}>PAY WITH MOBILEPAY</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#60a5fa', // Light blue background
    paddingVertical: 40,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureItem: {
    width: '48%', // Two columns
    alignItems: 'center',
    marginBottom: 32,
  },
  icon: {
    marginBottom: 12,
  },
  featureText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
    letterSpacing: 1,
    lineHeight: 16,
    fontFamily: 'Assistant, sans-serif',
  },
});