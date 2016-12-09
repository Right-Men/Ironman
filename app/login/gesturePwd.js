/**
 * Created by fandongyang on 2016/11/30.
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
    InteractionManager,
    StatusBar
} from 'react-native';
const  {width,height} = Dimensions.get("window")
var Platform = require('Platform');
import PasswordGesture from 'react-native-gesture-password';
import Toast, {DURATION} from 'react-native-easy-toast'
import Root from '../root'
import Login from '../login'
var Password1 = '1236';
export default class gesture extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '请绘制您的手势密码',
            status: 'normal'
        }
    }
    onEnd(password) {
        if (password == Password1) {
            this.refs.toast.show('登录成功',DURATION.LENGTH_LONG)
            this.setState({
                status: 'right',
                message: '绘制正确'
            },() =>{
                setTimeout( () => {

                    InteractionManager.runAfterInteractions(() => {
                       /* AsyncStorage.setItem('gesturePwd',password)*/
                        this.props.navigator.push({name:'root',component:Root})

                    });
                },1500);
            });


            // your codes to close this view
        } else {
            this.setState({
                status: 'wrong',
                message: '密码绘制错误，请重新绘制'
            });
        }
    }

    onStart() {
        this.setState({
            status: 'normal',
            message: '请绘制您的手势密码'
        });
    }

    onReset() {
        this.setState({
            status: 'normal',
            message: '请再次绘制您的手势密码'
        });
    }
    _login=() =>{
        this.props.navigator.push({name:'GestureToLogin',component:Login})
    }

    render() {

        return (
            <PasswordGesture
                ref='pg'
                allowCross={true}
                status={this.state.status}
                message={this.state.message}
                onStart={() => this.onStart()}
                onEnd={(password) => this.onEnd(password)}
                innerCircle={true}
                outerCircle={true}
                textStyle={{color:'#fff'}}
                normalColor={{color:'#fff'}}
                wrongColor='#fff'
                rightColor="#fff"
                style={{backgroundColor:'#3D9DE7',borderColor: '#fff',}}
                children={
              <View>
              <StatusBar
                    barStyle="light-content"
                    animated={true}
                    translucent ={true}
                    showHideTransition="slide"
                    hidden={false}
                    backgroundColor ="rgba(66,175,240,.0)"
                />
                   <View style={{justifyContent:'center',alignItems:'center',top:width*0.098}}>
                        <Image
                        style={{width:150,height:150}}
                        source={require('../../images/account/account_gesture2.png')} />
                        <Text style={[styles.textStyle,{margin: 20}]}>130******9917</Text>
                  </View>
                   <View style={{flexDirection:'row',top:height*0.58}}>
                           <TouchableOpacity
                                onPress={this._forgetGesture}
                                 style={styles.loginText}
                                >
                               <Text style={styles.textStyle}>忘记手势密码?</Text>
                            </TouchableOpacity>
                           <TouchableOpacity
                                onPress={this._login}
                                style={styles.loginText}>
                               <Text style={styles.textStyle}>其他方式登录</Text>
                            </TouchableOpacity>

                    </View>
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
    textStyle:{
        color:'#fff',
        fontSize:18
    },
    loginText:{
        width:width/2,justifyContent:'center',alignItems:'center'
    }

})

module.exports = gesture










