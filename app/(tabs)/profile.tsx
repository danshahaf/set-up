import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import { useFonts } from 'expo-font';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { styles } from '@/styles/profile';

// supabase stuff
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function ProfileScreen() {
    // ---- profile info fetched from supahbase ----
    const [profile, setProfile] = useState<any>(null);
    const userId = "17140ef3-39f9-4fce-a127-067616d4871e"; // Hardcoded for now

    useEffect(() => {
        const fetchProfile = async () => {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();
            
        if (error) console.error(error);
        else setProfile(data);
        };
        
        fetchProfile();
    }, []);

    // ---- profile photos fetched from supabase ----
    const [photos, setPhotos] = useState<string[]>([]);

    useEffect(() => {
        const fetchPhotos = async () => {
            const imageUrls = await Promise.all(
                [1, 2, 3, 4].map(async (num) => {
                    const { data } = supabase
                        .storage
                        .from('user-images') // Change to your actual storage bucket name
                        .getPublicUrl(`${userId}/${num}.png`);
                    return data.publicUrl;
                })
            );
            setPhotos(imageUrls);
        };

        fetchPhotos();
    }, []);

    

  const router = useRouter();
  const [fontsLoaded] = useFonts({
    'Nunito': require('../../assets/fonts/Nunito-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{profile?.first_name} {profile?.last_name}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.editButton}>
              <IconSymbol name="pencil" size={20} color="#666666" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => router.push("../settings")}
            >
              <IconSymbol name="gearshape.fill" size={20} color="#666666" />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.bio}>
          {profile?.bio}
        </Text>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Height</Text>
            <Text style={styles.infoValue}>{profile?.height_feet}'{profile?.height_inches}"</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Age</Text>
            <Text style={styles.infoValue}>{profile?.age}</Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>School</Text>
            <Text style={styles.infoValue}>{profile?.school}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Occupation</Text>
            <Text style={styles.infoValue}>{profile?.occupation}</Text>
          </View>
        </View>
      </View>

      <View style={[styles.statsSection, { marginTop: 25 }]}>
        <LinearGradient
          colors={['#E0FFFF', '#B0E0E6']}
          style={styles.statWidget}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.statNumber}>24</Text>
          <Text style={styles.statLabel}>Matches Made</Text>
        </LinearGradient>
        <LinearGradient
          colors={['#E0FFF4', '#98FFE0']}
          style={styles.statWidget}
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 0 }}
        >
          <Text style={styles.statNumber}>86%</Text>
          <Text style={styles.statLabel}>Success Rate</Text>
        </LinearGradient>
        <LinearGradient
          colors={['#E6F3FF', '#B8D8FF']}
          style={styles.statWidget}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Been Matched</Text>
        </LinearGradient>
      </View>

      <View style={[styles.photoSection, { marginTop: 25 }]}>
        <View style={styles.photoRow}>
            {photos.slice(0, 2).map((uri, index) => (
            <Image key={index} source={{ uri }} style={styles.photo} />
            ))}
        </View>
        <View style={styles.photoRow}>
            {photos.slice(2, 4).map((uri, index) => (
            <Image key={index} source={{ uri }} style={styles.photo} />
            ))}
        </View>
      </View>

    </View>
  );
}

