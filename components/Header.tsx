import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Menu, Search, ShoppingBag } from 'lucide-react-native';
import SlidingMenu from './SlidingMenu';
import LoginScreen from './LoginScreen';

export default function Header() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isLoginVisible, setIsLoginVisible] = useState(false);

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
          <TouchableOpacity style={styles.iconButton}>
            <ShoppingBag size={24} color="#1f2937" />
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
});