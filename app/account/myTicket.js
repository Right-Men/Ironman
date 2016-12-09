/**
 * Created by fandongyang on 2016/11/30.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';


import Title from '../common/title'
import Ticket from './ticket'




import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';

class MyTicket extends Component{



    render() {
        return (
            <View style={{flex:1,backgroundColor:'#F7F5F5'}}>
                <Title titleName="我要票源" navigator={this.props.navigator} canBack={true} />

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

                    <Ticket type="" tabLabel="报价中（4）" navigator={this.props.navigator}  />
                    <Ticket tabLabel="已确认（3）" navigator={this.props.navigator} />
                    <Ticket tabLabel="已完结（3）" navigator={this.props.navigator} />
                </ScrollableTabView>

            </View>
        );
    }

};



module.exports = MyTicket