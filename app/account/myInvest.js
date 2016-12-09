/**
 * Created by fandongyang on 2016/11/30.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';

import Account from '../test2';
import Title from '../common/title'




import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';

class MyInvest extends Component{



    render() {
        return (
            <View style={{flex:1,backgroundColor:'#F7F5F5'}}>
                <Title titleName="我的投资" navigator={this.props.navigator} canBack={true} />

                <ScrollableTabView
                    locked={false}
                    initialPage={0}
                    renderTabBar={() => <DefaultTabBar />}

                    tabBarUnderlineStyle={{backgroundColor: '#F6A341'}}
                    tabBarUnderlineColor='#F6A341'
                    tabBarBackgroundColor='#F7F5F5'
                    tabBarActiveTextColor='#F6A341'
                    tabBarInactiveTextColor='#686868'
                    tabBarTextStyle={{fontSize: 13}}
                >

                    <Account type="" tabLabel="投资中（4）" navigator={this.props.navigator}  />
                    <Account tabLabel="已确认（3）" navigator={this.props.navigator} />
                    <Account tabLabel="回款中（3）" navigator={this.props.navigator} />
                    <Account tabLabel="已完结（3）" navigator={this.props.navigator} />
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

module.exports = MyInvest