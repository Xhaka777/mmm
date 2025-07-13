import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

interface CollectionCardProps {
  name: string;
  image: string;
}

export default function CollectionCard({ name, image }: CollectionCardProps) {
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: width - 40,
    height: 300,
    borderRadius: 12,
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
    maxWidth: width - 40,
    fontFamily: 'Assistant, sans-serif',
  },
});