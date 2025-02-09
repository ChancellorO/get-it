import React, { useState, useRef, useEffect } from "react";
import { 
    View, 
    Text, 
    SafeAreaView, 
    StyleSheet, 
    KeyboardAvoidingView, 
    Platform, 
    ScrollView, 
    TouchableWithoutFeedback, 
    Keyboard, 
    Animated, 
    TextInput,
    TouchableOpacity,
    Image
} from "react-native";
import { useRouter } from "expo-router"; // Correctly import useRouter
import { useFocusEffect } from "@react-navigation/native";
import axios from 'axios';

import Ionicons from 'react-native-vector-icons/Ionicons';

const maintags = ['Stocks', 'Real Estate', 'Economics', 'Tax'];

const tagIconMapping = {
  Stocks: 'stats-chart',
  'Real Estate': 'home',
  Economics: 'pie-chart',
  Tax: 'document-text',
};


export default function SignUp() {
    const [step, setStep] = useState(1);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [tags, setTags] = useState([]);

    const router = useRouter(); // Initialize router for navigation
    const progressAnim = useRef(new Animated.Value(0)).current;
    const inputRef = useRef(null);

    useEffect(() => {
        Animated.timing(progressAnim, {
            toValue: step - 1,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [step]);

    useFocusEffect(
        React.useCallback(() => {
            setTimeout(() => {
                if (inputRef.current) {
                    inputRef.current.focus();
                }
            }, 500);
        }, [step])
    );

    const progressWidth = progressAnim.interpolate({
        inputRange: [0, 3],
        outputRange: ["25%", "100%"], 
    });

    const handleSubmit = async() => {
      try {
        const data = {
            username,
            password,
            fname,
            lname,
            email,
            selectedTags

        }
        const res = await axios.post('http://127.0.0.1:8000/register/', data);
        console.log(res);
        router.replace('/(onboarding)/login')
    }
    catch (e) {
      console.error('here');
    }
    }

    const nextStep = () => {
        if (step < 6) setStep(step + 1);
        if (step == 6) {
          handleSubmit();
        }
    };

    const prevStep = () => {
        if (step > 1) {
            setStep(step - 1);
        } else {
            router.back(); // Navigate back using Expo Router
        }
    };

    const isNextEnabled = () => {
        if (step === 1) return username.trim() !== "";
        if (step === 2) return email.trim() !== "";
        if (step === 3) return fname.trim() !== "" && lname.trim() !== "";
        if (step === 4) return password.trim() !== "" && confirmPassword.trim() !== "";
        if (step === 5) return selectedTags.length > 0;
        if (step === 6) return true;
        return false;
    };

    const [selectedTags, setSelectedTags] = useState([]);

    // Toggle the selection of a tag
    const toggleTag = (tag) => {
      if (selectedTags.includes(tag)) {
        // Remove the tag if it's already selected
        setSelectedTags((prev) => prev.filter((item) => item !== tag));
      } else {
        // Add the tag if it's not selected
        setSelectedTags((prev) => [...prev, tag]);
      }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"} 
                style={styles.keyboardAvoidingContainer}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <ScrollView contentContainerStyle={styles.scrollView} keyboardShouldPersistTaps="handled">
                        
                        {/* Floating Header */}
                        <View style={styles.header}>
                            <TouchableOpacity onPress={prevStep} style={styles.backButton}>
                                <Text style={styles.backArrow}>←</Text>
                            </TouchableOpacity>
                            <Text style={styles.headerTitle}>Sign Up</Text>
                        </View>

                        {/* Progress Bar */}
                        <View style={styles.progressBarContainer}>
                            <Animated.View style={[styles.progressBar, { width: progressWidth }]} />
                        </View>

                        {/* Multi-Step Form */}
                        {step === 1 && (
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Username</Text>
                                <TextInput
                                    ref={inputRef}
                                    placeholder="User Name"
                                    value={username}
                                    onChangeText={setUsername}
                                    style={styles.input}
                                    autoFocus
                                />
                            </View>
                        )}

                        {step === 2 && (
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Email</Text>
                                <TextInput
                                    ref={inputRef}
                                    placeholder="Email"
                                    value={email}
                                    onChangeText={setEmail}
                                    style={styles.input}
                                    keyboardType="email-address"
                                />
                            </View>
                        )}

                        {step === 3 && (
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>What is your name?</Text>
                                <TextInput
                                    ref={inputRef}
                                    placeholder="First Name"
                                    value={fname}
                                    onChangeText={setFname}
                                    style={styles.input}
                                />
                                <TextInput
                                    placeholder="Last Name"
                                    value={lname}
                                    onChangeText={setLname}
                                    style={styles.input}
                                />
                            </View>
                        )}

                        {step === 4 && (
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Set up your password</Text>
                                <TextInput
                                    ref={inputRef}
                                    placeholder="Password"
                                    value={password}
                                    onChangeText={setPassword}
                                    style={styles.input}
                                    secureTextEntry
                                />
                                <TextInput
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    style={styles.input}
                                    secureTextEntry
                                />
                            </View>
                        )}
                        {step === 5 && (
                                <View style={styles.multiTagScrollView}>
                                <Text style={styles.multiTagTitle}>Select Tags</Text>
                                {maintags.map((tag, index) => {
                                  const isSelected = selectedTags.includes(tag);
                                  return (
                                    <TouchableOpacity
                                      key={index}
                                      style={[
                                        styles.multiTagButton,
                                        isSelected ? styles.multiTagSelected : styles.multiTagNotSelected,
                                      ]}
                                      onPress={() => toggleTag(tag)}
                                      activeOpacity={0.7} // Visual feedback when touched
                                    >
                                      <View style={styles.multiTagContent}>
                                        <Ionicons
                                          name={tagIconMapping[tag]}
                                          size={24}
                                          color={isSelected ? 'white' : '#007AFF'}
                                          style={styles.multiTagIcon}
                                        />
                                        <Text
                                          style={[
                                            styles.multiTagText,
                                            isSelected ? styles.multiTagSelectedText : styles.multiTagNotSelectedText,
                                          ]}
                                        >
                                          {tag}
                                        </Text>
                                      </View>
                                    </TouchableOpacity>
                                  );
                                })}
                              </View>
                        )}
                         {step === 6 && (
                           <View style={[styles.multiTagScrollView, {justifyContent: 'center', alignItems: 'center', width: '90%', rowGap: 10}]}>
                             <Image source={{ uri: '../../../assets/images/image_landing.png'}} style={{width: '100%'}} />
                             <Text style={[styles.label, {textAlign: 'center', fontSize: 28}]}>Welcome, {username}!</Text>
                             <Text style={{textAlign: 'center', fontSize: 18}}>Based on your choice, we curated contents by certified experts.</Text>
                           </View>
                          )}
                    </ScrollView>
                </TouchableWithoutFeedback>

                {/* Navigation Button (Positioned Above Keyboard) */}
                <TouchableOpacity 
                    onPress={nextStep} 
                    disabled={!isNextEnabled()}
                    style={[
                        styles.nextButton, 
                        { backgroundColor: isNextEnabled() ? "#007AFF" : "#D3D3D3" }
                    ]}
                >
                    <Text style={styles.nextButtonText}>Next →</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
    },
    keyboardAvoidingContainer: {
        flex: 1,
        justifyContent: "flex-end",
    },
    scrollView: {
        flex: 1,
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 20,
    },
    header: {
        position: "absolute",
        top: 50,
        left: 0,
        right: 0,
        backgroundColor: "white",
        paddingVertical: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E5E5",
    },
    backButton: {
        position: "absolute",
        left: 15,
    },
    backArrow: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#000",
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    progressBarContainer: {
        width: "80%",
        height: 5,
        backgroundColor: "#D3D3D3",
        borderRadius: 5,
        overflow: "hidden",
        marginTop: 80,
        marginBottom: 20,
    },
    progressBar: {
        height: 5,
        backgroundColor: "#007AFF",
    },
    inputContainer: {
        width: "90%",
        gap: 15,
    },
    label: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    input: {
        borderRadius: 8,
        backgroundColor: "#FFF",
        padding: 12,
        fontSize: 16,
        borderColor: "#D3D3D3",
        borderWidth: 1,
    },
    nextButton: {
        width: "100%",
        paddingVertical: 15,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: Platform.OS === "ios" ? 20 : 0, 
    },
    nextButtonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#FFF",
    },
    multiTagScrollView: {
      width: 1000,
      flexGrow: 1,
      paddingVertical: 20,
      alignItems: 'center',
    },
    multiTagTitle: {
      fontSize: 24,
      marginBottom: 20,
    },
    multiTagButton: {         // 90% width
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderRadius: 8,
      marginVertical: 10,
      borderWidth: 2,
      width: 200,
      borderColor: '#007AFF',
    },
    multiTagContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    multiTagIcon: {
      marginRight: 10,
    },
    multiTagText: {
      fontSize: 18,
    },
    multiTagSelected: {
      backgroundColor: '#007AFF',
    },
    multiTagNotSelected: {
      backgroundColor: 'white',
    },
    multiTagSelectedText: {
      color: 'white',
      fontWeight: 'bold',
    },
    multiTagNotSelectedText: {
      color: '#007AFF',
    },
});