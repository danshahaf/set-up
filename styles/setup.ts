import { StyleSheet } from 'react-native';

export const setupStyles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    backgroundColor: '#000000',
    borderRadius: 24,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1,
  },
  floatingButtonText: {
    fontFamily: 'Nunito',
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
  },
});