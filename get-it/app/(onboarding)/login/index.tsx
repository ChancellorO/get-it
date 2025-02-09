import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { useState } from 'react';
import axios from 'axios';
import { style } from '@mui/system';
import { Input, ButtonGroup } from '@ui-kitten/components';
import { Button  } from '@ui-kitten/components';
import { router } from "expo-router";
import { useDispatch } from 'react-redux';
import { login } from '@/features/authentication/authSlice';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const dispatch = useDispatch();

    const NavigateToRegister = () => {
        console.log('hello');
        router.replace('/register');
    }

    const NavigateToGetHelp = () => {
        router.navigate('/register');
    }

    const handleLogin = async () => {
        try {
            const data = {
                username,
                password,
            }
            const res = await axios.post('http://127.0.0.1:8000/login/', data);
            dispatch(login(res.data.result[0]));
            router.replace('/(tabs)');
        }
        catch (e) {
          setError("User Doesn't exist or Password is Incorrect")
          console.error(e);
        }
    }

    return (
    <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
            <Text style={styles.title}>Get It.</Text>
        </View>
        <Input
            placeholder='Username'
            value={username}
            onChangeText={nextValue => setUsername(nextValue)}
            style={{width: '90%'}}
            label='Username'
            size='large'
        />
        <Input
            placeholder='Password'
            value={password}
            onChangeText={nextValue => setPassword(nextValue)}
            style={{width: '90%'}}
            label='Password'
            size='large'
            secureTextEntry
            
        /> 
        { error ? 
            <Text style={{color: 'red'}}>{error}</Text>
        : 
            <></>}
        <Button onPress={handleLogin} size={'giant'} style={{width: '90%', backgroundColor: 'lightgray'}} status='basic'>
            Login
        </Button>
        <ButtonGroup
        size='giant'
        >
            <Button onPress={NavigateToRegister}>
        Signup
            </Button>
            <Button onPress={NavigateToGetHelp}>
        Get Help
            </Button>
        </ButtonGroup>
    </SafeAreaView>
    );
}




const styles = StyleSheet.create({
  header: {
    color: 'black',
    fontSize: 28,
  },
  inputfield: {
    height: 40,
    width: 300,
    paddingLeft: 10,
    backgroundColor: '#A9A9A9',
    fontSize: 18,
  },
  inputwrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 61,
    width: 331,
    borderRadius: 55,
    paddingLeft: 10,
    backgroundColor: '#A9A9A9',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    rowGap: 20,
    marginTop: 100
  },
  buttonShape: {
      backgroundColor: '#333333',
      borderRadius: 40,
      width: 331,
      height: 82,
      justifyContent: 'center',
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
      fontSize: 29,
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
});
