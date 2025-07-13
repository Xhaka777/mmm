import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/components/Header';
import HeroSlider from '@/components/HeroSlider';
import PromotionalSection from '@/components/PromotionalSection';
import BestsellersSection from '@/components/BestsellersSection';
import CollectionsSection from '@/components/CollectionsSection';
import ProductsSection from '@/components/ProductsSection';
import Footer from '@/components/Footer';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <HeroSlider />
        <PromotionalSection />
        <BestsellersSection />
        <CollectionsSection />
        <ProductsSection />
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
});