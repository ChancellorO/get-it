import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const HandleLogin = async () => {
        try {
            const data = {
                username,
                password
            }
            const res = await axios.post('http://127.0.0.1:8000/login/', data);
            console.log(res);
        }
        catch (e) {
          console.error(e);
        }
    }

    return (
      <View >
          <TextInput
              value={password}
              onChangeText={setPassword}
          />
          <TextInput
              value={username}
              onChangeText={setUsername}
          />
  </View>
    );
}




