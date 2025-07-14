import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Switch, ScrollView } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS
} from 'react-native-reanimated';
import { X, Minus, Plus, Trash2 } from 'lucide-react-native';
import { useCart } from '@/contexts/CartContext';

const { width } = Dimensions.get('window');

interface GlobalShoppingCartProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function GlobalShoppingCart({ isVisible, onClose }: GlobalShoppingCartProps) {
  const [acceptTerms, setAcceptTerms] = useState(false);
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
    getTotalItems,
    clearCart
  } = useCart();

  const translateX = useSharedValue(width);

  React.useEffect(() => {
    if (isVisible) {
      translateX.value = withTiming(0, { duration: 300 });
      setAcceptTerms(false);
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

  const handleQuantityChange = (id: string, size: string, currentQuantity: number, change: number) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity >= 1) {
      updateQuantity(id, size, newQuantity);
    }
  };

  const handleRemoveItem = (id: string, size: string) => {
    removeFromCart(id, size);
  };

  const handleCheckout = () => {
    if (acceptTerms && cartItems.length > 0) {
      // Handle checkout logic
      console.log('Going to checkout with items:', cartItems);
      handleClose();
    }
  };

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();
  const isEmpty = cartItems.length === 0;

  if (!isVisible) return null;

  return (
    <View style={styles.overlay}>
      <Animated.View style={[styles.container, animatedStyle]}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>SHOPPING CART ({totalItems})</Text>
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
              <Text style={styles.freeDeliveryText}>
                {totalPrice >= 50000 ? 'You have achieved free delivery!' : `Add €${((50000 - totalPrice) / 100).toFixed(2)} more for free delivery`}
              </Text>
            </View>

            {/* Cart Items */}
            <ScrollView style={styles.cartItemsContainer} showsVerticalScrollIndicator={false}>
              {cartItems.map((item, index) => (
                <View key={`${item.id}-${item.size}`} style={styles.productContainer}>
                  <Image
                    source={item.image}
                    style={styles.productImage}
                    resizeMode="cover"
                  />
                  <View style={styles.productInfo}>
                    <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
                    <Text style={styles.productPrice}>€{(item.price / 100).toFixed(2)}</Text>
                    <Text style={styles.productSize}>Size: {item.size}</Text>

                    {/* Quantity Controls */}
                    <View style={styles.quantityContainer}>
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => handleQuantityChange(item.id, item.size, item.quantity, -1)}
                      >
                        <Minus size={16} color="#1f2937" />
                      </TouchableOpacity>

                      <Text style={styles.quantityText}>{item.quantity}</Text>

                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => handleQuantityChange(item.id, item.size, item.quantity, 1)}
                      >
                        <Plus size={16} color="#1f2937" />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.removeButton}
                        onPress={() => handleRemoveItem(item.id, item.size)}
                      >
                        <Trash2 size={16} color="#ef4444" />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.itemTotal}>
                    <Text style={styles.itemTotalText}>
                      €{((item.price * item.quantity) / 100).toFixed(2)}
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>

            {/* Bottom Section */}
            <View style={styles.bottomSection}>
              <View style={styles.separator} />

              {/* Total */}
              <View style={styles.totalContainer}>
                <Text style={styles.totalLabel}>Total:</Text>
                <Text style={styles.totalPrice}>€{(totalPrice / 100).toFixed(2)}</Text>
              </View>

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
                  (!acceptTerms || isEmpty) && styles.disabledButton
                ]}
                onPress={handleCheckout}
                disabled={!acceptTerms || isEmpty}
              >
                <Text style={styles.checkoutButtonText}>
                  GO TO CHECKOUT • €{(totalPrice / 100).toFixed(2)}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
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
  cartItemsContainer: {
    flex: 1,
  },
  productContainer: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
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
    fontSize: 12,
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
    padding: 8,
  },
  itemTotal: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginLeft: 8,
  },
  itemTotalText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    fontFamily: 'Assistant, sans-serif',
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
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    fontFamily: 'Assistant, sans-serif',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    fontFamily: 'Assistant, sans-serif',
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