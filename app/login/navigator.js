import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,

} from 'react-native';
import Login from '../login';
class navigator extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        //可以在这里添加对用户信息是否存在的判断，然后再进行决定跳转到哪个页面
        let defaultName = 'login';

        let defaultComponent = Login;
        return (
            <Navigator
                initialRoute = {{
                 name : defaultName ,
                 component: defaultComponent,

                }}

                configureScene = {(route) => {
          return Navigator.SceneConfigs.PushFromRight;
        }}
                renderScene={(route,navigator) => {
            let Component = route.component;
            return <Component {...route.passProps} navigator = {navigator} />
        }}
            />
        );
    }

};


class Longin extends Component {
    constructor(props) {
        super(props);
        this.userName = "";
        this.password = "";
    }


    onPressCallback = () => {



        let formData = new FormData();
        formData.append("username",this.userName);
        formData.append("password",this.password);
        let url = "http://192.168.0.58/api/user/login";
        PostUtil.postJson(url,formData,(responseText) => {
            //{"success":false,"thirdTimes":true,"msg":"登录失败"}
            console.log('-------login----:'+responseText.success)
            responseText.success == false ? AlertIOS.alert(responseText.msg+',请检查您输入的账号密码是否正确!'):this.onLoginSuccess();

        })
    };
    onLoginSuccess(){
        const { navigator } = this.props;
        if (navigator) {
            navigator.push({
                name : 'LoginSuccess',
                component : LoginSuccess,
            });
        }
    }

    render() {
        return(
            <View
                style={{backgroundColor:'#f4f4f4',flex:1}}>
                <Image
                    style={styles.style_image}
                    source={require('../images/login/logo.png')}/>
                <EditView style={styles.style_user_input} type="user" name='请输入账号' onChangeText={(text) => {
                           this.userName = text;
                }}/>
                <EditView  style={styles.style_pwd_input} type="pwd" name='请输入密码' onChangeText={(text) => {
                           this.password = text;
                }}/>

                {/* <View
                 style={{height:1,backgroundColor:'#f4f4f4'}}
                 />*/}



                <LoginButton name='登录' onPressCallback={this.onPressCallback} />

                <View style={{flex:1,flexDirection:'row',alignItems:'flex-end',bottom:20}}>
                    <Text style={styles.style_view_unlogin}>无法登录？
                    </Text>
                    <Text style={styles.style_view_regiester}>新用户
                    </Text>
                </View>
            </View>
        );
    }
}

AppRegistry.registerComponent('fl', () => navigator);