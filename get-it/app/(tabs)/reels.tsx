import React, { useState } from 'react';
import { View, SafeAreaView, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Reels() {
    const [selectedTab, setSelectedTab] = useState('Chosen for you');

    return (
        <SafeAreaView style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Reels</Text>
            </View>

            {/* Tabs Section */}
            <View style={styles.tabs}>
                {['Chosen for you', 'New', ].map((tab) => (
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

            {/* Dynamic Content Based on Selected Tab */}
            <View style={styles.reelsContainer}>
                {selectedTab === 'Chosen for you' && <Text style={styles.reelsText}>📌 Showing personalized reels</Text>}
                {selectedTab === 'New' && <Text style={styles.reelsText}>🔥 Discover the latest reels</Text>}
        
            </View>
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
