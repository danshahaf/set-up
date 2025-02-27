import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');
const photoSize = (width - 50) / 2; // Account for padding and gap

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    titleContainer: {
        paddingHorizontal: 20,
        paddingTop: 60,
        marginBottom: 20,
    },
    title: {
        fontFamily: 'Nunito',
        fontSize: 32,
        fontWeight: '700',
        color: '#000000',
    },
    filterContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        gap: 12,
        marginBottom: 24,
    },
    filterButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
    },
    filterButtonActive: {
        backgroundColor: '#000000',
    },
    filterText: {
        fontFamily: 'Nunito',
        fontSize: 14,
        color: '#666666',
    },
    filterTextActive: {
        color: '#ffffff',
    },
    leaderboardContainer: {
        paddingHorizontal: 20,
    },
    leaderboardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    rankingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    rankingNumber: {
        fontFamily: 'Nunito',
        fontSize: 16,
        fontWeight: '700',
        width: 30,
        color: '#666666',
    },
    rankingName: {
        fontFamily: 'Nunito',
        fontSize: 16,
        color: '#000000',
        marginLeft: 12,
    },
    rankingScore: {
        fontFamily: 'Nunito',
        fontSize: 16,
        fontWeight: '600',
        color: '#000000',
    },
}); 