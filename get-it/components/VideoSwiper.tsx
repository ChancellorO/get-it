import React, { useState, useEffect, useRef } from "react";
import { View, Dimensions, StyleSheet, Text } from "react-native";

import Swiper from "react-native-deck-swiper";
import Video from "react-native-video";

const { width, height } = Dimensions.get("window");

// Example video list. You can also pass your own list via the videos prop.
const defaultVideos = [
  {
    link: "https://getithacknyu.s3.us-east-1.amazonaws.com/Download+(5).mp4",
    tag: "Stocks",
  },
  {
    link: "https://getithacknyu.s3.us-east-1.amazonaws.com/Download+(9).mp4",
    tag: "Real Estate",
  },
];

const VideoSwiper = ({ videos }) => {
  const [deck, setDeck] = useState([]);
  useEffect(() => {
    if (videos) {
      setDeck([...videos]); // Create a new copy of the list
    }
  }, [videos]);

  console.log(deck);
  const swiperRef = useRef(null);

  // This callback is triggered when any swipe occurs (regardless of direction).
  // It simply removes the top card (index 0) from the deck.
  const handleSwiped = (cardIndex) => {
    // setDeck((prevDeck) => prevDeck.slice(1));
  };

  // Optionally, you could reset the deck when all videos have been swiped.
  // For now, we'll just log a message.
  const handleSwipedAll = () => {
    console.log("No more videos");
    // Uncomment the line below if you'd like to reset the deck automatically.
    // setDeck(videos);
  };
return (
    <View style={[styles.container, {borderRadius: 40}]}>
      {deck.length > 0 ? (
        <Swiper
          ref={swiperRef}
          cards={deck}
          renderCard={(card) => (
            <View style={[styles.card, {borderRadius: 40}]}>
              <Video
                source={{ uri: card.link }}
                style={[styles.video, {borderRadius: 40}]}
                resizeMode="cover"
                repeat
                paused={false}
                controls={false}
              />
            </View>
          )}
          onSwiped={handleSwiped}
          onSwipedAll={handleSwipedAll}
          stackSize={3}
          // Disabling vertical swipes if you want to allow only horizontal swiping.
          disableTopSwipe
          disableBottomSwipe
        />
      ) : (
        <View style={styles.noMoreVideos}>
          <Text style={styles.noMoreText}>No More Videos</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', },
  card: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  video: {
    width: width,
    height: height *0.71,
    borderRadius: 40,
    backgroundColor: '#fff',
    marginBottom: 250,
  },
  noMoreVideos: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#fff',
  },
  noMoreText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default VideoSwiper;