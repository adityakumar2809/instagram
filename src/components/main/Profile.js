import React from 'react'
import { View, Text, Image, FlatList, StyleSheet } from 'react-native'

import { connect } from 'react-redux'

function Profile(props) {
    const { currentUser, posts } = props;
    return (
        <View style={styles.containerStyle}>
            <View style={styles.infoContainerStyle}>
                <Text>{currentUser.name}</Text>
                <Text>{currentUser.email}</Text>
            </View>
            <View style={styles.galleryContainerStyle}>
                <FlatList
                    numColumns={3}
                    horizontal={false}
                    data={posts}
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
        marginTop: 40
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
