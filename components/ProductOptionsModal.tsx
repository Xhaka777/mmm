import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  ScrollView, 
  Dimensions 
} from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  runOnJS 
} from 'react-native-reanimated';
import { X, ChevronLeft, ChevronRight } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

interface Product {
  id: number;
  name: string;
  price: string;
  images: string[];
}

interface ProductOptionsModalProps {
  isVisible: boolean;
  onClose: () => void;
  product: Product | null;
  onAddToCart: (productId: number, size: string) => void;
}

const sizes = ['36', '37', '38', '39', '40', '41', '42'];

export default function ProductOptionsModal({ 
  isVisible, 
  onClose, 
  product, 
  onAddToCart 
}: ProductOptionsModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const translateY = useSharedValue(height);
  const scrollViewRef = useRef<ScrollView>(null);

  React.useEffect(() => {
    if (isVisible) {
      translateY.value = withTiming(0, { duration: 300 });
      setCurrentImageIndex(0);
      setSelectedSize('');
    } else {
      translateY.value = withTiming(height, { duration: 300 });
    }
  }, [isVisible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const handleClose = () => {
    translateY.value = withTiming(height, { duration: 300 }, () => {
      runOnJS(onClose)();
    });
  };

  const handlePreviousImage = () => {
    if (product && currentImageIndex > 0) {
      const newIndex = currentImageIndex - 1;
      setCurrentImageIndex(newIndex);
      scrollViewRef.current?.scrollTo({ x: newIndex * width, animated: true });
    }
  };

  const handleNextImage = () => {
    if (product && currentImageIndex < product.images.length - 1) {
      const newIndex = currentImageIndex + 1;
      setCurrentImageIndex(newIndex);
      scrollViewRef.current?.scrollTo({ x: newIndex * width, animated: true });
    }
  };

  const onScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    
    if (roundIndex !== currentImageIndex) {
      setCurrentImageIndex(roundIndex);
    }
  };

  const handleAddToCart = () => {
    if (product && selectedSize) {
      onAddToCart(product.id, selectedSize);
      handleClose();
    }
  };

  if (!isVisible || !product) return null;

  return (
    <View style={styles.overlay}>
      <Animated.View style={[styles.container, animatedStyle]}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>SELECT OPTIONS</Text>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <X size={24} color="#1f2937" />
          </TouchableOpacity>
        </View>

        {/* Image Carousel */}
        <View style={styles.imageContainer}>
          {/* Left Arrow */}
          <TouchableOpacity 
            style={[styles.arrowButton, styles.leftArrow]}
            onPress={handlePreviousImage}
            disabled={currentImageIndex === 0}
          >
            <ChevronLeft 
              size={24} 
              color={currentImageIndex === 0 ? "#d1d5db" : "#1f2937"} 
            />
          </TouchableOpacity>

          {/* Image Slider */}
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
            style={styles.imageScrollView}
          >
            {product.images.map((image, index) => (
              <View key={index} style={styles.imageSlide}>
                <Image
                  source={{ uri: image }}
                  style={styles.productImage}
                  resizeMode="contain"
                />
              </View>
            ))}
          </ScrollView>

          {/* Right Arrow */}
          <TouchableOpacity 
            style={[styles.arrowButton, styles.rightArrow]}
            onPress={handleNextImage}
            disabled={currentImageIndex === product.images.length - 1}
          >
            <ChevronRight 
              size={24} 
              color={currentImageIndex === product.images.length - 1 ? "#d1d5db" : "#1f2937"} 
            />
          </TouchableOpacity>
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>{product.price}</Text>
        </View>

        {/* Separator */}
        <View style={styles.separator} />

        {/* Size Selection */}
        <View style={styles.sizeSection}>
          <View style={styles.sizeHeader}>
            <Text style={styles.sizeLabel}>Size:</Text>
            <TouchableOpacity>
              <Text style={styles.sizeGuide}>Size guide</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.sizeGrid}>
            {sizes.map((size) => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.sizeButton,
                  selectedSize === size && styles.selectedSizeButton
                ]}
                onPress={() => setSelectedSize(size)}
              >
                <Text style={[
                  styles.sizeText,
                  selectedSize === size && styles.selectedSizeText
                ]}>
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Add to Cart Button */}
        <TouchableOpacity 
          style={[
            styles.addToCartButton,
            !selectedSize && styles.disabledButton
          ]} 
          onPress={handleAddToCart}
          disabled={!selectedSize}
        >
          <Text style={styles.addToCartText}>ADD TO CART</Text>
        </TouchableOpacity>
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
    zIndex: 4000,
  },
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.5,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    position: 'relative',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    letterSpacing: 1,
    fontFamily: 'Assistant, sans-serif',
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    padding: 8,
  },
  imageContainer: {
    height: 120,
    position: 'relative',
    marginVertical: 20,
  },
  arrowButton: {
    position: 'absolute',
    top: '50%',
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    transform: [{ translateY: -20 }],
  },
  leftArrow: {
    left: 20,
  },
  rightArrow: {
    right: 20,
  },
  imageScrollView: {
    flex: 1,
  },
  imageSlide: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: 200,
    height: 120,
  },
  productInfo: {
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 1,
    fontFamily: 'Assistant, sans-serif',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    fontFamily: 'Assistant, sans-serif',
  },
  separator: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sizeSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sizeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sizeLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    fontFamily: 'Assistant, sans-serif',
  },
  sizeGuide: {
    fontSize: 14,
    color: '#6b7280',
    textDecorationLine: 'underline',
    fontFamily: 'Assistant, sans-serif',
  },
  sizeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  sizeButton: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  selectedSizeButton: {
    borderColor: '#1f2937',
    borderWidth: 2,
  },
  sizeText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6b7280',
    fontFamily: 'Assistant, sans-serif',
  },
  selectedSizeText: {
    color: '#1f2937',
    fontWeight: '600',
  },
  addToCartButton: {
    backgroundColor: '#fbbf24',
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: '#d1d5db',
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    letterSpacing: 1,
    fontFamily: 'Assistant, sans-serif',
  },
});