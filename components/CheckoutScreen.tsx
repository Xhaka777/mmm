import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  Image,
  Dimensions 
} from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  runOnJS 
} from 'react-native-reanimated';
import { ArrowLeft, ShoppingBag, Search, ChevronDown } from 'lucide-react-native';
import { useCart } from '@/contexts/CartContext';

const { width } = Dimensions.get('window');

interface CheckoutScreenProps {
  isVisible: boolean;
  onClose: () => void;
  cartData?: {
    items: any[];
    total: number;
  };
}

export default function CheckoutScreen({ isVisible, onClose, cartData }: CheckoutScreenProps) {
  const { cartItems, getTotalPrice } = useCart();
  
  // Use either passed cartData or global cart data
  const checkoutItems = cartData?.items || cartItems;
  const checkoutTotal = cartData?.total || getTotalPrice();
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    surname: '',
    company: '',
    address: '',
    apartment: '',
    postalCode: '',
    city: '',
    phone: '',
  });
  const [emailSubscription, setEmailSubscription] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState('submit');
  const [selectedPayment, setSelectedPayment] = useState('mobilepay');
  const [selectedBilling, setSelectedBilling] = useState('same');
  const [discountCode, setDiscountCode] = useState('');

  const translateX = useSharedValue(width);

  React.useEffect(() => {
    if (isVisible) {
      translateX.value = withTiming(0, { duration: 300 });
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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePayNow = () => {
    console.log('Processing payment...', { 
      formData, 
      items: checkoutItems, 
      total: checkoutTotal 
    });
    // Handle payment processing here
    handleClose();
  };

  const totalPrice = checkoutTotal;
  const deliveryFee = 0; // Free delivery
  const taxes = Math.round(totalPrice * 0.2); // 20% tax example

  if (!isVisible) return null;

  return (
    <View style={styles.overlay}>
      <Animated.View style={[styles.container, animatedStyle]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose} style={styles.backButton}>
            <ArrowLeft size={24} color="#1f2937" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Nallan</Text>
          <View style={styles.headerIcons}>
            <Search size={20} color="#1f2937" style={styles.headerIcon} />
            <ShoppingBag size={20} color="#1f2937" style={styles.headerIcon} />
          </View>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Contact Information */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Contact information</Text>
              <TouchableOpacity>
                <Text style={styles.loginLink}>Log in</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Email"
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TouchableOpacity 
              style={styles.checkboxContainer}
              onPress={() => setEmailSubscription(!emailSubscription)}
            >
              <View style={[styles.checkbox, emailSubscription && styles.checkedCheckbox]} />
              <Text style={styles.checkboxText}>Send me emails about news and offers</Text>
            </TouchableOpacity>
          </View>

          {/* Delivery */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Delivery</Text>
            
            <TouchableOpacity 
              style={[styles.deliveryOption, selectedDelivery === 'submit' && styles.selectedOption]}
              onPress={() => setSelectedDelivery('submit')}
            >
              <View style={styles.radioButton}>
                {selectedDelivery === 'submit' && <View style={styles.radioButtonInner} />}
              </View>
              <Text style={styles.deliveryText}>Submit</Text>
              <Text style={styles.deliveryIcon}>🚚</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.deliveryOption, selectedDelivery === 'pickup' && styles.selectedOption]}
              onPress={() => setSelectedDelivery('pickup')}
            >
              <View style={styles.radioButton}>
                {selectedDelivery === 'pickup' && <View style={styles.radioButtonInner} />}
              </View>
              <Text style={styles.deliveryText}>In-store pickup</Text>
              <Text style={styles.deliveryIcon}>🏪</Text>
            </TouchableOpacity>

            {/* Address Fields */}
            <View style={styles.addressSection}>
              <View style={styles.countryDropdown}>
                <Text style={styles.countryLabel}>Country/region</Text>
                <View style={styles.countrySelector}>
                  <Text style={styles.countryValue}>Denmark</Text>
                  <ChevronDown size={16} color="#6b7280" />
                </View>
              </View>

              <TextInput
                style={styles.input}
                placeholder="First name"
                value={formData.firstName}
                onChangeText={(value) => handleInputChange('firstName', value)}
              />

              <TextInput
                style={styles.input}
                placeholder="Surname"
                value={formData.surname}
                onChangeText={(value) => handleInputChange('surname', value)}
              />

              <TextInput
                style={styles.input}
                placeholder="Company (optional)"
                value={formData.company}
                onChangeText={(value) => handleInputChange('company', value)}
              />

              <View style={styles.addressInputContainer}>
                <TextInput
                  style={[styles.input, styles.addressInput]}
                  placeholder="Address"
                  value={formData.address}
                  onChangeText={(value) => handleInputChange('address', value)}
                />
                <Search size={16} color="#6b7280" style={styles.addressSearchIcon} />
              </View>

              <TextInput
                style={styles.input}
                placeholder="Apartment, floor, etc. (optional)"
                value={formData.apartment}
                onChangeText={(value) => handleInputChange('apartment', value)}
              />

              <View style={styles.postalCityRow}>
                <TextInput
                  style={[styles.input, styles.postalInput]}
                  placeholder="Postal code"
                  value={formData.postalCode}
                  onChangeText={(value) => handleInputChange('postalCode', value)}
                />
                <TextInput
                  style={[styles.input, styles.cityInput]}
                  placeholder="City"
                  value={formData.city}
                  onChangeText={(value) => handleInputChange('city', value)}
                />
              </View>

              <TextInput
                style={styles.input}
                placeholder="Phone"
                value={formData.phone}
                onChangeText={(value) => handleInputChange('phone', value)}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* Payment */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment</Text>
            
            <TouchableOpacity 
              style={[styles.paymentOption, selectedPayment === 'mobilepay' && styles.selectedPaymentOption]}
              onPress={() => setSelectedPayment('mobilepay')}
            >
              <View style={styles.radioButton}>
                {selectedPayment === 'mobilepay' && <View style={styles.radioButtonInner} />}
              </View>
              <Text style={styles.paymentText}>MobilePay</Text>
              <Text style={styles.paymentIcon}>💳</Text>
            </TouchableOpacity>

            {selectedPayment === 'mobilepay' && (
              <View style={styles.paymentInfo}>
                <View style={styles.mobilepayInfo}>
                  <Text style={styles.mobilepayIcon}>💻→</Text>
                  <Text style={styles.mobilepayText}>
                    Once you have clicked "Pay now", you will be redirected to MobilePay to complete your purchase securely.
                  </Text>
                </View>
              </View>
            )}

            <TouchableOpacity 
              style={[styles.paymentOption, selectedPayment === 'frisbii' && styles.selectedPaymentOption]}
              onPress={() => setSelectedPayment('frisbii')}
            >
              <View style={styles.radioButton}>
                {selectedPayment === 'frisbii' && <View style={styles.radioButtonInner} />}
              </View>
              <Text style={styles.paymentText}>Frisbii Payments</Text>
              <View style={styles.cardIcons}>
                <Text style={styles.cardIcon}>💳</Text>
                <Text style={styles.cardIcon}>💳</Text>
                <Text style={styles.cardIcon}>💳</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Billing Address */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Billing address</Text>
            
            <TouchableOpacity 
              style={[styles.deliveryOption, selectedBilling === 'same' && styles.selectedOption]}
              onPress={() => setSelectedBilling('same')}
            >
              <View style={styles.radioButton}>
                {selectedBilling === 'same' && <View style={styles.radioButtonInner} />}
              </View>
              <Text style={styles.deliveryText}>Same address as delivery address</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.deliveryOption, selectedBilling === 'different' && styles.selectedOption]}
              onPress={() => setSelectedBilling('different')}
            >
              <View style={styles.radioButton}>
                {selectedBilling === 'different' && <View style={styles.radioButtonInner} />}
              </View>
              <Text style={styles.deliveryText}>Use a different billing address</Text>
            </TouchableOpacity>
          </View>

          {/* NEW ORDER SUMMARY SECTION - Moved to bottom */}
          <View style={styles.orderSummarySection}>
            {/* Order Items */}
            <View style={styles.orderItemsContainer}>
              {checkoutItems.map((item, index) => (
                <View key={`${item.id}-${item.size}`} style={styles.orderItem}>
                  <View style={styles.orderItemLeft}>
                    <View style={styles.quantityBadge}>
                      <Text style={styles.quantityText}>{item.quantity}</Text>
                    </View>
                    <Image source={item.image} style={styles.orderItemImage} />
                    <View style={styles.orderItemInfo}>
                      <Text style={styles.orderItemName}>{item.name}</Text>
                      <Text style={styles.orderItemSize}>{item.size}</Text>
                    </View>
                  </View>
                  <Text style={styles.orderItemPrice}>
                    €{((item.price * item.quantity) / 100).toFixed(2)}
                  </Text>
                </View>
              ))}
            </View>
            
            {/* Discount Code Section */}
            <View style={styles.discountSection}>
              <TextInput
                style={styles.discountInput}
                placeholder="Discount code"
                value={discountCode}
                onChangeText={setDiscountCode}
              />
              <TouchableOpacity style={styles.useButton}>
                <Text style={styles.useButtonText}>Use</Text>
              </TouchableOpacity>
            </View>

            {/* Summary Calculations */}
            <View style={styles.summaryCalculations}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>€{(totalPrice / 100).toFixed(2)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Delivery</Text>
                <Text style={styles.summaryValue}>Enter delivery address</Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <View style={styles.totalRight}>
                  <Text style={styles.currency}>EUR</Text>
                  <Text style={styles.totalValue}>€{(totalPrice / 100).toFixed(2)}</Text>
                </View>
              </View>
              <Text style={styles.taxInfo}>Including €{(taxes / 100).toFixed(2)} in taxes</Text>
            </View>
          </View>

          <View style={styles.bottomSpacing} />
        </ScrollView>

        {/* Pay Now Button */}
        <View style={styles.payButtonContainer}>
          <TouchableOpacity style={styles.payButton} onPress={handlePayNow}>
            <Text style={styles.payButtonText}>Pay now</Text>
          </TouchableOpacity>
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
    zIndex: 6000,
  },
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    fontFamily: 'Assistant, sans-serif',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginLeft: 16,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
    fontFamily: 'Assistant, sans-serif',
  },
  loginLink: {
    fontSize: 14,
    color: '#3b82f6',
    fontFamily: 'Assistant, sans-serif',
  },
  input: {
    borderWidth: 2,
    borderColor: '#3b82f6',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    marginBottom: 16,
    fontFamily: 'Assistant, sans-serif',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 4,
    marginRight: 12,
  },
  checkedCheckbox: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  checkboxText: {
    fontSize: 14,
    color: '#1f2937',
    fontFamily: 'Assistant, sans-serif',
  },
  deliveryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#ffffff',
  },
  selectedOption: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#d1d5db',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#3b82f6',
  },
  deliveryText: {
    flex: 1,
    fontSize: 14,
    color: '#1f2937',
    fontFamily: 'Assistant, sans-serif',
  },
  deliveryIcon: {
    fontSize: 20,
  },
  addressSection: {
    marginTop: 16,
  },
  countryDropdown: {
    marginBottom: 16,
  },
  countryLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
    fontFamily: 'Assistant, sans-serif',
  },
  countrySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
  },
  countryValue: {
    fontSize: 14,
    color: '#1f2937',
    fontFamily: 'Assistant, sans-serif',
  },
  addressInputContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  addressInput: {
    marginBottom: 0,
    paddingRight: 40,
  },
  addressSearchIcon: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  postalCityRow: {
    flexDirection: 'row',
    gap: 12,
  },
  postalInput: {
    flex: 1,
  },
  cityInput: {
    flex: 2,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#ffffff',
  },
  selectedPaymentOption: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
  },
  paymentText: {
    flex: 1,
    fontSize: 14,
    color: '#1f2937',
    fontFamily: 'Assistant, sans-serif',
  },
  paymentIcon: {
    fontSize: 20,
  },
  paymentInfo: {
    backgroundColor: '#f3f4f6',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  mobilepayInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mobilepayIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  mobilepayText: {
    flex: 1,
    fontSize: 12,
    color: '#6b7280',
    lineHeight: 18,
    fontFamily: 'Assistant, sans-serif',
  },
  cardIcons: {
    flexDirection: 'row',
  },
  cardIcon: {
    fontSize: 16,
    marginLeft: 4,
  },
  // NEW STYLES FOR ORDER SUMMARY SECTION
  orderSummarySection: {
    backgroundColor: '#f9fafb',
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  orderItemsContainer: {
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  orderItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  quantityBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#6b7280',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  quantityText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Assistant, sans-serif',
  },
  orderItemImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  orderItemInfo: {
    flex: 1,
  },
  orderItemName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
    fontFamily: 'Assistant, sans-serif',
    marginBottom: 2,
  },
  orderItemSize: {
    fontSize: 12,
    color: '#6b7280',
    fontFamily: 'Assistant, sans-serif',
  },
  orderItemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    fontFamily: 'Assistant, sans-serif',
  },
  discountSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  discountInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    fontFamily: 'Assistant, sans-serif',
    backgroundColor: '#ffffff',
  },
  useButton: {
    backgroundColor: '#e5e7eb',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginLeft: 8,
  },
  useButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    fontFamily: 'Assistant, sans-serif',
  },
  summaryCalculations: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#1f2937',
    fontFamily: 'Assistant, sans-serif',
  },
  summaryValue: {
    fontSize: 14,
    color: '#1f2937',
    fontFamily: 'Assistant, sans-serif',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    fontFamily: 'Assistant, sans-serif',
  },
  totalRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currency: {
    fontSize: 14,
    color: '#6b7280',
    marginRight: 8,
    fontFamily: 'Assistant, sans-serif',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    fontFamily: 'Assistant, sans-serif',
  },
  taxInfo: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
    fontFamily: 'Assistant, sans-serif',
  },
  bottomSpacing: {
    height: 100,
  },
  payButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  payButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  payButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Assistant, sans-serif',
  },
});