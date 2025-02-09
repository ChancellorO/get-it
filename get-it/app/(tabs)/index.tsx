import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, FlatList, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { selectAuth } from '@/features/authentication/authSlice';
import { Button } from '@ui-kitten/components';
import axios from 'axios';

export default function Home() {
    const { username } = useSelector(selectAuth);

    const handleLogin = async () => {
        try {
            const data = {
                "tag": ['Stocks', 'Economics', 'Real Estate']
            };
            const res = await axios.post('http://127.0.0.1:8000/grabReels/', data);
            console.log(res.data.result);
        }
        catch (e) {
            console.error(e);
        }
    };

    // Dummy data for a larger dataset to test RecyclerView behavior
    const dummyPosts = Array.from({ length: 20 }, (_, index) => ({
        id: index.toString(),
        name: ['John Smith', 'Alice Johnson', 'Michael Doe', 'Sophia Brown'][index % 4],
        category: ['Stocks', 'Economics', 'Real Estate', 'Finance'][index % 4],
        title: ['5 Minute Stocks Terminologies', 'Understanding Market Cycles', 'How to Get the Best Mortgage Rates', 'Investment Strategies for Beginners'][index % 4],
        likes: Math.floor(Math.random() * 100),
        comments: Math.floor(Math.random() * 50),
        image: '../../assets/images/1.png',
        videoThumbnail: `../../assets/images/1.png`
    }));

    const renderPost = ({ item, index }) => (
        <View style={styles.postCard}>
            <View style={styles.postHeader}>
                { index % 2 == 0 ?
                <Image source={require('../../assets/images/1.png')} style={styles.profilePic} />
                :
                <Image source={require('../../assets/images/3.png')} style={styles.profilePic} />
                }   
                <View>
                    <Text style={styles.postName}>{item.name} <Text style={styles.categoryTag}>{item.category}</Text></Text>
                    <Text style={styles.postTitle}>{item.title}</Text>
                </View>
            </View>
            <View style={styles.videoContainer}>
                { index % 2 == 0 ?
                    <Image source={require('../../assets/images/2.png')} style={styles.videoThumbnail} />
                    :
                    <Image source={require('../../assets/images/3.png')} style={styles.videoThumbnail} />
                }
                <Text style={styles.playButton}>▶</Text>
            </View>
            <View style={styles.postFooter}>
                <Text>💬 {item.comments}</Text>
                <Text>❤️ {item.likes}</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* "Get It." Header */}
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Get It.</Text>
            </View>

            {/* New Discussion Section */}
            <View style={styles.card}>
                <TouchableOpacity style={styles.option}>
                    <Text style={styles.optionTitle}>🏡 Real Estate</Text>
                    <Text style={styles.optionDescription}>Rental, Mortgage, Property Tax..</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.option}>
                    <Text style={styles.optionTitle}>🌍 Lifestyle</Text>
                    <Text style={styles.optionDescription}>Minimalism, Remote Work, Wellness..</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.option}>
                    <Text style={styles.optionTitle}>📈 Stocks</Text>
                    <Text style={styles.optionDescription}>Dividends, IPO, Volatility..</Text>
                </TouchableOpacity>
            </View>

            {/* Recommendations Section */}
            <View style={styles.recommendationCard}>
                <Text style={styles.recommendationsHeader}>Recommendations</Text>
                <Text style={styles.subHeader}>Based on your choices and recent views</Text>

                {/* Optimized FlatList for RecyclerView-like behavior */}
                <FlatList
                    data={dummyPosts}
                    keyExtractor={item => item.id}
                    renderItem={renderPost}
                    contentContainerStyle={styles.listContainer}
                    initialNumToRender={5} // Load first 5 items
                    maxToRenderPerBatch={5} // Load items in batches of 5
                    windowSize={10} // Keep only 10 items in memory
                    removeClippedSubviews={true} // Unmounts off-screen items
                />
            </View>

            <Button size="giant" style={styles.getMoreButton} status="basic">
                Get More Recommendations
            </Button>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white', // White background for the whole screen
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#0A84FF',
    },
    card: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 15,
        width: '100%',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        marginBottom: 15,
        elevation: 3, // Extra shadow for Android
    },
    recommendationCard: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 15,
        width: '100%',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
        marginBottom: 15,
    },
    option: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    optionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    optionDescription: {
        fontSize: 14,
        color: '#808080',
    },
    recommendationsHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 5,
    },
    subHeader: {
        fontSize: 14,
        color: '#808080',
        marginBottom: 10,
    },
    listContainer: {
        paddingBottom: 20,
    },
    postCard: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    profilePic: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    postName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    categoryTag: {
        fontSize: 14,
        color: 'white',
        backgroundColor: '#333',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 5,
        marginLeft: 5,
    },
    postTitle: {
        fontSize: 14,
        color: '#555',
    },
    videoContainer: {
        position: 'relative',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 10,
        backgroundColor: '#E0E0E0',
        alignItems: 'center',
        justifyContent: 'center',
        height: 150,
    },
    videoThumbnail: {
        width: '100%',
        height: 150,
        borderRadius: 10,
    },
    playButton: {
        position: 'absolute',
        top: '35%',
        left: '43%',
        transform: [{ translateX: -10 }, { translateY: -10 }],
        fontSize: 30,
        color: 'white',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
    postFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    getMoreButton: {
        width: '100%',
        backgroundColor: 'lightgray',
        marginTop: 10,
    },
});
