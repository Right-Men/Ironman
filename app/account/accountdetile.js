/**
 * Created by peikan on 2016/11/29.
 */
import React,{Component} from 'react';
import {

    StyleSheet,
    View,
    Text
} from 'react-native';
import Bidplan from './bidplan';
import Title from '../common/title'
import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';
class Accountdetile extends Component {


    render() {
        return (



            <View style={{flex:1,backgroundColor:'#F7F5F5'}}>
                <Title titleName="我要票据" navigator={this.props.navigator} canBack={true} />
                <ScrollableTabView
                    locked={false}
                    initialPage={0}
                    renderTabBar={() => <DefaultTabBar />}
                    style={{borderRadius:20}}
                    tabBarUnderlineStyle={{backgroundColor: '#F6A341'}}
                    tabBarBackgroundColor='#3D9DE7'
                    tabBarActiveTextColor='#fff'
                    tabBarInactiveTextColor='#fff'
                    tabBarTextStyle={{fontSize: 16,fontWeight:'400'}}
                >
                    <Bidplan tabLabel="投资总览" />
                    <Bidplan tabLabel="票据总揽" />
                </ScrollableTabView>
            </View>


        );
    }}

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
    module.exports = Accountdetile;