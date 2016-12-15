/**
 * Created by fandongyang on 2016/12/1.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    AsyncStorage,
InteractionManager
} from 'react-native';
import store from 'react-native-simple-store';
import PasswordGesture from 'react-native-gesture-password';
import Toast, {DURATION} from 'react-native-easy-toast'

var Password1 = '';
class UpdateGesture extends Component{

    constructor(props) {
        super(props);

        this.state = {
            message: '为了您的账户安全，请设置手势密码',
            status: 'normal'
        }
    }
    onEnd(password) {
        if ( Password1 === '' ) {
            // The first password
            Password1 = password;
            this.setState({
                status: 'normal',
                message: '请再次绘制手势密码'
            });
        } else {
            // The second password
            if ( password === Password1 ) {
                store.get('user').then((user) => {
                    store.update('user',{gesturePwd:password})
                })
                this.setState({
                    status: 'right',
                    message: '手势密码修改成功：' + password
                },() =>{
                    if(this.state.status === 'right'){
                        this.refs.toast.show('手势密码修改成功',DURATION.LENGTH_LONG)
                        setTimeout( () => {
                            InteractionManager.runAfterInteractions(() => {

                                this.props.navigator.pop()
                            });
                        },1000);


                    }
                });

                Password1 = '';
                // your codes to close this view
            } else {
                this.setState({
                    status: 'wrong',
                    message:  '与首次绘制不一致，请再次绘制'
                });
            }
        }

    }
    onStart() {
        if ( Password1 === '') {
            this.setState({
                message: '为了您的账户安全，请设置手势密码'
            });
        } else {
            this.setState({
                message: '请再次绘制手势密码'
            });
        }





    }
    render() {
        return (

            <PasswordGesture
                ref='pg'
                status={this.state.status}
                message={this.state.message}
                onStart={() => this.onStart()}
                onEnd={(password) => this.onEnd(password)}
                innerCircle={true}
                outerCircle={true}
                children={
               <View  style={[styles.header,{flexDirection: 'row'}]}>
                <TouchableOpacity onPress={() =>this.props.navigator.pop()}>
                 <Image
                        source={require('../../images/account/arrow_left.png')}
                        style={styles.back}>
                    </Image>
                </TouchableOpacity>
                 <Text style={[styles.headerTitle,{flex: 1,textAlign: 'center'}]}>手势密码</Text>
                <View style={styles.back} />
                <Toast
                    ref="toast"
                    style={{backgroundColor:'black'}}
                    position='center'
                    textStyle={{color:'white'}}
                />

        </View>
            }
            />

        );
    }


}
const styles = StyleSheet.create({
    back:{
        width:20,height:20,marginLeft:10
    },
    header:{
        paddingTop:25,
        paddingBottom:12,
        backgroundColor:'#292B38'
    },
    headerTitle:{
        color:'#fff',
        fontSize:16,
        textAlign:'center',
        fontWeight:'600'
    },
});
module.exports = UpdateGesture