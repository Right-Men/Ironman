import React,{Component} from 'react';

import {
    View,
    Image,
    InteractionManager,
    StyleSheet,
    Dimensions,
    ActivityIndicator

} from 'react-native';

import Login from './login';
import Gesture from './login/gesturePwd'
const {width, height} = Dimensions.get('window');
var Platform = require('Platform');

class Splash extends Component{

    // 构造
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const {navigator} = this.props;

        this.timer = setTimeout( () => {
            InteractionManager.runAfterInteractions(() => {
                navigator.resetTo({
                    component:Gesture,
                    name:'login'
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