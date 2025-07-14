import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    runOnJS
} from 'react-native-reanimated';
import { ArrowLeft, Check } from 'lucide-react-native';
import { flagIcons, getFlagIcon } from '@/utils/images';

const { width, height } = Dimensions.get('window');

interface Country {
    id: string;
    name: string;
    flag: any; // Changed to any for local images
    currency: string;
}

const countries: Country[] = [
    { id: 'dk', name: 'DENMARK', flag: flagIcons.denmark, currency: 'DKK' },
    { id: 'xk', name: 'KOSOVO', flag: flagIcons.kosovo, currency: 'EUR' },
    { id: 'us', name: 'UNITED STATES', flag: flagIcons.unitedStates, currency: 'USD' },
    { id: 'de', name: 'GERMANY', flag: flagIcons.germany, currency: 'EUR' },
    { id: 'gb', name: 'UNITED KINGDOM', flag: flagIcons.unitedKingdom, currency: 'GBP' },
    { id: 'fr', name: 'FRANCE', flag: flagIcons.france, currency: 'EUR' },
];

interface CountrySelectionScreenProps {
    isVisible: boolean;
    onClose: () => void;
    onCountrySelect: (country: Country) => void;
    selectedCountry?: Country;
  }
  
  export default function CountrySelectionScreen({ 
    isVisible, 
    onClose, 
    onCountrySelect,
    selectedCountry 
  }: CountrySelectionScreenProps) {
    const [tempSelectedCountry, setTempSelectedCountry] = useState<Country | null>(
      selectedCountry || countries[0]
    );
    const translateX = useSharedValue(width); // Changed from translateY to translateX
  
    React.useEffect(() => {
      if (isVisible) {
        translateX.value = withTiming(0, { duration: 300 }); // Slide in from right
      } else {
        translateX.value = withTiming(width, { duration: 300 }); // Slide out to right
      }
    }, [isVisible]);
  
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateX: translateX.value }], // Changed from translateY to translateX
    }));
  
    const handleClose = () => {
      translateX.value = withTiming(width, { duration: 300 }, () => { // Slide out to right
        runOnJS(onClose)();
      });
    };
  
    const handleCountryPress = (country: Country) => {
      setTempSelectedCountry(country);
    };
  
    const handleContinue = () => {
      if (tempSelectedCountry) {
        onCountrySelect(tempSelectedCountry);
        translateX.value = withTiming(width, { duration: 300 }, () => { // Slide out to right
          runOnJS(onClose)();
        });
      }
    };
  
    if (!isVisible) return null;
  
    return (
      <View style={styles.overlay}>
        <Animated.View style={[styles.container, animatedStyle]}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handleClose} style={styles.backButton}>
              <ArrowLeft size={24} color="#1f2937" />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>SELECT COUNTRY</Text>
            </View>
            <View style={styles.headerSpacer} />
          </View>
  
          {/* Country List */}
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <View style={styles.countryList}>
              {countries.map((country, index) => (
                <TouchableOpacity
                  key={country.id}
                  style={[
                    styles.countryItem,
                    index === 0 && styles.firstItem,
                    tempSelectedCountry?.id === country.id && styles.selectedItem
                  ]}
                  onPress={() => handleCountryPress(country)}
                  activeOpacity={0.7}
                >
                  <View style={styles.countryContent}>
                    <Image source={country.flag} style={styles.flagImage} />
                    <Text style={styles.countryName}>{country.name}</Text>
                  </View>
                  {tempSelectedCountry?.id === country.id && (
                    <Check size={20} color="#8B4513" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

  
          {/* Continue Button */}
          <TouchableOpacity 
            style={styles.continueButton} 
            onPress={handleContinue}
            activeOpacity={0.8}
          >
            <Text style={styles.continueButtonText}>CONTINUE</Text>
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
      zIndex: 5000,
    },
    container: {
      position: 'absolute',
      top: 0,
      right: 0, // Changed from left: 0 to right: 0
      width: '100%', // Full width for better slide effect
      height: '100%',
      backgroundColor: '#ffffff',
      shadowColor: '#000',
      shadowOffset: {
        width: -2, // Shadow on the left side
        height: 0,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 60,
      paddingHorizontal: 20,
      paddingBottom: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#f3f4f6',
    },
    backButton: {
      padding: 8,
      width: 40, // Fixed width for proper centering
    },
    titleContainer: {
      flex: 1,
      alignItems: 'center',
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      color: '#1f2937',
      letterSpacing: 1,
      fontFamily: 'Assistant, sans-serif',
    },
    headerSpacer: {
      width: 40, // Same width as backButton to balance the layout
    },
    scrollView: {
      flex: 1,
    },
    countryList: {
      paddingTop: 20,
    },
    countryItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#f3f4f6',
    },
    firstItem: {
      backgroundColor: '#f9fafb',
    },
    selectedItem: {
      backgroundColor: '#f0f9ff',
    },
    countryContent: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    flag: {
      fontSize: 24,
      marginRight: 16,
    },
    flagImage: {
      width: 24,
      height: 24,
      marginRight: 16,
      borderRadius: 2,
    },
    countryName: {
      fontSize: 16,
      fontWeight: '500',
      color: '#1f2937',
      letterSpacing: 1,
      fontFamily: 'Assistant, sans-serif',
    },
    brandContainer: {
      alignItems: 'center',
      paddingVertical: 40,
      position: 'relative',
    },
    logoCircle: {
      width: 80,
      height: 80,
      borderRadius: 40,
      borderWidth: 2,
      borderColor: '#1f2937',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
    },
    logoText: {
      fontSize: 32,
      fontWeight: '600',
      color: '#1f2937',
      fontFamily: 'Assistant, sans-serif',
    },
    brandName: {
      fontSize: 12,
      fontWeight: '600',
      color: '#6b7280',
      letterSpacing: 3,
      fontFamily: 'Assistant, sans-serif',
    },
    brandYear: {
      fontSize: 14,
      fontWeight: '600',
      color: '#1f2937',
      fontFamily: 'Assistant, sans-serif',
    },
    continueButton: {
      backgroundColor: '#1f2937',
      marginHorizontal: 20,
      paddingVertical: 16,
      borderRadius: 8,
      alignItems: 'center',
      marginBottom: 40,
    },
    continueButtonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '600',
      letterSpacing: 1,
      fontFamily: 'Assistant, sans-serif',
    },
  });