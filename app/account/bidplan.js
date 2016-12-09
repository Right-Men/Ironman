/**
 * Created by peikan on 2016/11/29.
 */
import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView
} from 'react-native';

class bidedetileli extends Component {
    render(){
        return(
            <View style={styles.header_title}>
                <Text style={styles.headerTitleleft}>累计投资笔数：</Text>
                <Text style={styles.headerTitleright}>10笔</Text>
            </View>
        )
    }
}

class Bidplan extends Component {

    render() {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{flex:1,backgroundColor:'#F7F5F5'}}>
                <View style={styles.header_title}>
                    <Text style={styles.headerTitleleft}>累计投资笔数：</Text>
                    <Text style={styles.headerTitleright}>10笔</Text>
                </View>
                <View style={styles.header}>
                    <Text style={styles.headerTitleleft}>累计投资金额：</Text>
                    <Text style={styles.headerTitleright}>999，232.00元</Text>
                </View>
                <View style={styles.header}>
                    <Text style={styles.headerTitleleft}>到账收益：</Text>
                    <Text style={styles.headerTitleright}>999，232.00元</Text>
                </View>
                <View style={styles.header}>
                    <Text style={styles.headerTitleleft}>未到账收益：</Text>
                    <Text style={styles.headerTitleright}>999，232.00元</Text>
                </View>

                <View style={styles.header_center}></View>


                <View style={styles.header_title}>
                    <Text style={styles.headerTitleleft}>累计投资笔数：</Text>
                    <Text style={styles.headerTitleright}>10笔</Text>
                </View>
                <View style={styles.header}>
                    <Text style={styles.headerTitleleft}>累计投资金额：</Text>
                    <Text style={styles.headerTitleright}>999，232.00元</Text>
                </View>
                <View style={styles.header}>
                    <Text style={styles.headerTitleleft}>到账收益：</Text>
                    <Text style={styles.headerTitleright}>999，232.00元</Text>
                </View>
                <View style={styles.header}>
                    <Text style={styles.headerTitleleft}>未到账收益：</Text>
                    <Text style={styles.headerTitleright}>999，232.00元</Text>
                </View>
            </View>
                </ScrollView>



        );
    }}

var styles = StyleSheet.create({
    header_title:{
        height:60,
        paddingTop:25,
        paddingBottom:12,
        borderTopWidth:2,
        borderTopColor:'#ffd700',
        backgroundColor:'#fff'
    },
    header_center:{
        height:30,
        paddingTop:25,
        paddingBottom:12,
        // borderWidth:2,
        backgroundColor:'#f7f7f7'
    },
    header:{
        height:60,
        paddingTop:25,
        paddingBottom:12,
        borderTopWidth:1,
        borderTopColor:'#f7f7f7',
        backgroundColor:'#fff'
    },
    headerTitleleft:{
        color:'#5D5C5C',
        width:150,
        fontSize:16,
        textAlign:'left',
        fontWeight:'400',
        position :'absolute',
        left:30
    },
    headerTitleright:{
        color:'#000',
        width:150,
        fontSize:16,
        textAlign:'right',
        fontWeight:'400',
        position :'absolute',
        right:30
    },
})
module.exports = Bidplan;