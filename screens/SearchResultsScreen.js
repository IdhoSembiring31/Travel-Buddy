import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { destinations } from '../data/destinations';
import DestinationCard from '../components/DestinationCard';

export default function SearchResultsScreen({ route, navigation }) {
  const { query } = route.params;
  
  const filteredDestinations = destinations.filter(dest =>
    dest.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🔍 Search Results</Text>
        <Text style={styles.headerSubtitle}>
          Found {filteredDestinations.length} result(s) for "{query}"
        </Text>
      </View>
      
      {filteredDestinations.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>😢</Text>
          <Text style={styles.emptyText}>No destinations found</Text>
          <Text style={styles.emptySubtext}>Try searching with different keywords</Text>
        </View>
      ) : (
        <FlatList
          data={filteredDestinations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DestinationCard
              destination={item}
              onPress={() => navigation.navigate('HomeTab', {
                screen: 'Detail',
                params: { destination: item }
              })}
            />
          )}
          contentContainerStyle={styles.list}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    backgroundColor: '#00b894',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    marginTop: 4,
  },
  list: {
    padding: 16,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#636e72',
  },
});