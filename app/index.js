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
    ActivityIndicator,
    ToastAndroid

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

    componentWillMount() {

    }
    componentDidMount() {
       /* AsyncStorage.removeItem('enterd')*/
        this._asyncAppStatus()

        BackAndroid.addEventListener('hardwarePress',() => this._onBackAndroid())

    }
    _onBackAndroid = () => {
        const navigator = this.refs.navigator;
        if(!navigator) return false;
        const routers = navigator.getCurrentRoutes();
        if(routers.length > 1){
            const  top = routers[routers.length -1];
            const handleBack = (top.sceneRef && top.sceneRef.onBackAndroid);
            if(handleBack){
                return handleBack();
            }
            navigator.pop();
            return true;
        }
        if(this.lastBackPressed && (this.lastBackPressed + 2000 >= Date.now())){
            return false;
        }
            this.lastBackPressed = Date.now();
            ToastAndroid.show('再按一次退出应用',ToastAndroid.SHORT)
            return true;
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
                    <View style={{flex:1}}>
                        <StatusBar
                            barStyle="light-content"
                            animated={true}
                            translucent ={true}
                            showHideTransition="slide"
                            hidden={false}
                            backgroundColor ="rgba(66,175,240,.0)"

                        />
                        <Navigator
                            style={{flex:1}}
                            ref = "navigator"
                            configureScene={this.configureScene}
                            renderScene={this.renderScene}
                            sceneStyle={{backgroundColor:'#fff'}}
                            initialRoute={{
                            component: Splash,
                            name: 'Splash'
                            }}
                        />
                    </View>

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