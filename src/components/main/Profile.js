import React, { useState, useEffect } from 'react'
import { View, Text, Image, FlatList, StyleSheet } from 'react-native'
import firebase from 'firebase'
require('firebase/firestore')

import { connect } from 'react-redux'

function Profile(props) {
    const [userPosts, setUserPosts] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if(props.route.params.uid === firebase.auth().currentUser.uid) {
            setUser(currentUser)
            setUserPosts(posts)
        } else {
            firebase.firestore()
                .collection('users')
                .doc(props.route.params.uid)
                .get()
                .then((snapshot) => {
                    if (snapshot.exists) {
                        setUser(snapshot.data())
                    } else {
                        console.log('Snapshot does not exists!');
                    }
                })

            firebase.firestore()
                .collection('posts')
                .doc(props.route.params.uid)
                .collection('userPosts')
                .orderBy('creation', 'asc')
                .get()
                .then((snapshot) => {
                    let posts = snapshot.docs.map(doc => {
                        const data = doc.data();
                        const id = doc.id;
                        return { id, ...data }
                    })
                    setUserPosts(posts);
                })
        }
    }, [props.route.params.uid])

    if (user == null) {
        return (
            <View/>
        )
    }

    return (
        <View style={styles.containerStyle}>
            <View style={styles.infoContainerStyle}>
                <Text>{user.name}</Text>
                <Text>{user.email}</Text>
            </View>
            <View style={styles.galleryContainerStyle}>
                <FlatList
                    numColumns={3}
                    horizontal={false}
                    data={userPosts}
                    renderItem={({item}) => (
                        <View style={styles.imageContainerStyle}>
                            <Image
                                source={{uri: item.downloadURL}}
                                style={styles.imageStyle}
                            />
                        </View>
                    )} 
                />
            </View>
        </View>
    )
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    posts: store.userState.posts,
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
        flex: 1/3
    },
    imageStyle: {
        flex: 1,
        aspectRatio: 1/1
    }
})

export default connect(mapStateToProps, null)(Profile)
