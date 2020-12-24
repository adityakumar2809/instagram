import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';

export default function App() {
    const [hasPermission, setHasPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const takePicture = async () => {
        if (camera) {
            const data = await camera.takePictureAsync(null);
            setImage(data.uri);
        }
    }

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        <View style={styles.containerStyle}>
            <View style={styles.cameraContainerStyle}>
                <Camera
                    ref={(ref) => setCamera(ref)}
                    style={styles.cameraStyle}
                    type={type}
                    ratio={'1:1'}
                />
            </View>
            <View style={styles.buttonContainerStyle}>
                <Button
                    title="Flip Camera"
                    onPress={() => {
                        setType(
                            type === Camera.Constants.Type.back
                                ? Camera.Constants.Type.front
                                : Camera.Constants.Type.back
                        );
                    }}>
                </Button>
                <Button
                    title="Take Picture"
                    onPress={() => (
                        takePicture()
                    )}
                />
                { 
                    image
                    ?   <Image 
                            source={{ uri: image }} 
                            style={styles.imageStyle} 
                        />
                    :   <></>
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1
    },
    cameraContainerStyle: {
        flex: 1,
        flexDirection: 'row'
    },
    buttonContainerStyle: {
        flex: 1
    },
    cameraStyle: {
        flex: 1,
        aspectRatio: 1
    },
    imageStyle: {
        flex: 1,
        flexDirection: 'column'
    }
})
