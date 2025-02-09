import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectAuth } from '@/features/authentication/authSlice';

export default function Register() {
    const { username: storedUsername } = useSelector(selectAuth);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [tags, setTags] = useState([]);

    const handleRegister = async () => {
        try {
            const data = {
                username,
                password,
                fname,
                lname,
                email,
                tags
            };
            const res = await axios.post('http://127.0.0.1:8000/register/', data);
            console.log(res.data);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Welcome {storedUsername || 'Guest'}</Text>
            <View>
                <Text style={styles.label}>Username</Text>
                <TextInput
                    value={username}
                    onChangeText={setUsername}
                    style={styles.input}
                />
            </View>
            <View>
                <Text style={styles.label}>Password</Text>
                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={styles.input}
                />
            </View>
            <View>
                <Text style={styles.label}>First Name</Text>
                <TextInput
                    value={fname}
                    onChangeText={setFname}
                    style={styles.input}
                />
            </View>
            <View>
                <Text style={styles.label}>Last Name</Text>
                <TextInput
                    value={lname}
                    onChangeText={setLname}
                    style={styles.input}
                />
            </View>
            <View>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    keyboardType='email-address'
                    style={styles.input}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        rowGap: 20,
        marginTop: 100,
    },
    header: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'black',
    },
    label: {
        fontSize: 18,
        color: 'black',
        marginBottom: 5,
    },
    input: {
        height: 40,
        width: 300,
        paddingLeft: 10,
        backgroundColor: '#D3D3D3',
        fontSize: 16,
        borderRadius: 10,
    },
    button: {
        backgroundColor: '#333333',
        borderRadius: 30,
        width: 300,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 22,
    },
});
