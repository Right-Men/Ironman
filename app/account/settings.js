/**
 * Created by fandongyang on 2016/11/30.
 */
/**
 * Created by peikan on 2016/11/29.
 */
import React,{Component} from 'react';
import {

    StyleSheet,
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,

    Navigator
} from 'react-native';
const {width,height} = Dimensions.get("window");
import Title from '../common/title'
import UpdatePwd from './updatePwd'
import UpdateGesture from './updateGesture'

var _navigator
class Settings extends Component {

    constructor(props){
        super(props)
        _navigator = this.props.navigator
    }
    toUpdatePwd =() => {
        _navigator.push({name:'toUpdatePwd',component:UpdatePwd})
    }
    toUpdateGesture = () =>{

        _navigator.push({name:'toUpdateGesture',component:UpdateGesture})


    }


    render() {
        return (

            <View style={{flex:1,backgroundColor:'#fff'}}>
                <Title titleName="账户设置" navigator={this.props.navigator} canBack={true} />


            <SettingsItem title="账户" imgSource={require('../../images/account/account_set.png')} isZh={true} zh='sunshine' />
                <TouchableOpacity

                    onPress={this.toUpdatePwd}>
                    <SettingsItem title="修改登录密码" navigator={this.props.navigator} imgSource={require('../../images/account/lock_set.png')}  />
               </TouchableOpacity>
            <TouchableOpacity

                onPress={this.toUpdateGesture}
                   >
                    <SettingsItem title="手势解锁设置" name="手势" navigator={this.props.navigator} imgSource={require('../../images/account/setting_set.png')} />
               </TouchableOpacity>
              <SettingsItem title="退出登录" imgSource={require('../../images/account/shutdown_set.png')} />


            </View>


        );
    }}
class SettingsItem extends Component{
    setNativeProps(nativeProps) {
        this._root.setNativeProps(nativeProps);
    }
    render(){
        return(
            <View ref={component => this._root = component} {...this.props}>
            <View style={{flexDirection:'row',width:width,height:50,alignItems:'center',borderBottomWidth:1,borderBottomColor:'#F8F8F8'}}>
                <Image style={{width:25,height:25,margin:15}} source={this.props.imgSource} />
                <Text style={{flex: 1,}}>{this.props.title}</Text>
                {this.props.isZh? <Text style={{justifyContent:'flex-end',marginRight:20}} >{this.props.zh}</Text>:
                    <Image source={require('../../images/account/arrow_right.png')} style={{width:20,height:20,justifyContent:'flex-end',marginRight:20}} />}


            </View>
            </View>
        )
    }
}
var styles = StyleSheet.create({
    header:{
        paddingTop:25,
        paddingBottom:12,
        backgroundColor:'#42AFF0'
    },
    headerTitle:{
        color:'#fff',
        fontSize:16,
        textAlign:'center',
        fontWeight:'600'
    },

})
module.exports = Settings;