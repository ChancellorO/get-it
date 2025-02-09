import { Text, SafeAreaView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectAuth } from '@/features/authentication/authSlice';
import VideoSwiper from '@/components/VideoSwiper';


export default function Reels() {
    const [selectedTab, setSelectedTab] = useState('Chosen for you');
    const { username, tags } = useSelector(selectAuth);
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
                if ( selectedTab == 'Chosen for you' ) {
                    const data = {
                        "tag": tags
                    }
                    const res = await axios.post('http://127.0.0.1:8000/grabReelsRecommendation/', data);
                    console.log(res.data.result);
                    setReels(res.data.result);
                } else {
                    const res = await axios.post('http://127.0.0.1:8000/grabReels/');
                    console.log(res.data.result);
                    setReels(res.data.result);
                }
            }
            catch (e) {
            setReels([]);
            console.error(e);
            }
        }
        getReels();
    }, [selectedTab]) 

    return (
        <SafeAreaView style={styles.container}>
                {/* Header Section */}
                <View style={styles.headerContainer}>
                <Text style={styles.title}>Get It.</Text>
                <Text style={styles.subtitle}>Reels</Text>
            </View>

                {/* Tabs Section */}
                <View style={styles.tabs}>
                    {['Chosen for you', 'New'].map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            style={selectedTab === tab ? styles.activeTab : styles.inactiveTab}
                            onPress={() => setSelectedTab(tab)}
                        >
                            <Text style={selectedTab === tab ? styles.activeTabText : styles.inactiveTabText}>
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <VideoSwiper videos={reels}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        paddingVertical: 15,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
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
    tabs: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    activeTab: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderBottomWidth: 2,
        borderBottomColor: 'black',
    },
    inactiveTab: {
        paddingHorizontal: 15,
        paddingVertical: 8,
    },
    activeTabText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black',
    },
    inactiveTabText: {
        fontSize: 14,
        color: '#777',
    },
    reelsContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    reelsText: {
        fontSize: 16,
        color: '#555',
    },
});