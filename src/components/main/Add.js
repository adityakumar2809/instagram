import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';

export default function App() {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        <View style={styles.containerStyle}>
            <Camera style={styles.cameraStyle} type={type}>
                <View style={styles.buttonContainerStyle}>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            );
                        }}>
                        <Text style={styles.textStyle}> Flip </Text>
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    );
}

const styles = StyleSheet.create({
    containerStyle:{
        flex: 1
    },
    cameraStyle:{
        flex: 1
    },
    buttonContainerStyle:{
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row'
    },
    buttonStyle:{
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center'
    },
    textStyle:{
        fontSize: 18
    }
})
