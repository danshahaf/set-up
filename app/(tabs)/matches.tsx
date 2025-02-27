import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { styles } from '@/styles/matches';


// Keep only the received matches data
const matchesData = [
  {
    id: '0',
    matchedWith: 'Emily Wilson',
    matchedBy: 'James Brown',
    status: 'pending',
    photoUrl: 'https://picsum.photos/199',
    date: '2024-03-16',
  },
  {
    id: '1',
    matchedWith: 'Sarah Johnson',
    matchedBy: 'Mike Chen',
    status: 'success',
    photoUrl: 'https://picsum.photos/200',
    date: '2024-03-15',
  },
  {
    id: '2',
    matchedWith: 'David Lee',
    matchedBy: 'Emma Davis',
    status: 'mismatch',
    photoUrl: 'https://picsum.photos/201',
    date: '2024-03-14',
  },
  {
    id: '3',
    matchedWith: 'Anna Smith',
    matchedBy: 'Tom Garcia',
    status: 'success',
    photoUrl: 'https://picsum.photos/202',
    date: '2024-03-12',
  },
];

// Update mock data to include both matched people
const arrangedMatchesData = [
  {
    id: '1',
    person1: {
      name: 'Sarah Johnson',
      photoUrl: 'https://picsum.photos/200',
    },
    person2: {
      name: 'Michael Brown',
      photoUrl: 'https://picsum.photos/201',
    },
    status: 'pending',
    date: '2024-03-16',
  },
  {
    id: '2',
    person1: {
      name: 'Emma Davis',
      photoUrl: 'https://picsum.photos/202',
    },
    person2: {
      name: 'James Wilson',
      photoUrl: 'https://picsum.photos/203',
    },
    status: 'success',
    date: '2024-03-14',
  },
];

type MatchTicketProps = {
  name: string;
  matchedBy: string;
  status: 'success' | 'mismatch' | 'pending';
  photoUrl: string;
  date: string;
};

type ArrangedMatchTicketProps = {
  person1: { name: string; photoUrl: string };
  person2: { name: string; photoUrl: string };
  status: 'success' | 'mismatch' | 'pending';
  date: string;
};

// Move utility functions outside of components
const getStatusColors = (status: 'success' | 'mismatch' | 'pending'): [string, string] => {
  switch (status) {
    case 'success':
      return ['#E0FFFF', '#B0E0E6'];
    case 'mismatch':
      return ['#FFE0E0', '#FFB0B0'];
    case 'pending':
      return ['#F5F5F5', '#E0E0E0'];
  }
};

const getStatusText = (status: 'success' | 'mismatch' | 'pending'): string => {
  switch (status) {
    case 'success':
      return 'Success';
    case 'mismatch':
      return 'Mismatch';
    case 'pending':
      return 'Pending';
  }
};

const MatchTicket = ({ name, matchedBy, status, photoUrl, date }: MatchTicketProps) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <View style={styles.ticketContainer}>
      <Image source={{ uri: photoUrl }} style={styles.profileImage} />
      <View style={styles.ticketContent}>
        <View style={styles.ticketHeader}>
          <Text style={styles.matchName}>{name}</Text>
          <Text style={styles.dateText}>{formattedDate}</Text>
        </View>
        <View style={styles.ticketBottom}>
          <Text style={styles.matcherName}>matched by {matchedBy}</Text>
          <LinearGradient
            colors={getStatusColors(status)}
            style={styles.statusTag}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={[
              styles.statusText,
              status === 'pending' && styles.pendingText
            ]}>
              {getStatusText(status)}
            </Text>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
};

const ArrangedMatchTicket = ({ person1, person2, status, date }: ArrangedMatchTicketProps) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <View style={styles.arrangedTicketContainer}>
      <View style={styles.arrangedTicketHeader}>
        <Text style={styles.dateText}>{formattedDate}</Text>
        <LinearGradient
          colors={getStatusColors(status)}
          style={styles.statusTag}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={[
            styles.statusText,
            status === 'pending' && styles.pendingText
          ]}>
            {getStatusText(status)}
          </Text>
        </LinearGradient>
      </View>
      
      <View style={styles.matchedPeopleContainer}>
        <View style={styles.personContainer}>
          <Image source={{ uri: person1.photoUrl }} style={styles.arrangedProfileImage} />
          <Text style={styles.personName} numberOfLines={1}>{person1.name}</Text>
        </View>
        <View style={styles.matchConnector}>
          <IconSymbol name="heart.fill" size={24} color="#666666" />
        </View>
        <View style={styles.personContainer}>
          <Image source={{ uri: person2.photoUrl }} style={styles.arrangedProfileImage} />
          <Text style={styles.personName} numberOfLines={1}>{person2.name}</Text>
        </View>
      </View>
    </View>
  );
};

export default function MatchesScreen() {
  const [fontsLoaded] = useFonts({
    'Nunito': require('../../assets/fonts/Nunito-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Your Matches</Text>
      </View>

      <ScrollView style={styles.content}>
        {matchesData.map(match => (
          <MatchTicket
            key={match.id}
            name={match.matchedWith}
            matchedBy={match.matchedBy}
            status={match.status as 'success' | 'mismatch' | 'pending'}
            photoUrl={match.photoUrl}
            date={match.date}
          />
        ))}
      </ScrollView>
    </View>
  );
}

