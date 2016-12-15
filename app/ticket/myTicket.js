/**
 * Created by fandongyang on 2016/11/29.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    ListView,
    Alert,
    TouchableHighlight,
    InteractionManager,
    Image,
    RefreshControl

} from 'react-native';

import Toast, {DURATION} from 'react-native-easy-toast'
import  request from '../common/request'
import Moment from 'moment'

const {width,height}=Dimensions.get('window')
import Config from '../common/config'
import Detail from './ticketDetail'

/*
 "errno": 0,
 "errmsg": "",
 "data": {
 "iTotalRecords": 3,
 "data": [
 {
 "id": 92,
 "ticketId": 9,
 "transArea": "美国",
 "billType": "电票",
 "planMoney": 10,
 "surplusDays": 10,
 "dicKey": null,
 "issuingBankKey": "guogu",
 "issuingBankType": "国股",
 "issuingDate": "2016-12-12",
 "maturityDate": "2016-12-21",
 "billCount": 1,
 "discountCount": 3,
 "bankname": "中国工商银行股份有限公司  ",
 "state": 1
 },
 {},
 {}
 ]
 }
 }*/

/*
* {
 "errno": 0,
 "errmsg": "",
 "data": {
 "iTotalRecords": 10,
 "data": [
 {
 "id": 71,
 "ticketId": 43,
 "transArea": "北京",
 "billType": "电票",
 "planMoney": 200000,
 "surplusDays": 5,
 "dicKey": null,
 "issuingBankKey": "chengzhen",
 "issuingBankType": "村镇",
 "issuingDate": "2016-11-24",
 "maturityDate": "2016-11-28",
 "billCount": 1,
 "discountCount": 3,
 "bankname": "中国农业银行股份有限公司 ",
 "state": 1
 },
 {},
 {},
 {},
 {}
 ]
 }
 }*/
var _navigator;
export default class MyTicket extends Component{
    _dataSource = new ListView.DataSource({rowHasChanged:(row1,row2)=>row1 !== row2})
    // 构造
    constructor(props) {

        super(props);

        // 初始状态
        this.state = {
            dataLength:0,
            loader: 0,
            refreshing: false,
            page:0,
            total:0,
            data:null,
            hasMore:true,
            dataSource:this._dataSource.cloneWithRows([])
        };
    }

