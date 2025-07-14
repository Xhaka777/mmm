import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ProductCard from './ProductCard';
import { productImages } from '@/utils/images';

const products = [
  {
    id: 1,
    name: 'Papuçe Anatomike per Femra-ARTSY-Art34',
    image: productImages.shoeBrown1, // Local image
    discountPrice: 19.8,
    originalPrice: 33,
  },
  {
    id: 2,
    name: 'Çanta Lëkure për Femra-LUXURY-Art45',
    image: productImages.shoePink1, // Local image
    discountPrice: 45.0,
    originalPrice: 65,
  },
  {
    id: 3,
    name: 'Këpucë Sport për Meshkuj-COMFORT-Art12',
    image: productImages.shoeOrange1, // Local image
    discountPrice: 32.5,
    originalPrice: 50,
  },
  {
    id: 4,
    name: 'Aksesore Lëkure-PREMIUM-Art78',
    image: productImages.shoeGreen1, // Local image
    discountPrice: 15.9,
    originalPrice: 25,
  },
];

export default function ProductsSection() {
  const renderProduct = ({ item }: { item: any }) => (
    <ProductCard
      id={item.id.toString()}
      name={item.name}
      image={item.image}
      discountPrice={item.discountPrice}
      originalPrice={item.originalPrice}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        Frymëzohuni nga fryma e sezonit. Zbuloni ardhjet e reja nga koleksionet e këpucëve, çantave, artikujve të vegjël lëkure dhe aksesorëve për meshkuj.
      </Text>
      
      <Text style={styles.saleTitle}>NË SHITJE</Text>
      
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    backgroundColor: '#ffffff',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4b5563',
    textAlign: 'center',
    marginBottom: 24,
    fontFamily: 'Assistant, sans-serif',
  },
  saleTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 24,
    letterSpacing: 2,
    fontFamily: 'Assistant, sans-serif',
  },
});