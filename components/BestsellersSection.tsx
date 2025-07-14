import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Plus } from 'lucide-react-native';
import ProductOptionsModal from './ProductOptionsModal';
import { productImages } from '@/utils/images';

const bestsellerProducts = [
  {
    id: 1,
    name: 'ZOE HIGH-SOLED SLIPPERS - BROWN',
    price: '£349.95',
    image: productImages.shoeBrown1, // Local image
    images: [
      productImages.shoeBrown1,
      productImages.shoeBrown2,
      productImages.shoePink1,
      productImages.shoePink2,
      productImages.shoeOrange1,
      productImages.shoeOrange2,
    ],
  },
  {
    id: 2,
    name: 'ZOE HIGH-SOLED SLIPPERS - PINK',
    price: '£349.95',
    image: productImages.shoePink1, // Local image
    images: [
      productImages.shoePink1,
      productImages.shoePink2,
      productImages.shoeBrown1,
      productImages.shoeBrown2,
      productImages.shoeOrange1,
      productImages.shoeOrange2,
    ],
  },
  {
    id: 3,
    name: 'ZOE HIGH-SOLED SLIPPERS - ORANGE',
    price: '£349.95',
    image: productImages.shoeOrange1, // Local image
    images: [
      productImages.shoeOrange1,
      productImages.shoeOrange2,
      productImages.shoePink1,
      productImages.shoePink2,
      productImages.shoeBrown1,
      productImages.shoeBrown2,
    ],
  },
  {
    id: 4,
    name: 'ZOE HIGH-SOLED SLIPPERS - GREEN',
    price: '£349.95',
    image: productImages.shoeGreen1, // Local image
    images: [
      productImages.shoeGreen1,
      productImages.shoeGreen2,
      productImages.shoeViol1,
      productImages.shoeViol2,
      productImages.shoeCofe1,
      productImages.shoeCofe2,
    ],
  },
  {
    id: 5,
    name: 'ZOE HIGH-SOLED SLIPPERS - VIOLET',
    price: '£349.95',
    image: productImages.shoeViol1, // Local image
    images: [
      productImages.shoeViol1,
      productImages.shoeViol2,
      productImages.shoeGreen1,
      productImages.shoeGreen2,
      productImages.shoeCofe1,
      productImages.shoeCofe2,
    ],
  },
  {
    id: 6,
    name: 'ZOE HIGH-SOLED SLIPPERS - COFFEE',
    price: '£349.95',
    image: productImages.shoeCofe1, // Local image
    images: [
      productImages.shoeCofe1,
      productImages.shoeCofe2,
      productImages.shoeViol1,
      productImages.shoeViol2,
      productImages.shoeGreen1,
      productImages.shoeGreen2,
    ],
  },
];

export default function BestsellersSection() {
  const [selectedProduct, setSelectedProduct] = React.useState<any>(null);
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const handleSeeSlippers = () => {
    // Handle navigation to slippers collection
    console.log('See slippers pressed');
  };

  const handleProductSelect = (product: any) => {
    console.log('Product selected:', product.name); // Debug log
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const handleAddToCart = (productId: number, size: string) => {
    console.log('Add to cart:', productId, 'Size:', size);
    // Handle add to cart logic here
    setIsModalVisible(false); // Close modal after adding to cart
  };

  const handleCloseModal = () => {
    console.log('Closing modal'); // Debug log
    setIsModalVisible(false);
    setSelectedProduct(null);
  };

  return (
    <View style={styles.container}>
      {/* Section Headers */}
      <Text style={styles.bestsellersTitle}>BESTSELLERS</Text>
      <Text style={styles.zoeTitle}>ZOE SLIPPERS</Text>
      
      {/* Horizontal Scrolling Products */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.productsScrollView}
        contentContainerStyle={styles.productsContainer}
      >
        {bestsellerProducts.map((product) => (
          <View key={product.id} style={styles.productCard}>
            <View style={styles.imageContainer}>
              <Image 
                source={{ uri: product.image }} 
                style={styles.productImage} 
                resizeMode="cover"
              />
              <TouchableOpacity 
                style={styles.addButton}
                onPress={() => handleProductSelect(product)}
              >
                <Plus size={20} color="#1f2937" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.productInfo}>
              <Text style={styles.productName} numberOfLines={2}>
                {product.name}
              </Text>
              <Text style={styles.productPrice}>
                {product.price}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
      
      {/* See Slippers Button */}
      <TouchableOpacity style={styles.seeSlippersButton} onPress={handleSeeSlippers}>
        <Text style={styles.seeSlippersText}>SEE SLIPPERS</Text>
      </TouchableOpacity>
      
      {/* Single ProductOptionsModal - removed duplicate */}
      <ProductOptionsModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        product={selectedProduct}
        onAddToCart={handleAddToCart}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    backgroundColor: '#ffffff',
  },
  bestsellersTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
    letterSpacing: 2,
    marginBottom: 16,
    fontFamily: 'Assistant, sans-serif',
  },
  zoeTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1f2937',
    textAlign: 'center',
    letterSpacing: 1,
    marginBottom: 32,
    fontFamily: 'Assistant, sans-serif',
  },
  productsScrollView: {
    marginBottom: 32,
  },
  productsContainer: {
    paddingHorizontal: 20,
    gap: 16,
  },
  productCard: {
    width: 200,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 200,
  },
  productImage: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  addButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    width: 36,
    height: 36,
    backgroundColor: '#ffffff',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productInfo: {
    padding: 16,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 18,
    fontFamily: 'Assistant, sans-serif',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
    fontFamily: 'Assistant, sans-serif',
  },
  seeSlippersButton: {
    backgroundColor: '#1f2937',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignSelf: 'center',
    marginHorizontal: 20,
  },
  seeSlippersText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1,
    fontFamily: 'Assistant, sans-serif',
  },
});