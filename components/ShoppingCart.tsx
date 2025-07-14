import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Switch } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  runOnJS 
} from 'react-native-reanimated';
import { X, Minus, Plus } from 'lucide-react-native';
import CheckoutScreen from './CheckoutScreen'; // Import the CheckoutScreen

const { width } = Dimensions.get('window');

interface CartItem {
  id: string;
  name: string;
  price: number;
  size: string;
  image: any; // Changed to any for local images
  quantity: number;
}

interface ShoppingCartProps {
  isVisible: boolean;
  onClose: () => void;
  cartItem: CartItem | null;
}

export default function ShoppingCart({ isVisible, onClose, cartItem }: ShoppingCartProps) {
  const [quantity, setQuantity] = useState(1);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isCheckoutVisible, setIsCheckoutVisible] = useState(false); // Add checkout state
  const translateX = useSharedValue(width);

  React.useEffect(() => {
    if (isVisible) {
      translateX.value = withTiming(0, { duration: 300 });
      setQuantity(1);
      setAcceptTerms(false);
      setIsEmpty(false);
    } else {
      translateX.value = withTiming(width, { duration: 300 });
    }
  }, [isVisible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const handleClose = () => {
    translateX.value = withTiming(width, { duration: 300 }, () => {
      runOnJS(onClose)();
    });
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleCheckout = () => {
    if (acceptTerms) {
      console.log('Opening checkout screen');
      setIsCheckoutVisible(true); // Open checkout instead of closing cart
    }
  };

  const handleCheckoutClose = () => {
    setIsCheckoutVisible(false); // Close checkout screen
  };

  const handleRemove = () => {
    setIsEmpty(true);
  };

  const totalPrice = cartItem ? cartItem.price * quantity : 0;

  if (!isVisible || !cartItem) return null;

  return (
    <View style={styles.overlay}>
      <Animated.View style={[styles.container, animatedStyle]}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>SHOPPING CART</Text>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <X size={24} color="#1f2937" />
          </TouchableOpacity>
        </View>

        {isEmpty ? (
          /* Empty Cart State */
          <View style={styles.emptyCartContainer}>
            <Text style={styles.emptyCartText}>YOUR SHOPPING CART IS EMPTY.</Text>
          </View>
        ) : (
          <>
            {/* Free Delivery Message */}
            <View style={styles.freeDeliveryContainer}>
              <Text style={styles.freeDeliveryText}>You have achieved free delivery!</Text>
            </View>

            {/* Product Details */}
            <View style={styles.productContainer}>
              <Image source={cartItem.image} style={styles.productImage} resizeMode="cover" />
              
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{cartItem.name}</Text>
                <Text style={styles.productPrice}>{(cartItem.price / 100).toFixed(2)} KR</Text>
                <Text style={styles.productSize}>{cartItem.size}</Text>
                
                {/* Quantity Controls */}
                <View style={styles.quantityContainer}>
                  <TouchableOpacity 
                    style={styles.quantityButton} 
                    onPress={() => handleQuantityChange(-1)}
                  >
                    <Minus size={16} color="#1f2937" />
                  </TouchableOpacity>
                  
                  <Text style={styles.quantityText}>{quantity}</Text>
                  
                  <TouchableOpacity 
                    style={styles.quantityButton} 
                    onPress={() => handleQuantityChange(1)}
                  >
                    <Plus size={16} color="#1f2937" />
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.removeButton} onPress={handleRemove}>
                    <Text style={styles.removeText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Spacer */}
            <View style={styles.spacer} />

            {/* Bottom Section */}
            <View style={styles.bottomSection}>
              <View style={styles.separator} />
              
              {/* Delivery Info */}
              <Text style={styles.deliveryText}>Delivery is calculated at checkout.</Text>
              
              {/* Terms and Conditions */}
              <View style={styles.termsContainer}>
                <Switch
                  value={acceptTerms}
                  onValueChange={setAcceptTerms}
                  trackColor={{ false: '#d1d5db', true: '#1f2937' }}
                  thumbColor={acceptTerms ? '#ffffff' : '#f3f4f6'}
                />
                <Text style={styles.termsText}>
                  I accept the <Text style={styles.termsLink}>terms and conditions</Text>
                </Text>
              </View>
              
              {/* Checkout Button */}
              <TouchableOpacity 
                style={[
                  styles.checkoutButton, 
                  !acceptTerms && styles.disabledButton
                ]} 
                onPress={handleCheckout}
                disabled={!acceptTerms}
              >
                <Text style={styles.checkoutButtonText}>
                  GO TO CHECKOUT • €{(totalPrice / 100).toFixed(2)}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Animated.View>

      {/* Checkout Screen */}
      <CheckoutScreen 
        isVisible={isCheckoutVisible}
        onClose={handleCheckoutClose}
        cartData={{
          items: [{
            ...cartItem,
            quantity: quantity
          }],
          total: totalPrice
        }}
      />
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
    zIndex: 3000,
  },
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: width * 0.9,
    height: '100%',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: -2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    letterSpacing: 1,
    fontFamily: 'Assistant, sans-serif',
  },
  closeButton: {
    padding: 8,
  },
  freeDeliveryContainer: {
    backgroundColor: '#f0f9ff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  freeDeliveryText: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '500',
    fontFamily: 'Assistant, sans-serif',
  },
  productContainer: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
    fontFamily: 'Assistant, sans-serif',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
    fontFamily: 'Assistant, sans-serif',
  },
  productSize: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
    fontFamily: 'Assistant, sans-serif',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    marginHorizontal: 16,
    minWidth: 20,
    textAlign: 'center',
    fontFamily: 'Assistant, sans-serif',
  },
  removeButton: {
    marginLeft: 16,
    paddingVertical: 4,
  },
  removeText: {
    fontSize: 14,
    color: '#6b7280',
    textDecorationLine: 'underline',
    fontFamily: 'Assistant, sans-serif',
  },
  spacer: {
    flex: 1,
  },
  bottomSection: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  separator: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginBottom: 20,
  },
  deliveryText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 20,
    fontFamily: 'Assistant, sans-serif',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  termsText: {
    fontSize: 14,
    color: '#4b5563',
    marginLeft: 12,
    flex: 1,
    fontFamily: 'Assistant, sans-serif',
  },
  termsLink: {
    color: '#3b82f6',
    textDecorationLine: 'underline',
  },
  checkoutButton: {
    backgroundColor: '#1f2937',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#d1d5db',
  },
  checkoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1,
    fontFamily: 'Assistant, sans-serif',
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyCartText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6b7280',
    textAlign: 'center',
    letterSpacing: 1,
    fontFamily: 'Assistant, sans-serif',
  },
});