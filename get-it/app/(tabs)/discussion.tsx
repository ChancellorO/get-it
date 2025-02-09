import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const DiscussionScreen = () => {
    const [message, setMessage] = useState('');

    return (
        <SafeAreaView style={styles.container}>
            {/* "Get It." Header */}
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Get It.</Text>
            </View>

            {/* Chat Section */}
            <View style={styles.chatContainer}>
                <View style={styles.chatIcon}>
                    <Ionicons name="chatbubble-ellipses-outline" size={40} color="gray" />
                </View>
                <Text style={styles.chatTitle}>Let's Chat!</Text>
                <Text style={styles.chatSubtitle}>Based on your reels and discussions.</Text>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Get Prompted by Bot</Text>
                </TouchableOpacity>
            </View>

            {/* Message Input */}
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardAvoidingView}>
                <View style={styles.messageInputContainer}>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Send message..." 
                        value={message} 
                        onChangeText={setMessage}
                        editable={true}
                    />
                    <TouchableOpacity>
                        <Ionicons name="send" size={24} color="gray" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>

            {/* Bottom Navigation */}
            <BottomNav active="discussion" />
        </SafeAreaView>
    );
};

// Bottom Navigation Component
const BottomNav = ({ active }) => (
    <View style={styles.bottomNav}>
        <TouchableOpacity><Ionicons name="home-outline" size={24} color={active === "home" ? "black" : "gray"} /></TouchableOpacity>
        <TouchableOpacity><Ionicons name="chatbubble" size={24} color={active === "discussion" ? "black" : "gray"} /></TouchableOpacity>
        <TouchableOpacity><Ionicons name="person-outline" size={24} color="gray" /></TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'space-between',
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 20,
        marginTop: Platform.OS === 'ios' ? 50 : 20, // Adjust for iPhones
    },
    headerText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#0A84FF',
    },
    chatContainer: {
        alignItems: 'center',
        marginTop: 50,
    },
    chatIcon: {
        width: 60,
        height: 60,
        backgroundColor: '#eee',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chatTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 10,
    },
    chatSubtitle: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 20,
    },
    button: {
        backgroundColor: 'black',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    keyboardAvoidingView: {
        width: '100%',
    },
    messageInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        paddingHorizontal: 12,
        borderRadius: 20,
        margin: 16,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    input: {
        flex: 1,
        paddingVertical: 10,
        fontSize: 16,
        color: 'gray',
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
});

export default DiscussionScreen;
