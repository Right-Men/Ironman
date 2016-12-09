/**
 * Created by fandongyang on 2016/11/30.
 */
/**
 * Created by fandongyang on 2016/11/30.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions,
    TextInput,
    InteractionManager
} from 'react-native';
const {width} = Dimensions.get('window');

import Title from '../common/title'
import Button from '../common/loginBtn'
import Toast, {DURATION} from 'react-native-easy-toast'


class UpdatePwd extends Component{

    onPressCallback=() => {
        //修改密码
        this.refs.toast.show('登录密码修改成功',DURATION.LENGTH_LONG)
        setTimeout( () => {
            InteractionManager.runAfterInteractions(() => {
                this.props.navigator.pop()
            });
        },1500);
    }


    render() {
        return (
            <View style={{flex:1,backgroundColor:'#fff'}}>
                <Title titleName="修改登录密码" navigator={this.props.navigator} canBack={true} />
                <View style={{width:width}}>
                    <UpdatePwdItem  imgSource={require('../../images/account/lock_update.png')} title="初始密码:" />
                    <UpdatePwdItem  imgSource={require('../../images/account/key_update.png')} title="新密码:" />
                    <UpdatePwdItem  imgSource={require('../../images/account/key_update.png')} title="确认新密码:" />
                </View>
                <Button  name='确定' onPressCallback={this.onPressCallback} />
                <Toast
                    ref="toast"
                    style={{backgroundColor:'black'}}
                    position='center'
                    textStyle={{color:'white'}}
                />
            </View>
        );
    }

};
class UpdatePwdItem extends  Component{
    render(){
        return(
            <View style= {styles.itemStyle}>
                <Image source={this.props.imgSource} style={styles.itemImg} />
                <Text style={styles.itemText}>{this.props.title}</Text>
                <TextInput
                    clearButtonMode="while-editing"
                    underlineColorAndroid="transparent"
                    style={styles.itemInput}
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({text})}  />
            </View>
        )
    }
}

var styles = StyleSheet.create({
   itemStyle:{
       width:width,height:50,flexDirection:'row',alignItems:'center',justifyContent:'center'
   },
    itemText:{
        fontSize:15,color:'#999999',width:90,marginLeft:5
    },
    itemInput:{
        flex:1, borderColor: '#60A7E9', borderWidth: 1,borderRadius:3,margin:7
    },
    itemImg:{
        width:20,height:20,marginLeft: 10
    }

})

module.exports = UpdatePwd