import React, { Component } from 'react';
import { View, Text, StyleSheet, LogBox } from 'react-native'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './src/redux/reducers'
import thunk from 'redux-thunk'

const store = createStore(rootReducer, applyMiddleware(thunk))

import * as firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyAmuwh_wEEkDtHUB6PyiYWIN0OEc_eCex0",
    authDomain: "instagram-dev-934dd.firebaseapp.com",
    projectId: "instagram-dev-934dd",
    storageBucket: "instagram-dev-934dd.appspot.com",
    messagingSenderId: "560141181233",
    appId: "1:560141181233:web:3dd7a2142f32474755d010",
    measurementId: "G-5YX4BEPN6L"
};

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import LandingScreen from './src/components/auth/Landing'
import RegisterScreen from './src/components/auth/Register'
import LoginScreen from './src/components/auth/Login'
import MainScreen from './src/components/Main'
import AddScreen from './src/components/main/Add'
import SaveScreen from './src/components/main/Save'




const Stack = createStackNavigator()

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        }
    }

    componentDidMount() {
        LogBox.ignoreLogs(['Setting a timer']);
        firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                this.setState({
                    loggedIn: false,
                    loaded: true
                })
            } else {
                this.setState({
                    loggedIn: true,
                    loaded: true
                })
            }
        })
    }

    render() {
        const { loggedIn, loaded } = this.state;

        if (!loaded) {
            return (
                <View style={styles.containerStyle}>
                    <Text>Loading...</Text>
                </View>
            )
        }

        if (!loggedIn) {
            return (
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Landing">
                        <Stack.Screen
                            name="Landing"
                            component={LandingScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="Register"
                            component={RegisterScreen}
                        />
                        <Stack.Screen
                            name="Login"
                            component={LoginScreen}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            );
        }

        return (
            <Provider store={store}>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Main">
                        <Stack.Screen
                            name="Main"
                            component={MainScreen}
                            options={{ headerShown: true }}
                            navigation={this.props.navigation}
                        />
                        <Stack.Screen
                            name="Add"
                            component={AddScreen}
                            navigation={this.props.navigation}
                        />
                        <Stack.Screen
                            name="Save"
                            component={SaveScreen}
                            navigation={this.props.navigation}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </Provider>
        )

    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        justifyContent: 'center'
    },
});

export default App
