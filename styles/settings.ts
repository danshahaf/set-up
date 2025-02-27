import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';



export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 60,
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    backButton: {
        padding: 4,
        marginRight: 12,
    },
    title: {
        fontFamily: 'Nunito',
        fontSize: 32,
        fontWeight: '700',
        color: '#000000',
    },
    content: {
        flex: 1,
        paddingTop: 60,
    },
    section: {
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    sectionTitle: {
        fontFamily: 'Nunito',
        fontSize: 16,
        fontWeight: '700',
        color: '#666666',
        marginBottom: 16,
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    settingText: {
        fontFamily: 'Nunito',
        fontSize: 16,
        color: '#000000',
    },
    logoutButton: {
        marginTop: 32,
        marginHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#ff4444',
        borderRadius: 12,
        alignItems: 'center',
    },
    logoutText: {
        fontFamily: 'Nunito',
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
    },
}); 