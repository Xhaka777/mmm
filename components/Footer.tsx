import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleNewsletterSignup = () => {
    // Handle newsletter signup logic here
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Nallan</Text>
          <Text style={styles.aboutText}>
            Nallan encapsulates balance, authenticity and ergonomic design with a focus on functionality, comfort and quality.
          </Text>
          <Text style={styles.aboutText}>
            The name 'Nallan' is derived from the ancient Indo-European term "Nallane", which is one of the first known names for shoes.
          </Text>
          <Text style={styles.aboutText}>
            nallan.dk is part of NALLAN AUTHENTIC LLC, a footwear brand with roots in a family with old traditions of shoemaking, dating back to 1947. In 2022, NALLAN was launched as its own independent brand. NALLAN remains true to its roots and is produced in Europe according to solid shoemaking traditions.
          </Text>
        </View>

        {/* Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Info</Text>
          <View style={styles.linksList}>
            <Text style={styles.link}>Customer service</Text>
            <Text style={styles.link}>Size guide</Text>
            <Text style={styles.link}>Free Exchange</Text>
            <Text style={styles.link}>Delivery</Text>
            <Text style={styles.link}>Return</Text>
            <Text style={styles.link}>Terms of Trade</Text>
            <Text style={styles.link}>Create account</Text>
            <Text style={styles.link}>Privacy Policy</Text>
            <Text style={styles.link}>Cookie Policy</Text>
            <Text style={styles.link}>Newsletter</Text>
          </View>
        </View>

        {/* Newsletter Section */}
        <View style={styles.section}>
          <Text style={styles.newsletterText}>
            Sign up for our newsletter and get news about our products and be the first to receive great offers.
          </Text>
          <Text style={styles.unsubscribeText}>
            You can unsubscribe at any time.
          </Text>
          
          <View style={styles.emailContainer}>
            <TextInput
              style={styles.emailInput}
              placeholder="Email"
              placeholderTextColor="#9ca3af"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TouchableOpacity style={styles.subscribeButton} onPress={handleNewsletterSignup}>
              <Text style={styles.subscribeButtonText}>Receive newsletter</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Copyright */}
        <View style={styles.copyrightSection}>
          <Text style={styles.copyrightText}>© 2025 - Nallan</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafb',
    paddingTop: 40,
    paddingBottom: 20,
    marginTop: 40,
  },
  content: {
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 16,
    fontFamily: 'Assistant, sans-serif',
  },
  aboutText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#4b5563',
    marginBottom: 12,
    fontFamily: 'Assistant, sans-serif',
  },
  linksList: {
    gap: 8,
  },
  link: {
    fontSize: 14,
    color: '#6b7280',
    paddingVertical: 4,
    fontFamily: 'Assistant, sans-serif',
  },
  newsletterText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#4b5563',
    marginBottom: 8,
    fontFamily: 'Assistant, sans-serif',
  },
  unsubscribeText: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 16,
    fontFamily: 'Assistant, sans-serif',
  },
  emailContainer: {
    gap: 12,
  },
  emailInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    backgroundColor: '#ffffff',
    fontFamily: 'Assistant, sans-serif',
  },
  subscribeButton: {
    backgroundColor: '#1f2937',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  subscribeButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Assistant, sans-serif',
  },
  copyrightSection: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 20,
    alignItems: 'center',
  },
  copyrightText: {
    fontSize: 12,
    color: '#6b7280',
    fontFamily: 'Assistant, sans-serif',
  },
});