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

    const dummyPosts = [
        { 
            id: '1', 
            name: 'John Smith', 
            category: 'Stocks', 
            title: '5 Minute Stocks Terminologies', 
            likes: 10, 
            comments: 40, 
            image: 'https://via.placeholder.com/50',
            videoThumbnail: 'https://via.placeholder.com/300x150/808080/FFFFFF?text=Stocks+101'
        },
        { 
            id: '2', 
            name: 'Alice Johnson', 
            category: 'Economics', 
            title: 'Understanding Market Cycles', 
            likes: 25, 
            comments: 15, 
            image: 'https://via.placeholder.com/50',
            videoThumbnail: 'https://via.placeholder.com/300x150/808080/FFFFFF?text=Economics+Basics'
        },
        { 
            id: '3', 
            name: 'Michael Doe', 
            category: 'Real Estate', 
            title: 'How to Get the Best Mortgage Rates', 
            likes: 18, 
            comments: 22, 
            image: 'https://via.placeholder.com/50',
            videoThumbnail: 'https://via.placeholder.com/300x150/808080/FFFFFF?text=Mortgage+Tips'
        },
        { 
            id: '4', 
            name: 'Sophia Brown', 
            category: 'Finance', 
            title: 'Investment Strategies for Beginners', 
            likes: 33, 
            comments: 19, 
            image: 'https://via.placeholder.com/50',
            videoThumbnail: 'https://via.placeholder.com/300x150/808080/FFFFFF?text=Investment+Guide'
        },
    ];

    const renderPost = ({ item }) => (
        <View style={styles.postCard}>
            <View style={styles.postHeader}>
                <Image source={{ uri: item.image }} style={styles.profilePic} />
                <View>
                    <Text style={styles.postName}>{item.name} <Text style={styles.categoryTag}>{item.category}</Text></Text>
                    <Text style={styles.postTitle}>{item.title}</Text>
                </View>
            </View>
            <View style={styles.videoContainer}>
                <Image source={{ uri: item.videoThumbnail }} style={styles.videoThumbnail} />
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
            <Text style={styles.recommendationsHeader}>Recommendations</Text>
            <Text style={styles.subHeader}>Based on your choices and recent views</Text>

            <FlatList
                data={dummyPosts}
                keyExtractor={item => item.id}
                renderItem={renderPost}
                contentContainerStyle={styles.listContainer}
            />

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
        backgroundColor: '#D3D3D3',
    },
    card: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 15,
        width: '100%',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
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
    },
    videoThumbnail: {
        width: '100%',
        height: 150,
        borderRadius: 10,
    },
    playButton: {
        position: 'absolute',
        top: '50%',
        left: '50%',
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
    },
});

