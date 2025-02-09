
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';

export default function Search() {
    const [isEditing, setIsEditing] = useState(false);

    // Example user details (In real apps, fetch from API or database)
    const user = {
        username: "chance123",
        email: "chance@email.com",
        fname: "Chance",
        lname: "Chance",
    };

    const handleEdit = () => {
        setIsEditing(!isEditing);
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Profile Header */}
            <View style={styles.headerContainer}>
                <Text style={styles.title}>Get It.</Text>
                <Text style={styles.subtitle}>Profile</Text>
            </View>

            {/* User Details Card */}
            <View style={styles.card}>
                <ProfileField label="User Name" value={user.username} />
                <ProfileField label="Email" value={user.email} />
                <ProfileField label="First Name" value={user.fname} />
                <ProfileField label="Last Name" value={user.lname} />
            </View>

            {/* Edit Button */}
            <TouchableOpacity 
                style={styles.button} 
                onPress={handleEdit}
                activeOpacity={0.8} // Adds smooth click effect
            >
                <Text style={styles.buttonText}>{isEditing ? 'Save' : 'Edit'}</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

// Profile Field Component (Reusable)
const ProfileField = ({ label, value }) => (
    <View style={styles.infoContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.infoText}>{value}</Text>
    </View>
);

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#0A84FF',
    },
    subtitle: {
        fontSize: 20,
        color: 'black',
        fontWeight: '600',
        marginTop: 5,
    },
    card: {
        backgroundColor: '#F8F8F8',
        padding: 20,
        width: '90%',
        borderRadius: 12,
        elevation: 3, // Adds shadow on Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    infoContainer: {
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        paddingBottom: 5,
    },
    label: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 5,
    },
    infoText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    button: {
        marginTop: 20,
        backgroundColor: '#0A84FF',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        elevation: 2, // Slight shadow on Android
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
