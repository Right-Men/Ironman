
import React, { Component } from 'react';
import {

    StyleSheet,

    View,
    Text
} from 'react-native';

import Account from '../test3';
import Invest1 from '../invest1';
import Invest2 from '../invest2';
import Invest3 from '../invest3';
import Invest4 from '../invest4';





import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';

class Invest extends Component{



    render() {
        return (
            <View style={{flex:1,backgroundColor:'#F7F5F5'}}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>我要投资</Text>
                </View>

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

                <Invest1 type="" tabLabel="投资中（4）" navigator={this.props.navigator}  />
                <Invest2 tabLabel="已确认（3）" navigator={this.props.navigator} />
                <Invest3 tabLabel="回款中（3）" navigator={this.props.navigator} />
                <Invest4 tabLabel="已完结（3）" navigator={this.props.navigator} />
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

module.exports = Invest