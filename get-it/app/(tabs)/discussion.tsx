import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  StyleSheet, 
  Platform, 
  KeyboardAvoidingView, 
  ScrollView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs(true)

const DiscussionScreen = () => {
  // Text input state for the current message
  const [message, setMessage] = useState('');
  // Messages array holds all chat bubbles (both user and bot)
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Hi! How can I help you today?' }
  ]);

  const handleSend = async () => {
    if (message.trim() !== '') {
      // Add the user's message
      const userMessage = { id: Date.now(), sender: 'user', text: message.trim() };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setMessage('');

      // Add a hard-coded bot response after a delay (simulate an API call)
      try {
        const res = await axios.post('http://127.0.0.1:8000/AskGPT/', {"user_input": userMessage["text"]});
        // console.log(res);
        // setTimeout(() => {
          const botResponse = { id: Date.now(), sender: 'bot', text: res.data.result };
          setMessages((prevMessages) => [...prevMessages, botResponse ]);
      // }, 3000); // 3 seconds timeout
      }
      catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Discussion</Text>
        <TouchableOpacity style={styles.menuIcon}>
          <Ionicons name="ellipsis-vertical" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Chat Messages & Input Area */}
      <View style={styles.chatAndInputContainer}>
        {/* Chat Messages */}
        <View style={styles.chatContainer}>
          <ScrollView contentContainerStyle={styles.messagesContainer}>
            {messages.map((msg) => (
              <View
                key={msg.id}
                style={[
                  styles.chatBubble,
                  msg.sender === 'user' ? styles.userBubble : styles.botBubble,
                ]}
              >
                <Text
                  style={[
                    styles.chatText,
                    msg.sender === 'user' ? styles.userText : styles.botText,
                  ]}
                >
                  {msg.text}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Message Input */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}
        >
          <View style={styles.messageInputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Send message"
              value={message}
              onChangeText={setMessage}
              editable={true}
            />
            <TouchableOpacity onPress={handleSend}>
              <Ionicons name="send" size={24} color="gray" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity>
          <Ionicons name="home-outline" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="search-outline" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="videocam-outline" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="chatbubble-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="person-outline" size={24} color="gray" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    right: 16, // Keeps the menu button on the right
  },
  chatAndInputContainer: {
    flex: 1,
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  messagesContainer: {
    paddingBottom: 16,
  },
  chatBubble: {
    maxWidth: '70%',
    padding: 10,
    borderRadius: 16,
    marginVertical: 4,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
  },
  botBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#eee',
  },
  chatText: {
    fontSize: 16,
  },
  userText: {
    color: 'white',
  },
  botText: {
    color: 'black',
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
