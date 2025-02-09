import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { selectAuth } from '@/features/authentication/authSlice';
import { Ionicons } from '@expo/vector-icons';

export default function Profile() {
    const { username, email, fname, lname } = useSelector(selectAuth);
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState({
        username: username,
        email: email,
        fname: fname,
        lname: lname,
    });

    const submitChanges = async () => {
        try {
            console.log("Submitting Changes:", user);
            // Simulate API call
            alert("Profile Updated!");
        } catch (e) {
            console.error(e);
        }
    };

    const handleEdit = () => {
        if (isEditing) {
            submitChanges();
        }
        setIsEditing(!isEditing);
    };

    const handleInputChange = (field, value) => {
        setUser({ ...user, [field]: value });
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* "Get It." Header */}
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Get It.</Text>
            </View>

            {/* Profile Details Card */}
            <View style={styles.profileCard}>
                <Text style={styles.profileTitle}>Profile</Text>
                <ProfileField label="Username" value={user.username} onChange={(val) => handleInputChange("username", val)} isEditing={isEditing} />
                <ProfileField label="Email" value={user.email} onChange={(val) => handleInputChange("email", val)} isEditing={isEditing} />
                <ProfileField label="First Name" value={user.fname} onChange={(val) => handleInputChange("fname", val)} isEditing={isEditing} />
                <ProfileField label="Last Name" value={user.lname} onChange={(val) => handleInputChange("lname", val)} isEditing={isEditing} />

                {/* Edit Button */}
                <TouchableOpacity style={styles.button} onPress={handleEdit} activeOpacity={0.8}>
                    <Text style={styles.buttonText}>{isEditing ? 'Save' : 'Edit Profile'}</Text>
                </TouchableOpacity>
            </View>

            
        </SafeAreaView>
    );
}

// Profile Field Component (Editable Text Input)
const ProfileField = ({ label, value, onChange, isEditing }) => (
    <View style={styles.fieldContainer}>
        <Text style={styles.label}>{label}</Text>
        {isEditing ? (
            <TextInput style={styles.input} value={value} onChangeText={onChange} />
        ) : (
            <Text style={styles.infoText}>{value}</Text>
        )}
    </View>
);

// Bottom Navigation Component
const BottomNav = ({ active }) => (
    <View style={styles.bottomNav}>
        <TouchableOpacity><Ionicons name="home-outline" size={24} color={active === "home" ? "black" : "gray"} /></TouchableOpacity>
        <TouchableOpacity><Ionicons name="chatbubble-outline" size={24} color="gray" /></TouchableOpacity>
        <TouchableOpacity><Ionicons name="person" size={24} color={active === "profile" ? "black" : "gray"} /></TouchableOpacity>
    </View>
);

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#0A84FF',
    },
    profileCard: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
        marginBottom: 20,
    },
    profileTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 15,
    },
    fieldContainer: {
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
    input: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        backgroundColor: '#F5F5F5',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        padding: 8,
        borderRadius: 5,
    },
    button: {
        marginTop: 10,
        backgroundColor: '#0A84FF',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
});

