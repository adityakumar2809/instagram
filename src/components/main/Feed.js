import React, { useState, useEffect } from 'react'
import { View, Text, Image, FlatList, StyleSheet, Button } from 'react-native'
import firebase from 'firebase'
require('firebase/firestore')

import { connect } from 'react-redux'

function Feed(props) {
    const [posts, setPosts] = useState([]);


    useEffect(() => {
        let posts = [];
        if (props.usersLoaded == props.following.length) {
            for (let i = 0; i < props.following.length; i++) {
                const user = props.users.find((el) => {
                    return (el.uid === props.following[i])
                })
                if (user != undefined) {
                    posts = [...posts, ...user.posts]
                }

            }
            posts.sort(function (x, y) {
                return (x.creation - y.creation)
            })
            setPosts(posts)
        }
    }, [props.usersLoaded])

    return (
        <View style={styles.containerStyle}>
            <View style={styles.galleryContainerStyle}>
                <FlatList
                    numColumns={1}
                    horizontal={false}
                    data={posts}
                    renderItem={({ item }) => (
                        <View style={styles.imageContainerStyle}>
                            <Text style={styles.infoContainerStyle}>{item.user.name}</Text>
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
    users: store.usersState.users,
    usersLoaded: store.usersState.usersLoaded,
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
