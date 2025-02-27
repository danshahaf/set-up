import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');
const photoSize = (width - 50) / 2; // Account for padding and gap

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  topSection: {
    alignItems: 'flex-start',
    marginTop: 60,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    width: '100%',
    justifyContent: 'space-between',
  },
  name: {
    fontFamily: 'Nunito',
    fontSize: 32,
    color: '#000000',
    fontWeight: '700',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  editButton: {
    padding: 4,
  },
  bio: {
    fontFamily: 'Nunito',
    fontSize: 16,
    color: '#666666',
    maxWidth: '90%',
    marginBottom: 16,
  },
  infoSection: {
    marginTop: 0,
    width: '100%',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoItem: {
    flex: 1,
    marginRight: 15,
  },
  infoLabel: {
    fontFamily: 'Nunito',
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  infoValue: {
    fontFamily: 'Nunito',
    fontSize: 16,
    color: '#000000',
    fontWeight: '600',
  },
  photoSection: {
    width: '100%',
  },
  photoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  photo: {
    width: photoSize,
    height: photoSize,
    borderRadius: 12,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 10,
  },
  statWidget: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontFamily: 'Nunito',
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Nunito',
    fontSize: 12,
    color: '#000000',
    textAlign: 'center',
  },
}); 