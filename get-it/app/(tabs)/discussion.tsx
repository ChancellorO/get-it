import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const DiscussionScreen = () => {
    const [message, setMessage] = useState('');
    
    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Discussion</Text>
                <TouchableOpacity style={styles.menuIcon}>
                    <Ionicons name="ellipsis-vertical" size={24} color="black" />
                </TouchableOpacity>
            </View>
            
            {/* Chat Section */}
            <View style={styles.chatContainer}>
                <View style={styles.chatIcon}>
                    <Ionicons name="pause" size={40} color="gray" />
                </View>
                <Text style={styles.chatTitle}>Let's Chat!</Text>
                <Text style={styles.chatSubtitle}>Based on your reels..blah blah</Text>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Get Prompted by Bot</Text>
                </TouchableOpacity>
            </View>
            
            {/* Message Input */}
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardAvoidingView}>
                <View style={styles.messageInputContainer}>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Send message" 
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
            <View style={styles.bottomNav}>
                <TouchableOpacity><Ionicons name="home-outline" size={24} color="gray" /></TouchableOpacity>
                <TouchableOpacity><Ionicons name="search-outline" size={24} color="gray" /></TouchableOpacity>
                <TouchableOpacity><Ionicons name="videocam-outline" size={24} color="gray" /></TouchableOpacity>
                <TouchableOpacity><Ionicons name="chatbubble-outline" size={24} color="black" /></TouchableOpacity>
                <TouchableOpacity><Ionicons name="person-outline" size={24} color="gray" /></TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'space-between',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Platform.OS === 'ios' ? 50 : 20, // Adjust for iPhones
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        position: 'relative',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
    },
    menuIcon: {
        position: 'absolute',
        right: 16, // Ensures the menu button stays on the right
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
