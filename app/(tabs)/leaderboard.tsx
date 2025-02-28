import { View, Text, ScrollView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import { styles } from '@/styles/leaderboard';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '@/lib/supabase';

interface LeaderboardItem {
  id: string;
  name: string;
  matches: number;
  photoUrl: string;
}

interface UserStats {
  rank: number;
  matches: number;
  successRate: number;
}

export default function LeaderboardScreen() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardItem[]>([]);
  const [currentUserStats, setCurrentUserStats] = useState<UserStats | null>(null);
  const currentUserId = "41cbf213-ce41-4c2e-ad0e-014d4b3a58b7"; // Hardcoded user ID

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const { data: matches, error } = await supabase
        .from('matches')
        .select('matcher_id');

      if (error) {
        console.error("Error fetching matches:", error);
        return;
      }

      // Count matches per user
      const matchCounts: { [key: string]: number } = matches.reduce((acc, match) => {
        acc[match.matcher_id] = (acc[match.matcher_id] || 0) + 1;
        return acc;
      }, {} as { [key: string]: number });

      // Get unique user IDs
      const userIds = Object.keys(matchCounts);

      // Fetch user details
      const { data: users, error: userError } = await supabase
        .from('users')
        .select('id, first_name, last_name')
        .in('id', userIds);

      if (userError) {
        console.error("Error fetching users:", userError);
        return;
      }

      // Create leaderboard data
      const leaderboard = userIds
        .map(userId => {
          const user = users.find(u => u.id === userId);
          return {
            id: userId,
            name: user ? `${user.first_name} ${user.last_name}` : "Unknown",
            matches: matchCounts[userId] || 0,
            photoUrl: `${supabase.storage.from('user-images').getPublicUrl(`${userId}/1.png`).data.publicUrl}`,
          };
        })
        .sort((a, b) => b.matches - a.matches); // Sort by matches

      setLeaderboardData(leaderboard);

      // Set current user stats
      const currentUserRank = leaderboard.findIndex(u => u.id === currentUserId) + 1;
      setCurrentUserStats({
        rank: currentUserRank >= 0 ? currentUserRank : leaderboard.length + 1,
        matches: matchCounts[currentUserId] || 0,
        successRate: Math.min(100, (matchCounts[currentUserId] || 1) * 2), // Example calculation
      });
    };

    fetchLeaderboard();
  }, []);

  const [fontsLoaded] = useFonts({
    'Nunito': require('../../assets/fonts/Nunito-Regular.ttf'),
  });

  if (!fontsLoaded || !currentUserStats) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Best Match Makers</Text>
      </View>

      <ScrollView style={styles.leaderboardContainer}>
        {leaderboardData.map((item, index) => (
          <View key={item.id} style={styles.leaderboardRow}>
            <View style={styles.rankingContainer}>
              <Text style={styles.rankingNumber}>{index + 1}</Text>
              <Image source={{ uri: item.photoUrl }} style={styles.profileImage} />
              <Text style={styles.rankingName}>{item.name}</Text>
            </View>
            <View style={styles.matchCountContainer}>
              <Text style={styles.matchCount}>{item.matches}</Text>
              <Text style={styles.matchLabel}>matches</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={[styles.statsWidget, { 
        backgroundColor: '#ffffff', 
        borderWidth: 2, 
        borderColor: '#FFD700',
      }]}>
        <LinearGradient
          colors={['rgba(255, 215, 0, 0.1)', 'rgba(255, 247, 230, 0.05)']}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 150,
          }}
        />
        <View style={styles.statsContent}>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>#{currentUserStats.rank}</Text>
              <Text style={styles.statLabel}>Rank</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{currentUserStats.matches}</Text>
              <Text style={styles.statLabel}>Matches</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{currentUserStats.successRate}%</Text>
              <Text style={styles.statLabel}>Success</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
