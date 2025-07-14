import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Menu, Search, ShoppingBag, Globe } from 'lucide-react-native';
import SlidingMenu from './SlidingMenu';
import LoginScreen from './LoginScreen';
import GlobalShoppingCart from './GlobalShoppingCart';
import CountrySelectionScreen from './CountrySelectionScreen';
import { useCart } from '@/contexts/CartContext';
import { useCountry } from '@/contexts/CountryContext';

export default function Header() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const { getTotalItems, setIsCartVisible, isCartVisible } = useCart();
  const { 
    selectedCountry, 
    setSelectedCountry, 
    isCountrySelectionVisible, 
    setIsCountrySelectionVisible 
  } = useCountry();
  
  const totalItems = getTotalItems();

  const handleMenuPress = () => {
    setIsMenuVisible(true);
  };

  const handleMenuClose = () => {
    setIsMenuVisible(false);
  };

  const handleLoginPress = () => {
    setIsLoginVisible(true);
    setIsMenuVisible(false);
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

  const handleCountryPress = () => {
    setIsCountrySelectionVisible(true);
  };

  const handleCountrySelectionClose = () => {
    setIsCountrySelectionVisible(false);
  };

  const handleCountrySelect = (country: any) => {
    setSelectedCountry(country);
    console.log('Country selected:', country);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.leftSection}>
          <TouchableOpacity style={styles.iconButton} onPress={handleMenuPress}>
            <Menu size={24} color="#1f2937" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.centerSection}>
          <Text style={styles.brandName}>nallan</Text>
        </View>
        
        <View style={styles.rightSection}>
          <TouchableOpacity style={styles.iconButton} onPress={handleCountryPress}>
            <View style={styles.countryContainer}>
              <Image source={selectedCountry.flag} style={styles.flagImage} />
            </View>
          </TouchableOpacity>
          
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
      
      <CountrySelectionScreen
        isVisible={isCountrySelectionVisible}
        onClose={handleCountrySelectionClose}
        onCountrySelect={handleCountrySelect}
        selectedCountry={selectedCountry}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  leftSection: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerSection: {
    flex: 1,
    alignItems: 'center',
  },
  rightSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  brandName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1f2937',
    letterSpacing: 1,
    fontFamily: 'Assistant, sans-serif',
  },
  iconButton: {
    padding: 8,
  },
  countryContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flagText: {
    fontSize: 18,
  },
  flagImage: {
    width: 20,
    height: 20,
    borderRadius: 2,
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