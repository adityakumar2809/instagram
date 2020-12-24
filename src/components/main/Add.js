import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
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
            <View style={styles.cameraContainerStyle}>
                <Camera 
                    style={styles.cameraStyle} 
                    type={type}
                    ratio={'1:1'}
                />
            </View>
            <View>
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
    cameraStyle: {
        flex: 1,
        aspectRatio: 1
    }
})