    componentDidMount() {
        _navigator = this.props.navigator;

        InteractionManager.runAfterInteractions(() => {
            this.pulldown(0)
        });

    }
    pulldown = (count) => {

        if (count == 0) {
            this.setState({loader: 0});
        } else {
            this.setState({refreshing: true});
        }

        this.pageIndex = 0;

        var URL = Config.api.release +Config.api.ticket+this.pageIndex * 10 + '/10';

        request.get(URL).then((responseText) => {
            var data = responseText;
            console.log(data)
            this.state.total = data.data.iTotalRecords;
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(data.data.data),
                data: data.data.data,
                loader: 1,
                refreshing: false
            });

        })
        this.pageIndex = 1;


    };

    pullup = () => {
        if(this.pageIndex > 0){
            var URL = Config.api.release + Config.api.invest +  this.pageIndex * 10 + '/10';
            request.get(URL).then((responseText) => {
                if( typeof responseText.data.length !=='number' ){
                    if(responseText.data.data.length>0){
                        let arr = this.state.data;
                        arr.push(...responseText.data.data);
                        this.setState({
                            dataSource: this.state.dataSource.cloneWithRows(arr),
                            data:arr
                        });
                        this.pageIndex ++;
                    }
                }
                else{
                    this.setState({
                        hasMore:false
                    })

                }
            })
        }

    };

    _renderFooter = () => {
        if (!this.state.hasMore) {
           /* this.refs.toast.show('没有更多数据了',DURATION.LENGTH_LONG)*/
            return (
                <View style={styles.loadingMore}>
                    <Text style={styles.loadingText}>没有更多数据了</Text>
                    <Toast
                        ref="toast"
                        style={{backgroundColor:'black'}}
                        position='bottom'
                        textStyle={{color:'white'}}
                    />
                </View> )
        }

    }

    render(){

        return this._renderListView() // ListView
    }


    _renderListView(){
        return(
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this._renderRow}
                renderFooter={this._renderFooter}
                refreshControl={
                            <RefreshControl
                                title={'正在刷新...'}
                                refreshing={this.state.refreshing}
                                onRefresh={() => {
                                    this.pulldown(1)
                                }}
                                colors={['#ff0000', '#00ff00', '#0000ff', '#3ad564']}
                                progressBackgroundColor="#ffffff"/>
                        }
                onEndReachedThreshold={10}
                onEndReached={this.pullup}
                enableEmptySections={true}
                showsVerticalScrollIndicator={false}
                automaticallyAdjustContentInsets={false}
            />
        )

    }
    _renderRow(row) {
        return (
            <TouchableHighlight
                onPress={() => _navigator.push({name:'Detail',component:Detail,passProps: {itemData:row}})}
                underlayColor='rgba(34,26,38,.1)'
                style={{marginBottom:10,backgroundColor:'#fff',borderBottomColor:'#F7F5F5',borderBottomWidth:1,borderTopWidth:1,borderTopColor:'#F7F5F5'}}>
                <View style={{flex:1,flexDirection:'row',marginLeft:10}}>
                    <View style={{  width:width, marginBottom:10, backgroundColor:'#fff'}}>

                        <View style={{ flex:1,flexDirection: 'row',justifyContent: 'flex-start',height: 35,alignItems:'center' }}>

                            <View style={{ backgroundColor:'#FB6766',width: 40, height: 25,  justifyContent:'center',borderWidth:1,borderColor:'#FB6766',borderRadius:3,alignItems:'center'}}>
                                <Text style={{justifyContent:'center',color:"#fff", fontSize: 13,fontWeight:'500',textAlign: 'center',   margin: 5,}}>

                                    {row.issuingBankType}
                                </Text>
                            </View>
                            <Image style={{width:10,height:10,marginLeft: 3,marginRight:3}} source={require('../../images/account/local_index.png')}/>
                            <Text style={[{fontSize:10,color:'#9D9D9D',textAlign:'center'}]}>

                                ({row.transArea})
                            </Text>

                        </View>
                        <View style={{flexWrap:'wrap',      flex:1,
                                        flexDirection: 'row',
                                        justifyContent:'space-between'}}>
                            <View style={[styles.cellfixed,{flex:1}]}>


                                <Text style={[styles.welcome,{color:'#F74155',fontSize:11}]}>
                                   800万
                                </Text>
                                <Text style={[styles.welcome,{color:'#9D9D9D',fontSize:11}]}>
                                    票面总金额
                                </Text>
                            </View>
                            <View style={[styles.cellfixed,{flex:1}]}>

                                <Text style={[styles.welcome,{color:'#9D9D9D',fontSize:11}]}>
                                   点票
                                </Text>
                                <Text style={[styles.welcome,{color:'#9D9D9D',fontSize:11}]}>
                                  票据类型


                                </Text>
                            </View>
                            <View style={[styles.cellfixed,{flex:1}]}>
                                <Text style={[styles.welcome,{color:'#4BB0F1',fontSize:11}]}>
                                    20天
                                </Text>
                                <Text style={[styles.welcome,{color:'#9D9D9D',fontSize:11}]}>
                                    剩余天数
                                </Text>

                            </View>
                            <View style={[styles.cellfixed,{flex:1}]}>

                                <Text style={[styles.welcome,{color:'#9D9D9D',fontSize:11}]}>
                                           5
                                </Text>
                                <Text style={[styles.welcome,{color:'#9D9D9D',fontSize:11}]}>
                                        票据总张数
                                </Text>
                            </View>
                        </View>
                        <View style={[ {flexWrap:'wrap',      flex:1,
                                        flexDirection: 'row',
                                        justifyContent:'space-between'}]}>
                            <View style={[styles.cellfixed,{flex:1}]}>

                                <Text style={[styles.welcome,{color:'#9D9D9D',fontSize:11}]}>
                                    发布时间
                                </Text>
                                <Text style={[styles.welcome,{color:'#F74155',fontSize:11}]}>
                                    {Moment(row.startTime).format("YYYY.MM.DD")}
                                </Text>
                            </View>
                            <View style={[styles.cellfixed,{flex:1}]}>

                                <Text style={[styles.welcome,{color:'#9D9D9D',fontSize:11}]}>
                                    到期日
                                </Text>
                                <Text style={[styles.welcome,{color:'#9D9D9D',fontSize:11}]}>
                                    {Moment(row.maturityDate).format("YYYY.MM.DD")}


                                </Text>
                            </View>
                            <View style={[styles.cellfixed,{flex:1}]}>

                                <Text style={[styles.welcome,{color:'#9D9D9D',fontSize:11}]}>
                                    背书次数
                                </Text>
                                <Text style={[styles.welcome,{color:'#4BB0F1',fontSize:11}]}>
                                    {row.surplusDays}次
                                </Text>
                            </View>
                            <View style={[styles.cellfixed,{flex:1}]}>

                                <Text style={[styles.welcome,{color:'#9D9D9D',fontSize:11}]}>

                                </Text>
                                <Text style={[styles.welcome,{color:'#4BB0F1',fontSize:11}]}>

                                </Text>
                            </View>


                        </View>
                        <View style={{flexDirection:'row',width:width-20}}>
                            <View style={{justifyContent:'center',alignItems:'center'}}><Text style={{ fontSize: 12,textAlign: 'center',color:'#4BB0F1'}}>投资进度</Text></View>
                            <View style={{flexDirection:'row',flex:1,justifyContent:'flex-end'}}>
                                <View style={{marginRight:10,width:width*0.18,height:23,justifyContent:'center',backgroundColor:'#EAEBEC',borderWidth:1,borderColor:'#EAEBEC',borderRadius:3}}><Text style={{ fontSize: 12,textAlign: 'center'}}>立即报价</Text></View>
                                <View style={{width:width*0.18,height:23,justifyContent:'center',backgroundColor:'#4BB0F1',borderWidth:1,borderColor:'#EAEBEC',borderRadius:3}}><Text style={{ fontSize: 12,textAlign: 'center',color:'#fff'}}>我有意向</Text></View>
                            </View>
                        </View>
                    </View>


                </View>
            </TouchableHighlight>)

    }





}
const styles=StyleSheet.create({


    cell:{
        flex:1,
        backgroundColor:'#fff',
        height: 50,
        alignItems: 'center', justifyContent: 'center'

    },
    flexContainer: {
        // 容器需要添加direction才能变成让子元素flex
        flex:1,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center'

    },

    welcome: {
        fontSize: 10,
        textAlign: 'center',
        justifyContent:'center',
        margin: 5,

    },
    bankName:{
        fontSize: 11,
        textAlign: 'center',
        justifyContent:'center',
        color:'#9D9D9D',

        width:140
    },
    productName:{

        fontSize:12
    },
    cellfixed: {
        height: 50,
        justifyContent:'center',
    },
    loadingMore: {
        marginVertical: 20
    },
    loadingText: {
        color: "#777",
        textAlign: 'center'
    }


})
