import React, { useState, useEffect } from 'react'
import { View, Text, Image, FlatList, StyleSheet, Button } from 'react-native'
import firebase from 'firebase'
require('firebase/firestore')

import { connect } from 'react-redux'

function Feed(props) {
    const [posts, setPosts] = useState([]);


    useEffect(() => {
        if (
            (props.usersFollowingLoaded == props.following.length)
            && (props.following.length !== 0)
        ) {
            props.feed.sort(function (x, y) {
                return (x.creation - y.creation)
            })
            setPosts(props.feed)
        }
    }, [props.usersFollowingLoaded, props.feed])

    return (
        <View style={styles.containerStyle}>
            <View style={styles.galleryContainerStyle}>
                <FlatList
                    numColumns={1}
                    horizontal={false}
                    data={posts}
                    renderItem={({ item }) => (
                        <View style={styles.imageContainerStyle}>
                            <Text style={styles.infoContainerStyle}>
                                {item.user.name}
                            </Text>
                            <Image
                                source={{ uri: item.downloadURL }}
                                style={styles.imageStyle}
                            />
                            <Text onPress={() => (
                                props.navigation.navigate(
                                    'Comment',
                                    {
                                        postId: item.id,
                                        uid: item.user.uid
                                    }
                                )
                            )}>
                                View Comments...
                            </Text>
                        </View>
                    )}
                />
            </View>
        </View>
    )
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    following: store.userState.following,
    feed: store.usersState.feed,
    usersFollowingLoaded: store.usersState.usersFollowingLoaded,
})

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
    },
    infoContainerStyle: {
        margin: 20
    },
    galleryContainerStyle: {

    },
    imageContainerStyle: {
        flex: 1 / 3
    },
    imageStyle: {
        flex: 1,
        aspectRatio: 1 / 1
    }
})

export default connect(mapStateToProps, null)(Feed)
