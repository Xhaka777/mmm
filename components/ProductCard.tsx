import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useCart } from '@/contexts/CartContext';
import { Plus } from 'lucide-react-native';

interface ProductCardProps {
  id?: string;
  name: string;
  image: any;
  discountPrice: number;
  originalPrice: number;
}

export default function ProductCard({
  id = '1',
  name,
  image,
  discountPrice,
  originalPrice
}: ProductCardProps) {
  const router = useRouter();
  const { addToCart } = useCart();

  const handlePress = () => {
    router.push('/product/1');
  };

  const handleAddToCart = (event: any) => {
    // Prevent event bubbling to avoid navigating to product detail
    event.stopPropagation();

    const cartItem = {
      id: id,
      name: name,
      price: Math.round(discountPrice * 100), // Convert to cents
      size: '38', // Default size - you can modify this logic
      image: image,
      quantity: 1,
    };

    addToCart(cartItem);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      {/* Image Container with Overlay Button */}
      <View style={styles.imageContainer}>
        <Image
          source={image}
          style={styles.image}
          resizeMode="cover" // You can also try "contain" for more zoomed out effect
        />
        
        {/* Plus Button Overlay */}
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
          activeOpacity={0.7}
        >
          <Plus size={20} color="#1f2937" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>
          {name}
        </Text>

        <View style={styles.bottomRow}>
          <View style={styles.priceContainer}>
            <Text style={styles.discountPrice}>{discountPrice.toFixed(1)} €</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 5,
  },
  imageContainer: {
    position: 'relative', // Important for absolute positioning of button
    width: '100%',
    height: 200, // Increased height for bigger image
    overflow: 'hidden', // Ensures button stays within image bounds
  },
  image: {
    width: '100%',
    height: '100%',
  },
  addToCartButton: {
    position: 'absolute', // Overlay positioning
    bottom: 12, // Distance from bottom
    right: 12, // Distance from right
    width: 30,
    height: 30,
    backgroundColor: '#ffffff',
    borderRadius: 2, // Circular button
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 16,
    alignItems: 'center', // Center all content horizontally
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 12,
    lineHeight: 20,
    fontFamily: 'Assistant, sans-serif',
    textAlign: 'center', // Center the text
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center the price container
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center the price text
  },
  discountPrice: {
    fontSize: 14,
    fontWeight: '600',
    // color: '#059669',
    fontFamily: 'Assistant, sans-serif',
    textAlign: 'center', // Center the price text
  },
});