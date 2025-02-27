import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, ScrollView, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { LinearGradient } from 'expo-linear-gradient';
import * as Contacts from 'expo-contacts';
import { commonStyles } from '@/styles/common';
import { setupStyles } from '@/styles/setup';
import { modalStyles } from '@/styles/modal';
import { arrangedMatchesStyles } from '@/styles/arrangedMatches';
import { getMyMatches } from '@/lib/api';
import { Match } from '@/types/database';

// Update arranged matches data with more examples
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
  {
    id: '3',
    person1: {
      name: 'Lisa Chen',
      photoUrl: 'https://picsum.photos/204',
    },
    person2: {
      name: 'Alex Thompson',
      photoUrl: 'https://picsum.photos/205',
    },
    status: 'mismatch',
    date: '2024-03-13',
  },
  {
    id: '4',
    person1: {
      name: 'Rachel Green',
      photoUrl: 'https://picsum.photos/206',
    },
    person2: {
      name: 'Ross Geller',
      photoUrl: 'https://picsum.photos/207',
    },
    status: 'success',
    date: '2024-03-12',
  },
];

// Add these types and component
type ArrangedMatchTicketProps = {
  person1: { name: string; photoUrl: string };
  person2: { name: string; photoUrl: string };
  status: string;
  date: string;
};

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

const ArrangedMatchTicket = ({ person1, person2, status, date }: ArrangedMatchTicketProps) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <View style={arrangedMatchesStyles.ticketContainer}>
      <View style={arrangedMatchesStyles.ticketHeader}>
        <Text style={arrangedMatchesStyles.dateText}>{formattedDate}</Text>
        <LinearGradient
          colors={getStatusColors(status as 'success' | 'mismatch' | 'pending')}
          style={arrangedMatchesStyles.statusTag}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={[
            arrangedMatchesStyles.statusText,
            status === 'pending' && arrangedMatchesStyles.pendingText
          ]}>
            {getStatusText(status as 'success' | 'mismatch' | 'pending')}
          </Text>
        </LinearGradient>
      </View>
      
      <View style={arrangedMatchesStyles.matchedPeopleContainer}>
        <View style={arrangedMatchesStyles.personContainer}>
          <Image source={{ uri: person1.photoUrl }} style={arrangedMatchesStyles.profileImage} />
          <Text style={arrangedMatchesStyles.personName} numberOfLines={1}>{person1.name}</Text>
        </View>
        <View style={arrangedMatchesStyles.matchConnector}>
          <IconSymbol name="heart.fill" size={24} color="#666666" />
        </View>
        <View style={arrangedMatchesStyles.personContainer}>
          <Image source={{ uri: person2.photoUrl }} style={arrangedMatchesStyles.profileImage} />
          <Text style={arrangedMatchesStyles.personName} numberOfLines={1}>{person2.name}</Text>
        </View>
      </View>
    </View>
  );
};

export default function SetUpScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<{[key: string]: string}>({
    contact1: '',
    contact2: '',
  });
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  const pickContact = async (contactKey: 'contact1' | 'contact2') => {
    try {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Name],
        });

        if (data.length > 0) {
          const contact = data[0];
          const phoneNumber = contact.phoneNumbers?.[0]?.number;
          if (phoneNumber) {
            setSelectedContacts(prev => ({
              ...prev,
              [contactKey]: phoneNumber
            }));
          } else {
            Alert.alert('Error', 'Selected contact has no phone number');
          }
        }
      } else {
        Alert.alert('Permission required', 'Please allow access to contacts');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to access contacts');
    }
  };

  useEffect(() => {
    async function loadMatches() {
      try {
        const userId = 'current-user-id'; // Get from auth
        const data = await getMyMatches(userId);
        setMatches(data);
      } catch (error) {
        console.error('Error loading matches:', error);
      } finally {
        setLoading(false);
      }
    }

    loadMatches();
  }, []);

  const [fontsLoaded] = useFonts({
    'Nunito': require('../../assets/fonts/Nunito-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.titleContainer}>
        <Text style={commonStyles.title}>Matches I Made</Text>
      </View>

      <ScrollView 
        style={commonStyles.content}
        contentContainerStyle={commonStyles.contentContainer}
      >
        {loading ? (
          <Text style={arrangedMatchesStyles.loadingText}>Loading matches...</Text>
        ) : (
          matches.map(match => (
            <ArrangedMatchTicket
              key={match.id}
              person1={{
                name: `${match.person1.first_name} ${match.person1.last_name}`,
                photoUrl: 'https://picsum.photos/200',
              }}
              person2={{
                name: `${match.person2.first_name} ${match.person2.last_name}`,
                photoUrl: 'https://picsum.photos/201',
              }}
              status={match.response_person1 || 'pending'}
              date={match.created_at}
            />
          ))
        )}
      </ScrollView>

      <TouchableOpacity 
        style={setupStyles.floatingButton}
        onPress={() => setIsModalVisible(true)}
      >
        <IconSymbol name="plus" size={24} color="#ffffff" />
        <Text style={setupStyles.floatingButtonText}>make a match</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={modalStyles.container}>
          <View style={modalStyles.modalHeader}>
            <Text style={modalStyles.modalTitle}>Set Up</Text>
            <Text style={modalStyles.modalDescription}>make a match</Text>
          </View>

          <View style={modalStyles.contactsContainer}>
            <TouchableOpacity 
              style={modalStyles.contactBox}
              onPress={() => pickContact('contact1')}
            >
              {selectedContacts.contact1 ? (
                <View style={modalStyles.selectedContact}>
                  <IconSymbol name="person.fill" size={30} color="#666666" />
                  <Text style={modalStyles.contactText} numberOfLines={1}>
                    {selectedContacts.contact1}
                  </Text>
                </View>
              ) : (
                <>
                  <IconSymbol name="plus" size={40} color="#666666" />
                  <Text style={modalStyles.contactText}>add contact</Text>
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity 
              style={modalStyles.contactBox}
              onPress={() => pickContact('contact2')}
            >
              {selectedContacts.contact2 ? (
                <View style={modalStyles.selectedContact}>
                  <IconSymbol name="person.fill" size={30} color="#666666" />
                  <Text style={modalStyles.contactText} numberOfLines={1}>
                    {selectedContacts.contact2}
                  </Text>
                </View>
              ) : (
                <>
                  <IconSymbol name="plus" size={40} color="#666666" />
                  <Text style={modalStyles.contactText}>add contact</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          <View style={modalStyles.buttonContainer}>
            <LinearGradient
              colors={['#E0FFFF', '#B0E0E6']}
              style={modalStyles.matchButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <TouchableOpacity 
                style={modalStyles.matchButtonContent}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={modalStyles.matchButtonText}>make match</Text>
              </TouchableOpacity>
            </LinearGradient>
            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
              <Text style={modalStyles.anonymousText}>match anonymously</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
