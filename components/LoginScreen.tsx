import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  runOnJS 
} from 'react-native-reanimated';
import { X } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface LoginScreenProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function LoginScreen({ isVisible, onClose }: LoginScreenProps) {
  const [currentStep, setCurrentStep] = useState<'email' | 'code'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const translateX = useSharedValue(-width);

  React.useEffect(() => {
    if (isVisible) {
      translateX.value = withTiming(0, { duration: 300 });
      setCurrentStep('email');
      setEmail('');
      setCode('');
    } else {
      translateX.value = withTiming(-width, { duration: 300 });
    }
  }, [isVisible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const handleClose = () => {
    translateX.value = withTiming(-width, { duration: 300 }, () => {
      runOnJS(onClose)();
    });
  };

  const handleContinue = () => {
    if (currentStep === 'email') {
      if (email.trim()) {
        setCurrentStep('code');
      }
    } else {
      // Handle code verification
      console.log('Verifying code:', code);
      handleClose();
    }
  };

  if (!isVisible) return null;

  return (
    <View style={styles.overlay}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <X size={24} color="#1f2937" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.brandName}>Nallan</Text>
          
          {currentStep === 'email' ? (
            <>
              <Text style={styles.title}>Log in</Text>
              <Text style={styles.subtitle}>
                Enter your email and we will send you a verification code.
              </Text>
              
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#9ca3af"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
              
              <TouchableOpacity 
                style={[styles.continueButton, !email.trim() && styles.disabledButton]} 
                onPress={handleContinue}
                disabled={!email.trim()}
              >
                <Text style={styles.continueButtonText}>Continue</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.title}>Enter code</Text>
              <Text style={styles.subtitle}>
                sent to {email}
              </Text>
              
              <TextInput
                style={styles.input}
                placeholder="6-digit code"
                placeholderTextColor="#9ca3af"
                value={code}
                onChangeText={setCode}
                keyboardType="number-pad"
                maxLength={6}
                autoFocus
              />
              
              <TouchableOpacity 
                style={[styles.continueButton, code.length !== 6 && styles.disabledButton]} 
                onPress={handleContinue}
                disabled={code.length !== 6}
              >
                <Text style={styles.continueButtonText}>Continue</Text>
              </TouchableOpacity>
            </>
          )}
          
          <View style={styles.footer}>
            <TouchableOpacity style={styles.linkButton}>
              <Text style={styles.linkText}>Protection of personal data</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.linkButton}>
              <Text style={styles.linkText}>Terms</Text>
            </TouchableOpacity>
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
    zIndex: 2000,
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
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
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  closeButton: {
    alignSelf: 'flex-start',
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 40,
    justifyContent: 'center',
  },
  brandName: {
    fontSize: 32,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 60,
    fontFamily: 'Assistant, sans-serif',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
    fontFamily: 'Assistant, sans-serif',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 40,
    lineHeight: 24,
    fontFamily: 'Assistant, sans-serif',
  },
  input: {
    borderWidth: 2,
    borderColor: '#3b82f6',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 16,
    backgroundColor: '#ffffff',
    marginBottom: 24,
    fontFamily: 'Assistant, sans-serif',
  },
  continueButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 40,
  },
  disabledButton: {
    backgroundColor: '#9ca3af',
  },
  continueButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Assistant, sans-serif',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  linkButton: {
    paddingVertical: 8,
  },
  linkText: {
    color: '#3b82f6',
    fontSize: 14,
    fontFamily: 'Assistant, sans-serif',
  },
});