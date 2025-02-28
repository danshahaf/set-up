import { StyleSheet } from 'react-native';

export const modalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  whiteOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.55)',
  },
  content: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalHeader: {
    marginBottom: 30,
  },
  modalTitle: {
    fontFamily: 'Nunito',
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
  },
  contactsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
  },
  contactBox: {
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  contactBoxGradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  contactBoxContent: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  plusIcon: {
    marginBottom: 8,
  },
  contactBoxText: {
    fontFamily: 'Nunito',
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 30,
    width: '100%',
    maxWidth: 300,
  },
  matchButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  matchButtonContent: {
    padding: 16,
    alignItems: 'center',
  },
  matchButtonText: {
    fontFamily: 'Nunito',
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  contactImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
}); 