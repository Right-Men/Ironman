import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    StatusBar,
    InteractionManager,
    TouchableOpacity,
    Dimensions,
    LayoutAnimation,
    Alert,
    AsyncStorage
} from 'react-native';
import Spinner from 'react-native-spinkit'
import store from 'react-native-simple-store';
import Toast, {DURATION} from 'react-native-easy-toast'
import {
    Hoshi,
} from 'react-native-textinput-effects';

import LoginSuccess from './root'
import Config from './common/config'
import _ from 'lodash'
const {width,height} = Dimensions.get('window')
var Platform = require('Platform');
class Longin extends Component {
    constructor(props) {
        super(props);
        this.userName = "";
        this.passWord = "";
        this.state = {
            fetchingIndex: false,
            //加载动画状态
            index: 0,
            types: ['CircleFlip'],
            size: 100,
            color: "#63B8FF",
            isVisible: false,
            w: 100, h: 100

        }
    }

    componentDidMount() {

    }
    onPressCallback = () => {
        let formData = new FormData();
        formData.append("username",this.userName);
        formData.append("password",this.passWord);
        let url = Config.api.release + Config.api.login
        if(this.userName == ''){
            this.refs.toast.show('请输入账号',DURATION.LENGTH_LONG)

        }else if(this.passWord == ''){
            this.refs.toast.show('请输入密码',DURATION.LENGTH_LONG)

        }
        if(!this.userName == ''&&!this.passWord == ''){
            this._getLogin(url,{username:this.userName,password:this.passWord})
         /*   Request.post(url,{username:this.userName,password:this.password})*/
                .then((responseText) =>{
                    if(responseText){

                        responseText.success == true ? this.onLoginSuccess(): this.refs.toast.show('登录失败,请检查您输入的账号密码是否正确!',DURATION.LENGTH_LONG);
                    }
                })
        }


    };
    _getLogin = (url,body) => {
        var options = _.extend(Config.header,{
            body:JSON.stringify(body)
        })

        return fetch(url, options)
        .then((response) => response.json()).catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
                this.refs.toast.show('请检查网络连接',DURATION.LENGTH_LONG)

            /*throw error;*/
        });
}
    onLoginSuccess(){

        const navigator = this.props.navigator;
     /*   LayoutAnimation.configureNext({
            duration: 600,   //持续时间
            create: {
                type: 'linear',
                property: 'opacity'
            },
            update: {
                type: 'spring',
                springDamping: 0.4
            }
        });*/
        this._onPress();
        store.save('user',{userName:this.userName,passWord:this.passWord,gesturePwd:12369})
        console.log('onLoginSuccess====')
        this.timer = setTimeout( () => {
            InteractionManager.runAfterInteractions(() => {
                this.setState({isVisible:false})
                 if(navigator){
                    navigator.replace({
                        name : 'HomePage',
                        component : LoginSuccess,
                    });


                }
            });
        },1500);


    }
    _onPress=() => {

        LayoutAnimation.configureNext({
            duration: 600,   //持续时间
            create: {
                type: 'linear',
                property: 'opacity'
            },
            update: {
                type: 'spring',
                springDamping: 0.99
            }
        });
        this.setState({w: this.state.w - 6, h: this.state.h - 6})
        if(this.state.w>0){
            requestAnimationFrame(this._onPress)
        }else{
            this.setState({isVisible:true})
        }


    }



    render() {
        return(
            <View
                style={{backgroundColor:'#f4f4f4',flex:1}}>
                <StatusBar
                    barStyle="light-content"
                    animated={true}
                    translucent ={true}
                    showHideTransition="slide"
                    hidden={false}
                    backgroundColor ="rgba(66,175,240,.0)"
                />
                <View style={{flex:30,justifyContent: 'center',
                    alignItems: 'center',}}>
                <Image
                    style={[styles.style_image,{ height:this.state.h,width:this.state.w,}]}
                    source={require('../images/login/logo.png')}/>
                 <Spinner style={styles.spinner} isVisible={this.state.isVisible} size={this.state.size} type='Bounce' color={this.state.color}/>
                </View>
              <View style={{flex:70,margin: 10}}>
                 <Hoshi
                    label={'账号：'}

                    borderColor={'#63B8FF'}


                    onChangeText={(text) => {
                           this.userName = text;
                }}
                />
               <View style={{height:10,width:width}} />
                <Hoshi
                    label={'密码：'}

                    borderColor={'#63B8FF'}
                    secureTextEntry={true}
                    numberOfLines={1}

                    clearButtonMode="while-editing"


                    onChangeText={(text) => {
                           this.passWord = text;
                }}


                />


                <TouchableOpacity onPress={this.onPressCallback} style={styles.loginTextView}>
                    <Text style={styles.loginText} >
                       登录
                    </Text>
                </TouchableOpacity>
               </View>

              <View style={{flex:10}}>
                <View style={{flex:1,flexDirection:'row',alignItems:'flex-end',bottom:20}}>
                    <Text style={styles.style_view_unlogin}>无法登录？
                    </Text>
                    <Text style={styles.style_view_regiester}>新用户
                    </Text>
                </View>
          </View>
                <Toast
                    ref="toast"
                    style={{backgroundColor:'black'}}
                    position='bottom'
                    textStyle={{color:'white'}}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    //加载动画样式


    spinner: {
        height:100,
        width:100,
        alignSelf:'center',
    },
    //
    style_image:{
        marginTop:width*0.15,

        alignSelf:'center',
        justifyContent:'center'
    },
    style_user_input:{

        backgroundColor:'#fff',
        height:35,
    },
    style_pwd_input:{
        backgroundColor:'#fff',
        height:35,
    },
    style_view_commit:{
        marginTop:15,
        marginLeft:10,
        marginRight:10,
        backgroundColor:'#63B8FF',
        height:35,
        borderRadius:5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    style_view_unlogin:{
        fontSize:12,
        color:'#63B8FF',
        marginLeft:10,
    },
    style_view_register:{
        fontSize:12,
        color:'#63B8FF',
        marginRight:10,
        alignItems:'flex-end',
        flex:1,
        flexDirection:'row',
        textAlign:'right',
    },
loginText: {
         color: '#ffffff',
        fontSize:15,
        fontWeight: 'bold',

},
loginTextView: {
        margin: 10,
        height:50,
        backgroundColor: '#3281DD',
        borderRadius:5,

        justifyContent: 'center',
        alignItems:'center',
},
});
module.exports = Longin;
