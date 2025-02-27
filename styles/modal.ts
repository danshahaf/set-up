import { StyleSheet } from 'react-native';

export const modalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  modalHeader: {
    marginTop: 40,
    marginBottom: 40,
  },
  modalTitle: {
    fontFamily: 'Nunito',
    fontSize: 32,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
  },
  modalDescription: {
    fontFamily: 'Nunito',
    fontSize: 16,
    color: '#666666',
  },
  contactsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
    gap: 16,
  },
  contactBox: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
  },
  selectedContact: {
    alignItems: 'center',
    padding: 8,
  },
  contactText: {
    fontFamily: 'Nunito',
    fontSize: 14,
    color: '#666666',
    marginTop: 8,
    textAlign: 'center',
    maxWidth: '90%',
  },
  buttonContainer: {
    alignItems: 'center',
    gap: 16,
  },
  matchButton: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  matchButtonContent: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  matchButtonText: {
    fontFamily: 'Nunito',
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  anonymousText: {
    fontFamily: 'Nunito',
    fontSize: 14,
    color: '#666666',
    textDecorationLine: 'underline',
  },
}); 