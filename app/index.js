/**
 *
 *      整个文件的入口
 *
 *
 * */
'use strict';

import React,{Component} from 'react';

import {
    View,
    Navigator,
    StyleSheet,
    BackAndroid,
    AppRegistry,
    AsyncStorage,
    Dimensions,
    StatusBar,
    ActivityIndicator

} from 'react-native';


import Slider from './slider';
import  Splash from './splash'


// var tempNavigator;

const {width,height} = Dimensions.get('window')
class Root extends Component{

    // 构造
    constructor(props) {
        super(props);
        this.state={
            enterd:null,
            booted:false
        }

    }

    componentDidMount() {
       /* AsyncStorage.removeItem('enterd')*/
        this._asyncAppStatus()



    }

    _asyncAppStatus(){

        AsyncStorage.getItem('enterd')
            .then((data) => {
                this.setState({
                    booted:true,
                })

                if(data === 'yes'){
                    this.setState({
                        enterd : true
                    })
                }
            })
    }
    _enterSlide = () =>{
        this.setState({
            enterd:true
        },function(){
            AsyncStorage.setItem('enterd','yes')
        })
    }
    configureScene = () => {
     /*   return Navigator.SceneConfigs.PushFromRight;*/
        var conf = Navigator.SceneConfigs.HorizontalSwipeJump;
        conf.gestures = null;
        return conf;
    };

    renderScene = (route , navigator) => {
        let Component = route.component;

        return(
            <Component {...route.passProps} route = {route}  navigator = {navigator}/>
        );
    };

    render(){
      console.log('index--this.state.enterd---'+this.state.enterd)
        if(!this.state.booted){
            return (
                <View style={styles.bootPage}>

                    <ActivityIndicator color="#ee735c" />
                </View>
            )
        }
        if(!this.state.enterd){
            return <Slider enterSlide = {this._enterSlide}/>
        }
                return(


                        <Navigator
                            ref = "splash"
                            configureScene={this.configureScene}
                            renderScene={this.renderScene}
                            sceneStyle={{backgroundColor:'#fff'}}
                            initialRoute={{
                            component: Splash,
                            name: 'Splash'
                            }}
                        />
                )
    }

}

const  styles = StyleSheet.create({
    bootPage:{
        width:width,
        height:height,
        backgroundColor:'#fff',
        justifyContent:'center'
    }
})




AppRegistry.registerComponent('fl', () => Root);

// export default Root; 