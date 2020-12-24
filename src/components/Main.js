import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser } from '../redux/actions/index'

export class Main extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }
    render() {
        const { currentUser } = this.props;
        if(currentUser === undefined) {
            return(
                <View></View>
            )
        }
        return (
            <View style={ styles.containerStyle }>
                <Text>{currentUser.name} is logged in...</Text>
            </View>
        )
    }
};

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators(
    {fetchUser}, 
    dispatch
)

export default connect(mapStateToProps, mapDispatchProps)(Main);

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        justifyContent: 'center'
    },
});
