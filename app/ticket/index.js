
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';

import Account from '../test2';
import MyTicket from './myTicket'
import Push from './push'




import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';

class Ticket extends  Component{
    render() {
        return (



<View style={{flex:1,backgroundColor:'#F7F5F5'}}>
                     <View style={styles.header}>
                       <Text style={styles.headerTitle}>我要票源</Text>
                    </View>
                    <ScrollableTabView
                        locked={false}
                        initialPage={0}
                        renderTabBar={() => <DefaultTabBar />}
                        style={{borderRadius:200}}
                        tabBarUnderlineStyle={{backgroundColor: '#F6A341'}}
                        tabBarBackgroundColor='#3D9DE7'
                        tabBarActiveTextColor='#fff'
                        tabBarInactiveTextColor='#fff'
                        tabBarTextStyle={{fontSize: 16,fontWeight:'400'}}
                    >
                        <MyTicket tabLabel="我要票源" navigator={this.props.navigator} />
                        <Push tabLabel="我要推送" navigator={this.props.navigator} />
                    </ScrollableTabView>
</View>


        );
    }
};

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

module.exports = Ticket