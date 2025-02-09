import { Text, SafeAreaView, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectAuth } from '@/features/authentication/authSlice';


export default function Reels() {
    const { username } = useSelector(selectAuth);
    const [reels, setReels] = useState([]);
    const [index, setIndex] = useState(0);

    const nextReel = () => {
        if (index + 1 == reels.length) {
            setIndex(0);
        } else {
            setIndex(index + 1);
        }
    }

    useEffect(() => {
        const getReels = async () => {
            try {
                const data = {
                    "tag": ['Stocks', 'Economics', 'Real Estate']
                }
                const res = await axios.post('http://127.0.0.1:8000/grabReels/', data);
                console.log(res.data.result);
                setReels(res.data.result);
            }
            catch (e) {
            console.error(e);
            }
        }
        getReels();
    }, []) 

    return (
    <SafeAreaView style={styles.container}>
        <Text style={{fontSize: 48, color: 'black'}} >Welcome{username}</Text>
        <Text>{reels}</Text>
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
