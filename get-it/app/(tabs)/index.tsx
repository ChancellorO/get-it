import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { useState } from 'react';
import axios from 'axios';
import { style } from '@mui/system';

export default function Home() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [tags, setTags] = useState([]);

    const handleLogin = async () => {
        try {
            const data = {
                username,
                password,
                fname,
                lname,
                email,
                tags

            }
            const res = await axios.post('http://127.0.0.1:8000/register/', data);
            console.log(res);
        }
        catch (e) {
          console.error(e);
        }
    }

    return (
    <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.header}>Username</Text>
          <View style={styles.inputwrapper}>
              <TextInput
                  value={username}
                  onChangeText={setUsername}
                  style={styles.inputfield}
              />
          </View>
        </View>
        <View>
        <Text style={styles.header}>Password</Text>
          <View style={styles.inputwrapper}>
            <TextInput
                value={password}
                onChangeText={setPassword}
                style={styles.inputfield}
            />
          </View>        
        </View>
        <View>
          <Text style={styles.header}>First Name</Text>
          <View style={styles.inputwrapper}>
              <TextInput
                  value={fname}
                  onChangeText={setFname}
                  style={styles.inputfield}
              />
          </View>
        </View>
        <View>
        <Text style={styles.header}>Last Name</Text>
          <View style={styles.inputwrapper}>
            <TextInput
                value={lname}
                onChangeText={setLname}
                style={styles.inputfield}
            />
          </View>        
        </View> 
        <View>
          <Text style={styles.header}>Email</Text>
          <View style={styles.inputwrapper}>
              <TextInput
                  value={email}
                  onChangeText={setEmail}
                  style={styles.inputfield}
              />
          </View>
        </View>
        <TouchableOpacity style={styles.buttonShape} onPress={handleLogin}>
          <Text style={styles.buttonText}>
              Register
          </Text>
        </TouchableOpacity>   
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
    justifyContent: 'center',
    alignItems: 'center',
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
});


