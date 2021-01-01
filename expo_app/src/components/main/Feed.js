import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    Image,
    FlatList,
    StyleSheet,
    Button,
    TouchableOpacity
} from 'react-native'

import
MaterialCommunityIcons
    from
    'react-native-vector-icons/MaterialCommunityIcons';

import firebase from 'firebase'
require('firebase/firestore')

import { connect } from 'react-redux'

import Spacer from '../individual/Spacer'
import colors from '../styles/colors'

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

    const onLikePress = (uid, postId) => {
        firebase.firestore()
            .collection('posts')
            .doc(uid)
            .collection('userPosts')
            .doc(postId)
            .collection('likes')
            .doc(firebase.auth().currentUser.uid)
            .set({})
    }

    const onDislikePress = (uid, postId) => {
        firebase.firestore()
            .collection('posts')
            .doc(uid)
            .collection('userPosts')
            .doc(postId)
            .collection('likes')
            .doc(firebase.auth().currentUser.uid)
            .delete()
    }

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
                            {
                                item.currentUserLike
                                    ?
                                    <TouchableOpacity
                                        onPress={() => (
                                            onDislikePress(
                                                item.user.uid,
                                                item.id
                                            )
                                        )}
                                    >
                                        <MaterialCommunityIcons
                                            name='heart'
                                            size={26}
                                            color={colors.ICON_COLOR}
                                        />
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity
                                        onPress={() => (
                                            onLikePress(
                                                item.user.uid,
                                                item.id
                                            )
                                        )}
                                    >
                                        <MaterialCommunityIcons
                                            name='heart-outline'
                                            size={26}
                                            color={colors.ICON_COLOR}
                                        />
                                    </TouchableOpacity>
                            }
                            <TouchableOpacity
                                onPress={() => (
                                    props.navigation.navigate(
                                        'Comment',
                                        {
                                            postId: item.id,
                                            uid: item.user.uid
                                        }
                                    )
                                )}
                            >
                                <MaterialCommunityIcons
                                    name='comment-text-multiple'
                                    size={26}
                                    color={colors.ICON_COLOR}
                                />
                            </TouchableOpacity>
                            <Spacer />
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
        backgroundColor: colors.APP_BACKGROUND_COLOR,
    },
    infoContainerStyle: {
        margin: 20,
        color: colors.APP_FONT_COLOR,
        fontWeight: 'bold'
    },
    galleryContainerStyle: {

    },
    imageContainerStyle: {
        flex: 1 / 3,
        borderColor: colors.FEED_BORDER_COLOR,
        borderBottomWidth: 0.5
    },
    imageStyle: {
        flex: 1,
        aspectRatio: 1 / 1
    }
})

export default connect(mapStateToProps, null)(Feed)
