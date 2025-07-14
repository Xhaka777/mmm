import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  runOnJS 
} from 'react-native-reanimated';
import { X, ChevronRight, ChevronLeft } from 'lucide-react-native';
import { heroImages } from '@/utils/images';

const { width } = Dimensions.get('window');

interface SlidingMenuProps {
  isVisible: boolean;
  onClose: () => void;
  onLoginPress: () => void;
}

export default function SlidingMenu({ isVisible, onClose, onLoginPress }: SlidingMenuProps) {
  const [currentView, setCurrentView] = useState<'main' | 'shop'>('main');
  const translateX = useSharedValue(-width);
  const shopTranslateX = useSharedValue(-width);

  React.useEffect(() => {
    if (isVisible) {
      translateX.value = withTiming(0, { duration: 300 });
      setCurrentView('main');
      shopTranslateX.value = -width;
    } else {
      translateX.value = withTiming(-width, { duration: 300 });
      shopTranslateX.value = -width;
    }
  }, [isVisible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const shopAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shopTranslateX.value }],
  }));

  const handleShopPress = () => {
    shopTranslateX.value = withTiming(0, { duration: 300 });
    setCurrentView('shop');
  };

  const handleBackToMain = () => {
    shopTranslateX.value = withTiming(-width, { duration: 300 });
    setCurrentView('main');
  };

  const handleClose = () => {
    translateX.value = withTiming(-width, { duration: 300 }, () => {
      runOnJS(onClose)();
    });
  };

  if (!isVisible) return null;

  return (
    <View style={styles.overlay}>
      {/* Main Menu */}
      <Animated.View style={[styles.menuContainer, animatedStyle]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <X size={24} color="#1f2937" />
          </TouchableOpacity>
        </View>

        <View style={styles.menuContent}>
          <TouchableOpacity style={styles.menuItem} onPress={handleShopPress}>
            <Text style={styles.menuText}>SHOP</Text>
            <ChevronRight size={20} color="#1f2937" />
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>FREE EXCHANGE</Text>
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>RETURN</Text>
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>ABOUT NALLAN</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.loginButton} onPress={onLoginPress}>
            <Text style={styles.loginText}>LOG IN</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Shop Submenu */}
      <Animated.View style={[styles.menuContainer, styles.shopMenu, shopAnimatedStyle]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <X size={24} color="#1f2937" />
          </TouchableOpacity>
        </View>

        <View style={styles.menuContent}>
          <TouchableOpacity style={styles.backMenuItem} onPress={handleBackToMain}>
            <ChevronLeft size={20} color="#1f2937" />
            <Text style={styles.backMenuText}>SHOP</Text>
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>SANDALS</Text>
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>SLIPPERS</Text>
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>CLOGS</Text>
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>SLIPPERS</Text>
          </TouchableOpacity>

          <View style={styles.imageContainer}>
            <Image
              source={heroImages.women_login}
              style={styles.shopImage}
              resizeMode='center'
            />
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width * 0.85,
    height: '100%',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  shopMenu: {
    zIndex: 1001,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  closeButton: {
    alignSelf: 'flex-start',
    padding: 8,
  },
  menuContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  backMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    letterSpacing: 1,
    fontFamily: 'Assistant, sans-serif',
  },
  backMenuText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    letterSpacing: 1,
    marginLeft: 8,
    fontFamily: 'Assistant, sans-serif',
  },
  separator: {
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  loginText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
    letterSpacing: 1,
    fontFamily: 'Assistant, sans-serif',
  },
  imageContainer: {
    overflow: 'hidden',
    margin: 10,
  },
  shopImage: {
    width: '100%',
    height: 350,
  },
});