import { StyleSheet } from 'react-native';

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
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
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
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    emptyText: {
        fontFamily: 'Nunito',
        fontSize: 16,
        color: '#666666',
        textAlign: 'center',
    },
    ticketContainer: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 16,
    },
    ticketContent: {
        flex: 1,
        justifyContent: 'space-between',
    },
    ticketHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    dateText: {
        fontFamily: 'Nunito',
        fontSize: 14,
        color: '#666666',
    },
    matchName: {
        fontFamily: 'Nunito',
        fontSize: 18,
        fontWeight: '600',
        color: '#000000',
        flex: 1,
        marginRight: 8,
    },
    ticketBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    matcherName: {
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
    arrangedTicketContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    arrangedTicketHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
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
    arrangedProfileImage: {
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
}); 