import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useFonts } from 'expo-font';
import { styles } from '@/styles/leaderboard';


// Mock data for the leaderboard
const leaderboardData = [
  { id: 1, name: 'Sarah Johnson', matches: 45, rate: '92%' },
  { id: 2, name: 'Mike Chen', matches: 42, rate: '88%' },
  { id: 3, name: 'Emma Davis', matches: 38, rate: '85%' },
  { id: 4, name: 'James Wilson', matches: 35, rate: '82%' },
  { id: 5, name: 'Lisa Brown', matches: 32, rate: '80%' },
  { id: 6, name: 'Alex Kim', matches: 30, rate: '78%' },
  { id: 7, name: 'David Lee', matches: 28, rate: '75%' },
  { id: 8, name: 'Sophie Wang', matches: 25, rate: '73%' },
  { id: 9, name: 'Tom Garcia', matches: 22, rate: '70%' },
  { id: 10, name: 'Anna Smith', matches: 20, rate: '68%' },
];

export default function LeaderboardScreen() {
  const [activeFilter, setActiveFilter] = useState('matches'); // 'matches' or 'rate'

  const [fontsLoaded] = useFonts({
    'Nunito': require('../../assets/fonts/Nunito-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Best Match Makers</Text>
      </View>
      
      <View style={styles.filterContainer}>
        <TouchableOpacity 
          style={[
            styles.filterButton, 
            activeFilter === 'matches' && styles.filterButtonActive
          ]}
          onPress={() => setActiveFilter('matches')}
        >
          <Text style={[
            styles.filterText,
            activeFilter === 'matches' && styles.filterTextActive
          ]}>Most Matches</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.filterButton,
            activeFilter === 'rate' && styles.filterButtonActive
          ]}
          onPress={() => setActiveFilter('rate')}
        >
          <Text style={[
            styles.filterText,
            activeFilter === 'rate' && styles.filterTextActive
          ]}>Success Rate</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.leaderboardContainer}>
        {leaderboardData.map((item) => (
          <View key={item.id} style={styles.leaderboardRow}>
            <View style={styles.rankingContainer}>
              <Text style={styles.rankingNumber}>{item.id}</Text>
              <Text style={styles.rankingName}>{item.name}</Text>
            </View>
            <Text style={styles.rankingScore}>
              {activeFilter === 'matches' ? item.matches : item.rate}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

