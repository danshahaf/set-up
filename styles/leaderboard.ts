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
    leaderboardContainer: {
        paddingHorizontal: 20,
        marginBottom: 80,
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
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    matchCountContainer: {
        alignItems: 'center',
    },
    matchCount: {
        fontFamily: 'Nunito',
        fontSize: 18,
        fontWeight: '600',
        color: '#000000',
    },
    matchLabel: {
        fontFamily: 'Nunito',
        fontSize: 12,
        color: '#666666',
    },
    statsWidget: {
        position: 'absolute',
        bottom: 90,
        left: 20,
        right: 20,
        borderRadius: 150,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    statsContent: {
        paddingVertical: 16,
        paddingHorizontal: 40,
    },
    statsTitle: {
        fontFamily: 'Nunito',
        fontSize: 24,
        fontWeight: '700',
        color: '#000000',
        marginBottom: 16,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    statItem: {
        alignItems: 'center',
    },
    statValue: {
        fontFamily: 'Poppins',
        fontSize: 18,
        fontWeight: '700',
        color: '#000000',
        letterSpacing: 0.5,
    },
    statLabel: {
        fontFamily: 'Nunito',
        fontSize: 12,
        color: '#666666',
    },
}); 