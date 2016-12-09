import React, { Component } from 'react';
import {
    ToolbarAndroid,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native';
export default class EditView extends Component {
    constructor(props) {
        super(props);
        this.state = {text: ''};
    }

    render() {
        return (
            <View style={LoginStyles.TextInputView}>
                <TextInput style={LoginStyles.TextInput}
                           numberOfLines={1}
                           underlineColorAndroid="transparent"
                           clearButtonMode="while-editing"
                           secureTextEntry={this.props.type === 'user'?false:true}
                           textAlign='center'
                           placeholder={this.props.name}
                           onChangeText={
           (text) => {
             this.setState({text});
             this.props.onChangeText(text);
           }
        }
                />
            </View>
        );
    }
}


const LoginStyles = StyleSheet.create({
    TextInputView: {

        height:50,
        backgroundColor: '#ffffff',
        borderRadius:1,
        borderWidth:0.1,
        borderColor:'#000000',
        flexDirection: 'column',
        justifyContent: 'center',
    },

    TextInput: {
        backgroundColor: '#ffffff',
        height:45,

    },
});
