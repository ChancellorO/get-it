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
} from "react-native";
import { Input, Button } from "@ui-kitten/components";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";

export default function SignUp() {
    const [step, setStep] = useState(1);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const router = useRouter();
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
        inputRange: [0, 4],
        outputRange: ["20%", "100%"], 
    });

    const nextStep = () => {
        if (step < 5) setStep(step + 1);
        else {
            alert("Signup Successful! Redirecting...");
            router.replace("/login");
        }
    };

    const prevStep = () => {
        if (step > 1) {
            setStep(step - 1);
        } else {
            router.replace("/login");
        }
    };

    const isNextEnabled = () => {
        if (step === 1) return username.trim() !== "";
        if (step === 2) return email.trim() !== "";
        if (step === 3) return fname.trim() !== "" && lname.trim() !== "";
        if (step === 4) return password.trim() !== "" && confirmPassword.trim() !== "";
        return true;
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Dismiss Keyboard when tapping outside */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <KeyboardAvoidingView 
                    behavior={Platform.OS === "ios" ? "padding" : "height"} 
                    style={styles.keyboardAvoidingContainer}
                >
                    <ScrollView contentContainerStyle={styles.scrollView} keyboardShouldPersistTaps="handled">
                        
                        {/* Floating Header */}
                        <View style={styles.header}>
                            <Button appearance="ghost" onPress={prevStep} style={styles.backButton}>
                                ←
                            </Button>
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
                                <Input
                                    ref={inputRef}
                                    placeholder="User Name"
                                    value={username}
                                    onChangeText={setUsername}
                                    style={styles.input}
                                    label="User Name"
                                    size="large"
                                />
                            </View>
                        )}

                        {step === 2 && (
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Email</Text>
                                <Input
                                    ref={inputRef}
                                    placeholder="Email"
                                    value={email}
                                    onChangeText={setEmail}
                                    style={styles.input}
                                    label="Email"
                                    size="large"
                                    keyboardType="email-address"
                                />
                            </View>
                        )}

                        {step === 3 && (
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>What is your name?</Text>
                                <Input
                                    ref={inputRef}
                                    placeholder="First Name"
                                    value={fname}
                                    onChangeText={setFname}
                                    style={styles.input}
                                    label="First Name"
                                    size="large"
                                />
                                <Input
                                    placeholder="Last Name"
                                    value={lname}
                                    onChangeText={setLname}
                                    style={styles.input}
                                    label="Last Name"
                                    size="large"
                                />
                            </View>
                        )}

                        {step === 4 && (
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Set up your password</Text>
                                <Input
                                    ref={inputRef}
                                    placeholder="Password"
                                    value={password}
                                    onChangeText={setPassword}
                                    style={styles.input}
                                    label="Password"
                                    size="large"
                                    secureTextEntry
                                />
                                <Input
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    style={styles.input}
                                    label="Confirm Password"
                                    size="large"
                                    secureTextEntry
                                />
                            </View>
                        )}

                        {/* Step 5: Confirmation Screen */}
                        {step === 5 && (
                            <View style={styles.inputContainer}>
                                <Text style={styles.confirmTitle}>Confirm your information.</Text>

                                <Text style={styles.label}>User Name</Text>
                                <Text style={styles.confirmText}>{username}</Text>

                                <Text style={styles.label}>Email</Text>
                                <Text style={styles.confirmText}>{email}</Text>

                                <Text style={styles.label}>First Name</Text>
                                <Text style={styles.confirmText}>{fname}</Text>

                                <Text style={styles.label}>Last Name</Text>
                                <Text style={styles.confirmText}>{lname}</Text>

                                <Text style={styles.label}>Password</Text>
                                <Text style={styles.confirmText}>{"●".repeat(password.length)}</Text>
                            </View>
                        )}

                    </ScrollView>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>

            {/* Navigation Button */}
            <Button 
                onPress={nextStep} 
                style={[styles.nextButton, isNextEnabled() ? styles.activeNextButton : styles.disabledNextButton]}
                size="giant"
                disabled={!isNextEnabled()}
            >
                {step === 5 ? "Submit" : "Next →"}
            </Button>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF", // White background to match UI
    },
    keyboardAvoidingContainer: {
        flex: 1,
    },
    scrollView: {
        flexGrow: 1,
        paddingVertical: 20,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E5E5",
        backgroundColor: "#FFFFFF",
    },
    backButton: {
        position: "absolute",
        left: 10,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        flex: 1, // Centers title correctly
    },
    progressBarContainer: {
        width: "100%",
        height: 3, // Thinner progress bar
        backgroundColor: "#E0E0E0",
        marginTop: 5,
    },
    progressBar: {
        height: 3,
        backgroundColor: "#007AFF",
    },
    inputContainer: {
        width: "90%",
        alignSelf: "center",
        marginVertical: 10, // Adjust spacing
    },
    input: {
        borderRadius: 5, // Reduce roundness
        borderWidth: 1,
        borderColor: "#D3D3D3",
        backgroundColor: "#FFF",
        padding: 12,
        fontSize: 16,
    },
    confirmTitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 15,
    },
    confirmText: {
        fontSize: 16,
        fontWeight: "500",
        marginBottom: 10,
    },
    nextButton: {
        width: "100%",
        paddingVertical: 15,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 0,
    },
    activeNextButton: {
        backgroundColor: "#007AFF",
    },
    disabledNextButton: {
        backgroundColor: "#D3D3D3",
    },
});
