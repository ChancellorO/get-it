import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/features/authentication/authSlice';
import { selectAuth } from '@/features/authentication/authSlice';
import { router } from 'expo-router';

export default function Profile() {
    const dispatch = useDispatch();
    const { username, email, fname, lname } = useSelector(selectAuth);
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState({
        username: username,
        email: email,
        fname: fname,
        lname: lname,
    });

    const handleLogout = () => {
        dispatch(logout());
        router.replace('/(onboarding)/login');
    }

    const submitChanges = async () => {
        try {
            const res = await axios.post('http://127.0.0.1:8000/submitChanges/', user);
            console.log(res.data);
        }
        catch (e) {
            console.error(e);
        }
    }

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
            {/* Profile Header */}
            <View style={styles.headerContainer}>
                <Text style={styles.title}>Get It.</Text>
                <Text style={styles.subtitle}>Profile</Text>
            </View>

            {/* User Details Card */}
            <View style={styles.card}>
                <ProfileField label="User Name" value={user.username} onChange={(val) => handleInputChange("username", val)} isEditing={isEditing} />
                <ProfileField label="Email" value={user.email} onChange={(val) => handleInputChange("email", val)} isEditing={isEditing} />
                <ProfileField label="First Name" value={user.fname} onChange={(val) => handleInputChange("fname", val)} isEditing={isEditing} />
                <ProfileField label="Last Name" value={user.lname} onChange={(val) => handleInputChange("lname", val)} isEditing={isEditing} />
            </View>

            {/* Edit Button */}
            <TouchableOpacity 
                style={styles.button} 
                onPress={handleEdit}
                activeOpacity={0.8} // Adds smooth click effect
            >
                <Text style={styles.buttonText}>{isEditing ? 'Save' : 'Edit'}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.button} 
                onPress={handleLogout}
                activeOpacity={0.8} // Adds smooth click effect
            >
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

// Profile Field Component (Switches between Text and TextInput)
const ProfileField = ({ label, value, onChange, isEditing }) => (
    <View style={styles.infoContainer}>
        <Text style={styles.label}>{label}</Text>
        {isEditing ? (
            <TextInput 
                style={styles.input} 
                value={value} 
                onChangeText={onChange} 
            />
        ) : (
            <Text style={styles.infoText}>{value}</Text>
        )}
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
    input: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        borderRadius: 5,
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