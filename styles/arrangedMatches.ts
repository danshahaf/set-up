import { StyleSheet } from 'react-native';

export const arrangedMatchesStyles = StyleSheet.create({
  // Ticket styles
  ticketContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  dateText: {
    fontFamily: 'Nunito',
    fontSize: 14,
    color: '#666666',
  },
  statusTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontFamily: 'Nunito',
    fontSize: 12,
    fontWeight: '600',
    color: '#000000',
  },
  pendingText: {
    color: '#666666',
  },
  matchedPeopleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
  },
  personContainer: {
    flex: 1,
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  matchConnector: {
    paddingHorizontal: 20,
  },
  personName: {
    fontFamily: 'Nunito',
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    maxWidth: '90%',
  },

  // Loading state
  loadingText: {
    fontFamily: 'Nunito',
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginTop: 20,
  },
}); 