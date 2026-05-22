import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function DestinationCard({ destination, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <Image source={{ uri: destination.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{destination.name}</Text>
        <Text style={styles.location}>📍 {destination.location}</Text>
        <Text style={styles.price}>💰 ${destination.price}/night</Text>
        <Text style={styles.rating}>⭐ {destination.rating}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  info: {
    padding: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3436',
  },
  location: {
    fontSize: 14,
    color: '#636e72',
    marginTop: 4,
  },
  price: {
    fontSize: 14,
    color: '#00b894',
    fontWeight: '600',
    marginTop: 6,
  },
  rating: {
    fontSize: 12,
    color: '#f39c12',
    marginTop: 4,
  },
});