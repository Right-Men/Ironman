import React,{Component} from 'react';

import {
    View,
    Image,
    InteractionManager,
    StyleSheet,
    Dimensions,
    ActivityIndicator,
    StatusBar

} from 'react-native';
import store from 'react-native-simple-store';
import Login from './login';
import Gesture from './login/gesturePwd'
const {width, height} = Dimensions.get('window');
var Platform = require('Platform');

class Splash extends Component{

    // 构造
    constructor(props) {
        super(props);
        this.state={
           logined:false,

        }

    }
    componentDidMount() {
        const {navigator} = this.props;
        console.log('*********')
         store.get('user').then((user) => {
            console.log(user)
            if(user != null){
               /* store.save('gesturePwd',{gesturePwd:user.gesturePwd});*/
                this.setState({
                    logined:true
                })
            }
         })



        this.timer = setTimeout( () => {
            InteractionManager.runAfterInteractions(() => {
                navigator.resetTo({
                    component: this.state.logined?Gesture:Login,
                    name: this.state.logined?'Gesture':'Login'
                });
            });
        },10);

    }


    componentWillUnMount() {
        this.timer && clearTimeout(this.timer);
    }

    render(){
        return(
          /*  <View style={styles.viewStyle}>

             <Image
             source={require('../images/ic_splash.jpg')}
             style={styles.imgStyle}
             />
             </View>*/
            <View style={styles.bootPage}>
                <StatusBar
                    barStyle="light-content"
                    animated={true}
                    translucent ={true}
                    showHideTransition="slide"
                    hidden={false}
                    backgroundColor ="rgba(66,175,240,.0)"
                />
                <ActivityIndicator color="#ee735c" />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    viewStyle:{
        flex:1
    },
    imgStyle:{
        width:width,
        height:height
    },
    bootPage:{
        width:width,
        height:height,
        backgroundColor:'#fff',
        justifyContent:'center'
    }

});


export default Splash;