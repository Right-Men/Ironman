
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions
} from 'react-native';

import Account from '../test2';
import MyTicket from './myTicket'
import Push from './push'



const  {width} = Dimensions.get('window')
import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';

class Ticket extends  Component{
    render() {
        return (



<View style={{flex:1,backgroundColor:'#F7F5F5'}}>
                     <View style={styles.header}>
                     {/*  <Text style={styles.headerTitle}>我要票源</Text>*/}
                    </View>
                    <ScrollableTabView
                        locked={false}
                        initialPage={0}
                        renderTabBar={() => <DefaultTabBar style={{height:30,width:width*0.86,marginLeft:width*0.07,marginTop:10,marginBottom:10,borderRadius:20,backgroundColor:'#42AFF0'}} />}
                        tabBarUnderlineStyle = {{backgroundColor:'transparent'}}
                        tabBarActiveTextColor='#FAAA42'
                        tabBarInactiveTextColor='#fff'
                       /* style={{borderRadius:200}}
                        tabBarUnderlineStyle={{backgroundColor: '#F6A341'}}
                        tabBarBackgroundColor='#3D9DE7'
                        tabBarActiveTextColor='#fff'
                        tabBarInactiveTextColor='#fff'*/
                        tabBarTextStyle={{fontSize: 15,justifyContent:'center',alignItems: 'center',marginTop:10}}
                    >
                        <MyTicket tabLabel="我要票源" navigator={this.props.navigator} />
                        <MyTicket tabLabel="我要推送" navigator={this.props.navigator} />
                    </ScrollableTabView>
</View>


        );
    }
};

var styles = StyleSheet.create({
    header:{
        paddingTop:25,
       /* paddingBottom:12,*/
        backgroundColor:'#42AFF0'
    },
    headerTitle:{
        color:'#fff',
        fontSize:16,
        textAlign:'center',
        fontWeight:'600'
    },

})

module.exports = Ticket