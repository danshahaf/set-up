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
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';

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

// Add these interfaces
interface Contact {
  name: string;
  phoneNumber: string;
  userId?: string;
  photoUrl?: string;
  exists: boolean;
}

export default function SetUpScreen() {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<{
    contact1: Contact | null;
    contact2: Contact | null;
  }>({
    contact1: null,
    contact2: null,
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
          const name = contact.name || 'Unknown';
          
          if (phoneNumber) {
            // Create a new contact object
            setSelectedContacts(prev => ({
              ...prev,
              [contactKey]: {
                name,
                phoneNumber,
                exists: false // Will be updated after checking
              }
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

  // Add this function to check if users exist
  const checkUsersExist = async () => {
    if (!selectedContacts.contact1 || !selectedContacts.contact2) {
      return false;
    }

    try {
      // Check first contact
      const { data: user1Data, error: user1Error } = await supabase
        .from('users')
        .select('id, first_name, last_name')
        .eq('phone_number', selectedContacts.contact1.phoneNumber)
        .single();

      if (user1Error && user1Error.code !== 'PGRST116') { // PGRST116 is "not found"
        console.error("Error checking user 1:", user1Error);
        return false;
      }

      // Check second contact
      const { data: user2Data, error: user2Error } = await supabase
        .from('users')
        .select('id, first_name, last_name')
        .eq('phone_number', selectedContacts.contact2.phoneNumber)
        .single();

      if (user2Error && user2Error.code !== 'PGRST116') {
        console.error("Error checking user 2:", user2Error);
        return false;
      }

      // Update contact1 with user data if found
      if (user1Data) {
        const photoUrl = supabase.storage
          .from('user-images')
          .getPublicUrl(`${user1Data.id}/1.png`).data.publicUrl;

        setSelectedContacts(prev => ({
          ...prev,
          contact1: {
            ...prev.contact1!,
            userId: user1Data.id,
            photoUrl,
            exists: true
          }
        }));
      }

      // Update contact2 with user data if found
      if (user2Data) {
        const photoUrl = supabase.storage
          .from('user-images')
          .getPublicUrl(`${user2Data.id}/1.png`).data.publicUrl;

        setSelectedContacts(prev => ({
          ...prev,
          contact2: {
            ...prev.contact2!,
            userId: user2Data.id,
            photoUrl,
            exists: true
          }
        }));
      }

      return true;
    } catch (error) {
      console.error("Error checking users:", error);
      return false;
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
        {/* ... existing matches list ... */}
      </ScrollView>

      <TouchableOpacity 
        style={setupStyles.floatingButton}
        onPress={() => setIsModalVisible(true)}
      >
        <IconSymbol name="plus" size={24} color="#ffffff" />
        <Text style={setupStyles.floatingButtonText}>Make A Match</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={modalStyles.container}>
          <Image
            source={require('@/assets/images/hearts_background_2.png')}
            style={modalStyles.backgroundImage}
          />
          <View style={modalStyles.whiteOverlay} />
          <View style={modalStyles.content}>
            <View style={modalStyles.modalHeader}>
              <Text style={modalStyles.modalTitle}>Make a Match</Text>
            </View>

            <View style={modalStyles.contactsContainer}>
              <TouchableOpacity onPress={() => pickContact('contact1')}>
                <View style={modalStyles.contactBox}>
                  <LinearGradient
                    colors={['rgba(255, 215, 0, 0.4)', 'rgba(255, 247, 230, 0.15)']}
                    style={modalStyles.contactBoxGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  />
                  <View style={modalStyles.contactBoxContent}>
                    {selectedContacts.contact1 ? (
                      <>
                        {selectedContacts.contact1.photoUrl ? (
                          <Image 
                            source={{ uri: selectedContacts.contact1.photoUrl }} 
                            style={modalStyles.contactImage} 
                          />
                        ) : (
                          <IconSymbol 
                            name="person.circle.fill" 
                            size={40} 
                            color="#666666" 
                          />
                        )}
                        <Text style={modalStyles.contactBoxText}>
                          {selectedContacts.contact1.name}
                        </Text>
                      </>
                    ) : (
                      <>
                        <IconSymbol 
                          name="plus" 
                          size={24} 
                          color="#666666" 
                          style={modalStyles.plusIcon}
                        />
                        <Text style={modalStyles.contactBoxText}>
                          Select Friend
                        </Text>
                      </>
                    )}
                  </View>
                </View>
              </TouchableOpacity>

              {/* <IconSymbol name="heart" size={24} color="#666666" /> */}

              <TouchableOpacity onPress={() => pickContact('contact2')}>
                <View style={modalStyles.contactBox}>
                  <LinearGradient
                    colors={['rgba(255, 215, 0, 0.5)', 'rgba(255, 247, 230, 0.15)']}
                    style={modalStyles.contactBoxGradient}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0 }}
                  />
                  <View style={modalStyles.contactBoxContent}>
                    <IconSymbol 
                      name="plus" 
                      size={24} 
                      color="#666666" 
                      style={modalStyles.plusIcon}
                    />
                    <Text style={modalStyles.contactBoxText}>
                      {selectedContacts.contact2?.name || 'Select Friend'}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            <View style={modalStyles.buttonContainer}>
              <LinearGradient
                colors={['rgba(255, 215, 0, 0.5)', 'rgba(255, 236, 179, 0.95)']}
                style={modalStyles.matchButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <TouchableOpacity 
                  style={modalStyles.matchButtonContent}
                  onPress={async () => {
                    if (!selectedContacts.contact1 || !selectedContacts.contact2) {
                      Alert.alert('Select Contacts', 'Please select both contacts to make a match');
                      return;
                    }
                    
                    // Show loading indicator
                    setLoading(true);
                    
                    try {
                      // Check if users exist in the system
                      const usersChecked = await checkUsersExist();
                      
                      if (usersChecked) {
                        // Create the match in the database
                        if (selectedContacts.contact1.exists && selectedContacts.contact2.exists) {
                          // Both users exist, create match with user IDs
                          const { error } = await supabase
                            .from('matches')
                            .insert({
                              matcher_id: 'current-user-id', // Your user ID
                              person1_id: selectedContacts.contact1.userId,
                              person2_id: selectedContacts.contact2.userId,
                              status: 'pending'
                            });
                            
                          if (error) {
                            console.error("Error creating match:", error);
                            Alert.alert('Error', 'Failed to create match');
                          } else {
                            Alert.alert('Success', 'Match created successfully!');
                            setIsModalVisible(false);
                          }
                        } else {
                          // One or both users don't exist
                          Alert.alert(
                            'New Users',
                            'One or both contacts are not registered users. Would you like to invite them?',
                            [
                              {
                                text: 'Cancel',
                                style: 'cancel'
                              },
                              {
                                text: 'Invite',
                                onPress: () => {
                                  // Handle invitation logic
                                  // This could send SMS invites
                                  setIsModalVisible(false);
                                }
                              }
                            ]
                          );
                        }
                      }
                    } catch (error) {
                      console.error("Error in match process:", error);
                      Alert.alert('Error', 'Something went wrong');
                    } finally {
                      setLoading(false);
                    }
                  }}
                >
                  <Text style={modalStyles.matchButtonText}>Set Them Up</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
