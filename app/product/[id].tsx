import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Truck, RotateCcw, Plus, Minus } from 'lucide-react-native';
import Header from '@/components/Header';
import FeaturesSection from '@/components/FeaturesSection';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { productImages } from '@/utils/images';

const { width } = Dimensions.get('window');

const productImageArray = [
  productImages.shoeBrown1,
  productImages.shoeBrown2,
  productImages.shoePink1,
  productImages.shoePink2,
  productImages.shoeOrange1,
  productImages.shoeOrange2,
];

const sizes = ['36', '37', '38', '39', '40', '41', '42'];
const unavailableSizes = ['36', '39', '42']; // Sizes that are out of stock

export default function ProductDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { addToCart, setIsCartVisible } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [materialExpanded, setMaterialExpanded] = useState(false);
  const [deliveryExpanded, setDeliveryExpanded] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const onScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);

    if (roundIndex !== currentImageIndex) {
      setCurrentImageIndex(roundIndex);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }

    const cartItem = {
      id: '1',
      name: 'RUBIK HIGH-SOLED SANDALS - BROWN',
      price: 39995, // Price in cents
      size: selectedSize,
      image: productImages.shoeBrown1,
      quantity: 1,
    };

    addToCart(cartItem);
    setIsCartVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Use the same Header component as index.tsx */}
      <Header />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Image Slider */}
        <View style={styles.imageContainer}>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={onScroll}
            scrollEventThrottle={16}
            decelerationRate="fast"
            snapToInterval={width}
            snapToAlignment="center"
          >
            {productImageArray.map((image, index) => (
              <View key={index} style={styles.imageSlide}>
                <Image
                  source={image} // Local image
                  style={styles.productImage}
                  resizeMode="cover"
                />
              </View>
            ))}
          </ScrollView>

          {/* Image Pagination */}
          {/* <View style={styles.imagePagination}>
            {productImageArray.map((image, index) => (
              <TouchableOpacity key={index}>
                <Image
                  source={image} // Local image
                  style={styles.thumbnailImage}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ))}

          </View> */}
        </View>

        {/* Thumbnail Images */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.thumbnailContainer}
          contentContainerStyle={styles.thumbnailContent}
        >
          {productImageArray.map((image, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.thumbnail,
                index === currentImageIndex && styles.activeThumbnail
              ]}
              onPress={() => {
                setCurrentImageIndex(index);
                scrollViewRef.current?.scrollTo({ x: index * width, animated: true });
              }}
            >
              <Image
                source={image} // CHANGED: Use local image directly, not {{ uri: image }}
                style={styles.thumbnailImage}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Delivery Info */}
        <View style={styles.deliveryInfo}>
          <View style={styles.deliveryItem}>
            <Truck size={20} color="#6b7280" />
            <Text style={styles.deliveryText}>1-2 business day delivery</Text>
          </View>
          <View style={styles.deliveryItem}>
            <RotateCcw size={20} color="#6b7280" />
            <Text style={styles.deliveryText}>Free exchange</Text>
          </View>
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productName}>RUBIK HIGH-SOLED SANDALS - BROWN</Text>
          <Text style={styles.productPrice}>399.95 KR</Text>
          <Text style={styles.productDescription}>
            Comfortable and stylish sandals in high quality
          </Text>
        </View>

        {/* Size Selection */}
        <View style={styles.sizeSection}>
          <Text style={styles.sizeLabel}>Size:</Text>
          <View style={styles.sizeGrid}>
            {sizes.map((size) => {
              const isUnavailable = unavailableSizes.includes(size);
              const isSelected = selectedSize === size && !isUnavailable;

              return (
                <TouchableOpacity
                  key={size}
                  style={[
                    styles.sizeButton,
                    isSelected && styles.selectedSizeButton,
                    isUnavailable && styles.unavailableSizeButton
                  ]}
                  onPress={() => !isUnavailable && setSelectedSize(size)}
                  disabled={isUnavailable}
                >
                  <Text style={[
                    styles.sizeText,
                    isSelected && styles.selectedSizeText,
                    isUnavailable && styles.unavailableSizeText
                  ]}>
                    {size}
                  </Text>
                  {isUnavailable && (
                    <View style={styles.diagonalLine} />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Add to Cart Button */}
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>ADD TO CART</Text>
        </TouchableOpacity>

        {/* Product Description */}
        <View style={styles.descriptionSection}>
          <Text style={styles.descriptionText}>
            Rubik sandals are your safe choice of sandals. Whether you walk a little or a lot, you will experience high comfort in both fit and movement. With its stylish look, Rubik is suitable for most things. The adjustable buckles ensure that the sandal sits well and firmly on the foot.
          </Text>

          <View style={styles.featuresList}>
            <Text style={styles.featureItem}>• Original soft ergonomic Nallan footbed</Text>
            <Text style={styles.featureItem}>• Flat sole</Text>
            <Text style={styles.featureItem}>• Comfortable fit - fits most feet</Text>
            <Text style={styles.featureItem}>• Adjustable buckles for optimal fit</Text>
            <Text style={styles.featureItem}>• Durable and flexible outsole</Text>
            <Text style={styles.featureItem}>• Supportive and incredibly comfortable to walk in</Text>
          </View>
        </View>

        {/* Expandable Sections */}
        <View style={styles.expandableSection}>
          <TouchableOpacity
            style={styles.expandableHeader}
            onPress={() => setMaterialExpanded(!materialExpanded)}
          >
            <Text style={styles.expandableTitle}>MATERIAL & PRODUCTION</Text>
            {materialExpanded ? (
              <Minus size={20} color="#1f2937" />
            ) : (
              <Plus size={20} color="#1f2937" />
            )}
          </TouchableOpacity>
          {materialExpanded && (
            <View style={styles.expandableContent}>
              <Text style={styles.expandableText}>
                <Text style={styles.boldText}>Material & Production{'\n'}</Text>
                Produced in Europe{'\n\n'}
                <Text style={styles.boldText}>Upper material:</Text> 100% Leather{'\n'}
                <Text style={styles.boldText}>Insole:</Text> 100% leather{'\n'}
                <Text style={styles.boldText}>Sole:</Text> PU{'\n\n'}
                Polyurethane (PU) soles are used in shoes due to their light weight, durability and comfort. The material's flexibility and excellent shock absorption properties make it suitable for casual and indoor slippers.
              </Text>
            </View>
          )}
        </View>

        <View style={styles.expandableSection}>
          <TouchableOpacity
            style={styles.expandableHeader}
            onPress={() => setDeliveryExpanded(!deliveryExpanded)}
          >
            <Text style={styles.expandableTitle}>DELIVERY AND RETURNS</Text>
            {deliveryExpanded ? (
              <Minus size={20} color="#1f2937" />
            ) : (
              <Plus size={20} color="#1f2937" />
            )}
          </TouchableOpacity>
          {deliveryExpanded && (
            <View style={styles.expandableContent}>
              <Text style={styles.expandableText}>
                All orders placed before 12 noon are shipped the same day. Standard delivery time to addresses in Denmark is 1-2 business days.{'\n\n'}
                <Text style={styles.boldText}>Shipping prices & delivery options{'\n'}</Text>
                DAO Parcel Shop – 19 kr.{'\n'}
                GLS Parcel Shop – 29 kr.{'\n'}
                GLS Private / With delivery – 39 kr.{'\n\n'}
                <Text style={styles.boldText}>Track your package:{'\n'}</Text>
                Track your package via the tracking number sent, or contact our customer service: kundeservice@nallan.dk{'\n\n'}
                <Text style={styles.boldText}>Exchange:{'\n'}</Text>
                We will exchange for another size free of charge within 30 days.
                If you wish to exchange for another size, please contact us to receive a return label. Once we have received the shoes to be exchanged, we will send you the new shoes.{'\n\n'}
                <Text style={styles.boldText}>Returns:{'\n'}</Text>
                If you wish to return your order, please send us an email. We can send you a return label or you can use your own. Using our return label costs 40 DKK, which will be deducted from your final refund amount. You can return your purchase within 30 days of receipt.
              </Text>
            </View>
          )}
        </View>

        {/* Similar Products */}
        <View style={styles.similarSection}>
          <Text style={styles.similarTitle}>SIMILAR PRODUCTS</Text>
        </View>

        {/* Features Section */}
        <FeaturesSection />

        {/* Footer */}
        <Footer />

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    height: 400,
    position: 'relative',
  },
  imageSlide: {
    width,
    height: 400,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  imagePagination: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeImageDot: {
    backgroundColor: '#1f2937',
  },
  inactiveImageDot: {
    backgroundColor: 'rgba(31, 41, 55, 0.3)',
  },
  thumbnailContainer: {
    paddingVertical: 16,
  },
  thumbnailContent: {
    paddingHorizontal: 20,
  },
  thumbnail: {
    width: 60,
    height: 60,
    marginRight: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  activeThumbnail: {
    borderColor: '#1f2937',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },
  deliveryInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  deliveryItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryText: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 8,
    fontFamily: 'Assistant, sans-serif',
  },
  productInfo: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    alignItems: 'center',
  },
  productName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: 1,
    fontFamily: 'Assistant, sans-serif',
  },
  productPrice: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 16,
    fontFamily: 'Assistant, sans-serif',
  },
  productDescription: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    fontFamily: 'Assistant, sans-serif',
  },
  sizeSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sizeLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
    fontFamily: 'Assistant, sans-serif',
  },
  sizeGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 0,
  },
  sizeButton: {
    flex: 1,
    aspectRatio: 1,
    maxWidth: (width - 80) / 7, // Calculate max width based on screen width
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    position: 'relative',
    overflow: 'hidden',
  },
  selectedSizeButton: {
    borderColor: '#1f2937',
    backgroundColor: '#1f2937',
  },
  unavailableSizeButton: {
    backgroundColor: '#f3f4f6',
    borderColor: '#e5e7eb',
  },
  sizeText: {
    fontSize: Math.min(16, (width - 80) / 28), // Responsive font size
    fontWeight: '500',
    color: '#1f2937',
    fontFamily: 'Assistant, sans-serif',
    zIndex: 2,
  },
  selectedSizeText: {
    color: '#ffffff',
  },
  unavailableSizeText: {
    color: '#9ca3af',
  },
  diagonalLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#9ca3af',
    transform: [{ rotate: '45deg' }],
    zIndex: 1,
  },
  addToCartButton: {
    backgroundColor: '#fbbf24',
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    letterSpacing: 1,
    fontFamily: 'Assistant, sans-serif',
  },
  descriptionSection: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4b5563',
    marginBottom: 20,
    fontFamily: 'Assistant, sans-serif',
  },
  featuresList: {
    gap: 8,
  },
  featureItem: {
    fontSize: 14,
    lineHeight: 20,
    color: '#4b5563',
    fontFamily: 'Assistant, sans-serif',
  },
  expandableSection: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  expandableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  expandableTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    letterSpacing: 1,
    fontFamily: 'Assistant, sans-serif',
  },
  expandableContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  expandableText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#4b5563',
    fontFamily: 'Assistant, sans-serif',
  },
  boldText: {
    fontWeight: '600',
    color: '#1f2937',
  },
  similarSection: {
    paddingHorizontal: 20,
    paddingVertical: 32,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    alignItems: 'center',
  },
  similarTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    letterSpacing: 2,
    fontFamily: 'Assistant, sans-serif',
  },
  bottomSpacing: {
    height: 40,
  },
});