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
    InteractionManager

} from 'react-native';
import {
    SwRefreshScrollView,
    SwRefreshListView,
    RefreshStatus,
    LoadMoreStatus,

} from 'react-native-swRefresh'
import  request from '../common/request'

const {width,height}=Dimensions.get('window')

import Detail from './ticketDetail'

/*
* {
 "errno": 0,
 "errmsg": "",
 "data": {
 "iTotalRecords": 10,
 "data": [
 {
 "id": 82,
 "ticketId": 51,
 "transArea": "湖南",
 "billType": "电票",
 "planMoney": 60,
 "surplusDays": 62,
 "dicKey": null,
 "issuingBankKey": "guogu",
 "issuingBankType": "国股",
 "issuingDate": "2016-11-29",
 "maturityDate": "2017-01-29",
 "billCount": 1,
 "discountCount": 0,
 "bankname": "中国工商银行股份有限公司  ",
 "state": 8
 },
 ]
 }
 }*/
var _navigator;
export default class MyTicket extends Component{
    _page=0
    _dataSource = new ListView.DataSource({rowHasChanged:(row1,row2)=>row1 !== row2})
    // 构造
    constructor(props) {

        super(props);

        // 初始状态
        this.state = {
            dataLength:0,
            dataSource:this._dataSource.cloneWithRows([])
        };
    }

    componentDidMount() {
        _navigator = this.props.navigator;
        InteractionManager.runAfterInteractions(() => {
            this._fetchData(0)

        });

    }
    //私有方法
    _fetchData(start){

        request.get('http://139.129.234.183:8360/api/discountlist/public/'+start+'/7',{})
            .then((responseText) =>{
                console.log('------test2------'+responseText)
                var data = responseText
                if(data){

                    this.setState({
                        dataLength:data.data.data.length,
                        dataSource:this.state.dataSource.cloneWithRows(data.data.data)
                    })
                }
            })
            .catch((error) => {
                this.setState({
                    isLoadingTail:false})
                console.warn(error)
            })
    }
    render(){

        return this._renderListView() // ListView
    }


    /**
     * ListViewDemo
     * @returns {XML}
     * @private
     */
    _renderListView(){
        return(
            <SwRefreshListView
                dataSource={this.state.dataSource}
                ref="listView"
                renderRow={this._renderRow.bind(this)}
                onRefresh={this._onListRefersh.bind(this)}
                onLoadMore={this._onLoadMore.bind(this)}
                enableEmptySections={true}
                //isShowLoadMore={false}
                renderFooter={()=>{return
          (<View style={{backgroundColor:'#ddd',height:30}}>
            <Text>能看到我？你页面太高了。。。</Text>
          </View>)
          }}

            />
        )

    }
    _renderRow(row) {
        return (
            <TouchableHighlight
                onPress={() => this.props.navigator.push({name:'Detail',component:Detail,passProps: {itemData:row}})}
                underlayColor='rgba(34,26,38,.1)'
                style={{marginBottom:10,backgroundColor:'#fff',borderBottomColor:'#F7F5F5',borderBottomWidth:1,borderTopWidth:1,borderTopColor:'#F7F5F5'}}>
                <View style={{flex:1,flexDirection:'row',marginLeft:10}}>
                    <View style={{  width:width*0.72, marginBottom:10, backgroundColor:'#fff'}}>

                        <View style={styles.flexContainer}>

                            <View style={{ backgroundColor:'#FB6766',width: 50, height: 30,  justifyContent:'center',borderWidth:1,borderColor:'#FB6766',borderRadius:3,alignItems:'center'}}>
                                <Text style={{justifyContent:'center',color:"#fff", fontSize: 16,fontWeight:'500',textAlign: 'center',   margin: 5,}}>

                                    {row.issuingBankType}
                                </Text>
                            </View>
                            <View style={styles.cell}>
                                <Text style={styles.productName}>
                                    ({row.transArea})
                                </Text>
                            </View>

                        </View>
                        <View style={[styles.flexContainer,{}]}>
                            <View style={{height: 50,
                                    justifyContent:'center',
                                   }}>
                                <Text style={[styles.welcome,{color:'#9D9D9D',fontSize:14}]}>
                                    {row.billType}
                                </Text>
                                <Text style={[styles.welcome,{color:'#9D9D9D',fontSize:11}]}>
                                    票据种类
                                </Text>
                            </View>
                            <View style={styles.cellfixed}>
                                <Text style={[styles.welcome,{color:'#9D9D9D',fontSize:14}]}>
                                    {row.billType}
                                </Text>
                                <Text style={[styles.welcome,{color:'#9D9D9D',fontSize:11}]}>
                                     票据类型
                                </Text>
                            </View>
                            <View style={styles.cellfixed}>
                                <Text style={[styles.welcome,{color:'#F59C00',fontSize:14}]}>
                                    {row.planMoney/10000}万
                                </Text>
                                <Text style={[styles.welcome,{color:'#9D9D9D',fontSize:11}]}>
                                    票面总金额
                                </Text>
                            </View>
                            <View style={styles.cellfixed}>
                                <Text style={[styles.welcome,{color:'#F59C00',fontSize:14}]}>
                                    {row.surplusDays}天
                                </Text>
                                <Text style={[styles.welcome,{color:'#9D9D9D',fontSize:11}]}>
                                    剩余天数
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{flex:1,alignItems: 'center', justifyContent: 'center',backgroundColor:'#fff'}}>
                        <View style={{borderRadius:3,borderWidth:1,borderColor:'#3D9EE7',alignItems: 'center',justifyContent: 'center',width: width*0.186,height:27,backgroundColor:'#3D9EE7'}}>
                            <Text style={{fontSize:15,color:'#fff'}}>查看</Text>
                        </View>

                    </View>
                </View>
            </TouchableHighlight>)

    }



    /**
     * 刷新
     * @param end
     * @private
     */
    _onListRefersh(end){
        InteractionManager.runAfterInteractions(() => {
            this._fetchData(0)
            end()
        });

    }

    /**
     * 加载更多
     * @param end
     * @private
     */
    _onLoadMore(end){
        this._page++
        InteractionManager.runAfterInteractions(() => {
            this._fetchData(this._page*7)
            end(this._page*7/this.state.dataLength>1)
        });

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


})
