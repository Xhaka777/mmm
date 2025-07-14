import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  id?: string;
  name: string;
  image: string;
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
  const { addToCart, setIsCartVisible } = useCart();

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
    // Removed setIsCartVisible(true) - don't auto-open cart
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
      
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>
          {name}
        </Text>
        
        <View style={styles.bottomRow}>
          <View style={styles.priceContainer}>
            <Text style={styles.discountPrice}>{discountPrice.toFixed(1)} €</Text>
            <Text style={styles.originalPrice}>{originalPrice} €</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.addToCartButton}
            onPress={handleAddToCart}
            activeOpacity={0.7}
          >
            <Text style={styles.addToCartText}>Shto në shportë</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: '#ff44'
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 12,
    lineHeight: 20,
    fontFamily: 'Assistant, sans-serif',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  discountPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#059669',
    marginRight: 8,
    fontFamily: 'Assistant, sans-serif',
  },
  originalPrice: {
    fontSize: 12,
    color: '#ef4444',
    textDecorationLine: 'line-through',
    fontFamily: 'Assistant, sans-serif',
  },
  addToCartButton: {
    backgroundColor: '#60a5fa',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  addToCartText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Assistant, sans-serif',
  },
});