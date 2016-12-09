import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    InteractionManager,
    TouchableOpacity,
    Dimensions,
    LayoutAnimation
} from 'react-native';
import LoginButton from './common/loginBtn'
import Spinner from 'react-native-spinkit'

import {
    Kaede,
    Hoshi,
    Jiro,
    Isao,
    Madoka,
    Akira,
    Hideo,
    Kohana,
    Makiko,
    Sae,
    Fumi,
} from 'react-native-textinput-effects';
import EditView from './common/editView'
import PostUtil from './common/postUtil'
import LoginSuccess from './root'
import Config from './common/config'

const {width,height} = Dimensions.get('window')
var Platform = require('Platform');
class Longin extends Component {
    constructor(props) {
        super(props);
        this.userName = "";
        this.password = "";
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
      /*  this.onLoginSuccess();*/
        let formData = new FormData();
        formData.append("username",this.userName);
        formData.append("password",this.password);

        let url = Config.api.release + Config.api.login
        this._onPress();
        PostUtil.postJson(url,formData,(responseText) => {
            if(responseText){

                responseText.success == false ? alert('登录失败,请检查您输入的账号密码是否正确!'):this.onLoginSuccess();
            }
           // {"success":false,"msg":"登录失败"}

        })
    };
    onLoginSuccess(){

        const navigator = this.props.navigator;
        LayoutAnimation.configureNext({
            duration: 600,   //持续时间
            create: {
                type: 'linear',
                property: 'opacity'
            },
            update: {
                type: 'spring',
                springDamping: 0.4
            }
        });

        this.timer = setTimeout( () => {
            InteractionManager.runAfterInteractions(() => {
                this.setState({isVisible:false})
                 if(navigator){
                    navigator.push({
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
                <View style={{flex:30,justifyContent: 'center',
                    alignItems: 'center',}}>
                <Image
                    style={[styles.style_image,{ height:this.state.h,width:this.state.w,}]}
                    source={require('../images/login/logo.png')}/>
                 <Spinner style={styles.spinner} isVisible={this.state.isVisible} size={this.state.size} type='Bounce' color={this.state.color}/>
                </View>
              <View style={{flex:70,margin: 10}}>
                 <Hoshi
                    label={'请输入账号：'}
                    // this is used as active border color
                    borderColor={'#63B8FF'}
                    // this is used to set backgroundColor of label mask.
                    // please pass the backgroundColor of your TextInput container.

                    onChangeText={(text) => {
                           this.userName = text;
                }}
                />
               <View style={{height:10,width:width}} />
                <Hoshi
                    label={'请输入密码：'}
                    // this is used as active border color
                    borderColor={'#63B8FF'}
                    secureTextEntry={true}
                    numberOfLines={1}

                    clearButtonMode="while-editing"
                    // this is used to set backgroundColor of label mask.
                    // please pass the backgroundColor of your TextInput container.

                    onChangeText={(text) => {
                           this.password = text;
                }}


                />
            {/*   <EditView style={[styles.style_user_input,{ width:width,}]} type="user" name='请输入账号' onChangeText={(text) => {
                           this.userName = text;
                }}/>

                <EditView  style={styles.style_pwd_input} type="pwd" name='请输入密码' onChangeText={(text) => {
                           this.password = text;
                }}/>*/}

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
