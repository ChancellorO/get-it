import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { useState } from 'react';
import axios from 'axios';
import { style } from '@mui/system';
import { Input, ButtonGroup } from '@ui-kitten/components';
import { Button  } from '@ui-kitten/components';
import { useSelector } from 'react-redux';
import { selectAuth } from '@/features/authentication/authSlice';


export default function Home() {
    const { username } = useSelector(selectAuth);

    const handleLogin = async () => {
        try {
            const data = {
                "tag": ['Stocks', 'Economics', 'Real Estate']
            }
            const res = await axios.post('http://127.0.0.1:8000/grabReels/', data);
            console.log(res.data.result);
        }
        catch (e) {
          console.error(e);
        }
    }

    return (
    <SafeAreaView style={styles.container}>
        <Text style={{fontSize: 48, color: 'black'}} >Welcome{username}</Text>
        <Button onPress={handleLogin} size={'giant'} style={{width: '90%', backgroundColor: 'lightgray'}} status='basic'>
            Get Reels
        </Button>
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
});
