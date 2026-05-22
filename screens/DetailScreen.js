import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@travel_buddy_favorites';

export default function DetailScreen({ route }) {
  const { destination } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    checkIfFavorite();
  }, []);

  const checkIfFavorite = async () => {
    try {
      const favorites = await AsyncStorage.getItem(FAVORITES_KEY);
      if (favorites) {
        const favList = JSON.parse(favorites);
        setIsFavorite(favList.some(fav => fav.id === destination.id));
      }
    } catch (error) {
      console.error('Error checking favorite:', error);
    }
  };

  const toggleFavorite = async () => {
    try {
      const favorites = await AsyncStorage.getItem(FAVORITES_KEY);
      let favList = favorites ? JSON.parse(favorites) : [];
      
      if (isFavorite) {
        favList = favList.filter(fav => fav.id !== destination.id);
        Alert.alert('Removed', `${destination.name} removed from favorites`);
      } else {
        favList.push(destination);
        Alert.alert('Added', `${destination.name} added to favorites! ❤️`);
      }
      
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favList));
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error saving favorite:', error);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Image source={{ uri: destination.image }} style={styles.heroImage} />
      
      <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
        <Text style={styles.favoriteIcon}>{isFavorite ? '❤️' : '🤍'}</Text>
      </TouchableOpacity>
      
      <View style={styles.content}>
        <Text style={styles.name}>{destination.name}</Text>
        <Text style={styles.location}>📍 {destination.location}</Text>
        
        <View style={styles.priceRating}>
          <Text style={styles.price}>💰 ${destination.price}/night</Text>
          <Text style={styles.rating}>⭐ {destination.rating} / 5.0</Text>
        </View>
        
        <View style={styles.descriptionBox}>
          <Text style={styles.descriptionTitle}>About this place</Text>
          <Text style={styles.description}>{destination.description}</Text>
        </View>
        
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heroImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  favoriteButton: {
    position: 'absolute',
    top: 260,
    right: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 30,
    padding: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  favoriteIcon: {
    fontSize: 28,
  },
  content: {
    padding: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2d3436',
  },
  location: {
    fontSize: 16,
    color: '#636e72',
    marginTop: 4,
  },
  priceRating: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#dfe6e9',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00b894',
  },
  rating: {
    fontSize: 16,
    color: '#f39c12',
  },
  descriptionBox: {
    marginTop: 20,
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#636e72',
    lineHeight: 24,
  },
  bookButton: {
    backgroundColor: '#00b894',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});