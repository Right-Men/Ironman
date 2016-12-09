/**
 * Created by fandongyang on 2016/12/8.
 */

import React,{Component} from 'react';
import {


    View,
    Text,
    Image,

    WebView,
} from 'react-native';

import Title from './common/title'

class WebViewDemo extends Component {


    render() {
        return (

            <View style={{flex:1,backgroundColor:'#fff'}}>
                <Title titleName="WEBVIEW" navigator={this.props.navigator} canBack={true} />
                <View style={{flex:1}}>
                    <WebView
                        source={{uri: 'http://echarts.baidu.com/demo.html#candlestick-sh'}}
                        scalesPageToFit={false}
                        startInLoadingState={true}
                        domStorageEnabled={true}
                        javaScriptEnabled={true}
                    >
                    </WebView>
                </View>

            </View>


        );
    }}


module.exports = WebViewDemo;