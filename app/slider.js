/**
 * Created by fandongyang on 2016/11/29.
 */
import React,{Component} from 'react';

import {
    View,
    Image,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    AsyncStorage,
    StatusBar

} from 'react-native';

import Login from './login';

import Swiper from 'react-native-swiper'
import Button from 'react-native-button'
const {width, height} = Dimensions.get('window');


class Slider extends Component{

    // 构造
    constructor(props) {
        super(props);
        this.state={
            loop:false,
            banners:[
                require('../images/banner/app2.png'),
                require('../images/banner/app1.png'),
                require('../images/banner/app1.png'),
                require('../images/banner/app1.png')
            ]
        }
    }
    componentDidMount() {


     /*   this.timer = setTimeout( () => {
            InteractionManager.runAfterInteractions(() => {
                navigator.resetTo({
                    component:Login,
                    name:'login'
                });
            });
        },20);*/

    }

    _enter = () => {
    /*   AsyncStorage.setItem('enterd','yes')
        AsyncStorage.getItem('enterd',(err,result) =>{
            console.log('slider-----'+result)
            })
        const {navigator} = this.props;
        navigator.push({name:'login',component:Login})*/
        this.props.enterSlide()
    }

    render(){
        return(

            <Swiper style={styles.wrapper}
                    dot={<View style={styles.dot} />}
                    activeDot={<View style={styles.activeDot} />}
                    paginationStyle={styles.pagination}
                    loop ={this.state.loop}

                >

                <View style={styles.slide}>
                    <Image style={styles.image} source={require('../images/banner/app1.png')} />
                </View>
                <View style={styles.slide}>
                    <Image style={styles.image} source={require('../images/banner/app2.png')} />
                </View>

                <View style={styles.slide}>
                    <Image style={styles.image} source={require('../images/banner/app3.png')} />


                    <TouchableOpacity onPress={this._enter} style={styles.textView}>
                        <Text style={styles.loginText} >
                            立即体验
                        </Text>
                    </TouchableOpacity>


                </View>
            </Swiper>
        );
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1,

    },
    slide:{
        flex:1,
        width:width,
        height:height
    },
    image:{
        flex:1,
        width:width,
        height:height
    },
    btn:{
        position:'absolute',
        width:width,
        height:80,
        bottom:0,
        padding:30,


    },
    dot:{
        width:10,
        height:10,
        backgroundColor:'transparent',
        borderColor:"#ff6600",
        borderWidth:1,
        borderRadius:5,
        marginLeft:12,
        marginRight:12
    },
    activeDot:{
        width:10,
        height:10,
        borderWidth:1,
        borderRadius:7,
        marginLeft:12,
        marginRight:12,
        backgroundColor:'#ee735c',
        borderColor:"#ee735c",

    },
    pagination:{
      bottom:100
    },
    textView:{
        position:'absolute',
        width:width,
        height:80,
        bottom:0,
        backgroundColor: '#3281DD',
        borderRadius:5,
        justifyContent: 'center',
        alignItems:'center',
    },
    loginText: {
        color: '#ffffff',
        fontSize:18,
        fontWeight: 'bold',

    },
});


export default Slider;