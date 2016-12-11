/**
 * Created by fandongyang on 2016/11/28.
 */

'use strict';
import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Dimensions

} from 'react-native';

const {Width} = Dimensions.get('window')
export default class Title extends React.Component {



    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View  style={[styles.header,{flexDirection: 'row'}]}>
                <TouchableOpacity style={{width:Width / 3}} onPress={() =>this.props.navigator.pop()}>
                    {this.props.canBack == true?<View style={styles.goBack} /> :<View></View>}
                </TouchableOpacity>
                <Text style={[styles.headerTitle,{flex: 1,textAlign: 'center'}]}>{this.props.titleName}</Text>
                        {this.props.canBack == true?<View style={styles.back}></View>:<View></View>}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    back:{
        width:20,height:20,marginLeft:10
    },
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
    goBack:{
        borderLeftWidth:1,
        borderBottomWidth:1,
        borderColor:'#fff',
        width:15,
        height:15,
        transform:[{rotate:'45deg'}],
        marginLeft:15
    }

});