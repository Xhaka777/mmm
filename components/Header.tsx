import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Menu, Search, ShoppingBag } from 'lucide-react-native';
import SlidingMenu from './SlidingMenu';
import LoginScreen from './LoginScreen';
import GlobalShoppingCart from './GlobalShoppingCart';
import { useCart } from '@/contexts/CartContext';

export default function Header() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const { getTotalItems, setIsCartVisible, isCartVisible } = useCart();
  
  const totalItems = getTotalItems();

  const handleMenuPress = () => {
    setIsMenuVisible(true);
  };

  const handleMenuClose = () => {
    setIsMenuVisible(false);
  };

  const handleLoginPress = () => {
    setIsLoginVisible(true);
    setIsMenuVisible(false); // Close menu when opening login
  };

  const handleLoginClose = () => {
    setIsLoginVisible(false);
  };

  const handleCartPress = () => {
    setIsCartVisible(true);
  };

  const handleCartClose = () => {
    setIsCartVisible(false);
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity style={styles.iconButton} onPress={handleMenuPress}>
          <Menu size={24} color="#1f2937" />
        </TouchableOpacity>
        
        <Text style={styles.brandName}>nallan</Text>
        
        <View style={styles.rightIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Search size={24} color="#1f2937" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.iconButton} onPress={handleCartPress}>
            <View style={styles.cartIconContainer}>
              <ShoppingBag size={24} color="#1f2937" />
              {totalItems > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>
                    {totalItems > 99 ? '99+' : totalItems.toString()}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
      
      <SlidingMenu 
        isVisible={isMenuVisible} 
        onClose={handleMenuClose}
        onLoginPress={handleLoginPress}
      />
      
      <LoginScreen 
        isVisible={isLoginVisible} 
        onClose={handleLoginClose}
      />
      
      <GlobalShoppingCart 
        isVisible={isCartVisible}
        onClose={handleCartClose}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  brandName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1f2937',
    letterSpacing: 1,
    fontFamily: 'Assistant, sans-serif',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
  },
  cartIconContainer: {
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#ef4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  cartBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Assistant, sans-serif',
  },
});