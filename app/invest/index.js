
import React, { Component } from 'react';
import {

    StyleSheet,
    Dimensions,
    View,
    Text
} from 'react-native';

import Account from '../test3';
import Invest1 from '../invest1';
import Invest2 from '../invest2';
import Invest3 from '../invest3';
import Posts from '../invest4'


const {width} = Dimensions.get('window')



import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';

class Invest extends Component{



    render() {
        return (
            <View style={{flex:1,backgroundColor:'#F7F5F5'}}>
                <View style={styles.header}>
                    {/*<Text style={styles.headerTitle}>我要投资</Text>*/}
                </View>

                <ScrollableTabView
                    locked={false}
                    initialPage={0}
                    renderTabBar={() => <DefaultTabBar style={{height:30,width:width*0.86,marginLeft:width*0.07,marginTop:10,marginBottom:10,borderRadius:20,backgroundColor:'#42AFF0'}} />}
                    tabBarUnderlineStyle = {{backgroundColor:'transparent'}}
                    tabBarActiveTextColor='#FAAA42'
                    tabBarInactiveTextColor='#fff'


                    tabBarTextStyle={{fontSize: 15,justifyContent:'center',alignItems: 'center',marginTop:10}}>
                 {/*<Posts tabLabel="我要测试" navigator={this.props.navigator} />*/}
                    <Invest1 tabLabel="我要投资" navigator={this.props.navigator} />
                    <Invest1 tabLabel="我要推送" navigator={this.props.navigator} />




            </ScrollableTabView>

            </View>
        );
    }

};

var styles = StyleSheet.create({
    header:{
        paddingTop:25,
      /*  paddingBottom:12,*/
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