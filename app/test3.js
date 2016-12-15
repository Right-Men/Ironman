/**
 * Created by fandongyang on 2016/12/4.
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
    ActivityIndicator,
    InteractionManager,
    RefreshControl

} from 'react-native';
import {
    SwRefreshScrollView,
    SwRefreshListView,
    RefreshStatus,
    LoadMoreStatus
} from 'react-native-swRefresh'
import  request from './common/request'
import Config from './common/config'
const {width,height}=Dimensions.get('window')
var _navigator;
import Detail from './home/productDetail'
import * as Progress from 'react-native-progress';

var cacheResults = {
    nextPage : 1,
    items :[],
    total:0
}

export default class Main extends Component{

    _dataSource = new ListView.DataSource({rowHasChanged:(row1,row2)=>row1 !== row2})
    // 构造
    constructor(props) {

        super(props);

        // 初始状态
        this.state = {
            isLoadingTail:false,
            isRefreshing:false,
            dataLength:0,
            dataSource:this._dataSource.cloneWithRows([])
        };
    }

    componentDidMount() {
        _navigator = this.props.navigator;

        InteractionManager.runAfterInteractions(() => {
            this._getTotal();
            this._fetchData(0)
        });

    }

    _getTotal(){
        request.get(Config.api.release + Config.api.invest+0+'/10000')
            .then((responseText) =>{
                console.log('cacheResults.total=====_getTotal===:'+responseText.data.data.length)
                cacheResults.total  = responseText.data.data.length
            })

    }
    //私有方法
    _fetchData(page){

        if(page !== 0){
            this.setState({
                isLoadingTail:true
            })
        }else{

            this.setState({

                isRefreshing:true
            })
        }
        var URL = Config.api.release + Config.api.invest+page*10+'/10'

        request.get(URL )
            .then((responseText) =>{
                console.log('------test3------'+responseText)
                var data = responseText
                if(data){
                    var items = cacheResults.items.slice()
                    if(page !== 0){
                        items = items.concat(data.data.data)
                        cacheResults.nextPage += 1
                    }else{
                        items = data.data.data.concat(items)
                    }

                    cacheResults.items = items

            /*        console.log('data.data.data.length:'+typeof data.data.data.length)
                    if(typeof data.data.data.length !== 'number'){
                        console.log('============================')
                        this._renderFooter(true)
                    }*/
                    console.log('cacheResults.total====='+cacheResults.total)

                    if(page!==0){
                        this.setState({
                            isLoadingTail:false,
                            dataSource:this.state.dataSource.cloneWithRows(cacheResults.items)

                        })
                    }else{
                        this.setState({
                            isRefreshing:false,
                            dataSource:this.state.dataSource.cloneWithRows(cacheResults.items)

                        })
                    }
                }
            })
            .catch((error) => {
                if(page !== 0){
                    this.setState({
                        isLoadingTail:false})
                }else{
                    this.setState({
                        isRefreshing:false})
                }


                console.warn(error)
            })
    }
    render(){

        return(

            <ListView dataSource={this.state.dataSource}
                      renderRow={this._renderRow}
                      renderFooter={this._renderFooter}
                      onEndReached={this._fetchMoreData}//当触底的时候
                      refreshControl = {
                           <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh}
                            tintColor="#ff6600"
                            title = "拼命加载中。。。"

                        />
                      }

                      onEndReachedThreshold={20}//距离底部高度多少进行预加载
                      enableEmptySections={true}
                      showsVerticalScrollIndicator={false}
                      automaticallyAdjustContentInsets={false}
            />
        )
    }

    _onRefresh = () =>{
        if(this._hasMore()|| this.state.isRefreshing){
            return
        }

        this._fetchData(0)
    }
    _renderFooter= (isMore) =>{
        if(!this._hasMore()){
            return(
                <View style={styles.loadingMore}>
                    <Text style={styles.loadingText}>没有更多数据了</Text>
                </View>
            )
        }
        if(isMore){
            return(
                <View style={styles.loadingMore}>
                    <Text style={styles.loadingText}>没有更多数据了</Text>
                </View>
            )
        }
        if(!this.state.isLoadingTail){
            return <View style={styles.loadingMore} />
        }
        return  <ActivityIndicator

            style={[styles.loadingMore]}

        />
    }
    _fetchMoreData=() =>{
        //如果没有更多数据 或者 正在加载中
        if(!this._hasMore() || this.state.isLoadingTail){
            return
        }
        var page = cacheResults.nextPage
        this._fetchData(page)

    }
    _hasMore(){
        return cacheResults.items.length != cacheResults.total
    }
    _renderRow = (row) => {
        return (
            <TouchableHighlight
                onPress={() => _navigator.push({name:'Detail',component:Detail,passProps: {itemData:row}})}
                underlayColor='rgba(34,26,38,.1)'
                style={{marginBottom:10,backgroundColor:'#fff',borderBottomColor:'#F7F5F5',borderBottomWidth:1,borderTopWidth:1,borderTopColor:'#F7F5F5'}}>
                <View style={{flex:1,flexDirection:'row',marginLeft:10}}>
                    <View style={{  marginBottom:10,backgroundColor:'#fff',width:width*0.72}}>

                        <View style={styles.flexContainer}>
                            <View style={[styles.type,{ backgroundColor:row.productKey == 'depositInstead'?'#FCAB33':row.productKey == 'timePointSave'?'#74BCF4':'#EF704F'}]}>
                                <Text style={[styles.welcome,{color:"#fff"}]}>

                                    {row.productKey == 'depositInstead'?'保证金代存':row.productKey == 'timePointSave'?'时点存款':'敞口代还'}
                                </Text>
                            </View>
                            <View style={styles.cell}>
                                <Text style={styles.productName}>
                                    {row.borrowerName}
                                </Text>
                                <Text style={[styles.bankName,{fontSize:10}]}>
                                    ({row.bankname})
                                </Text>
                            </View>

                        </View>
                        <View style={[styles.flexContainer]}>
                            <View style={{height: 50,
                                    justifyContent:'center',
                                   }}>
                                <Text style={[styles.welcome,{color:'red',fontSize:11}]}>
                                    {row.planMoney/10000}万
                                </Text>
                                <Text style={[styles.welcome,{color:'#9D9D9D',fontSize:11}]}>
                                    融资金额
                                </Text>
                            </View>
                            <View style={styles.cellfixed}>
                                <Text style={styles.welcome}>
                                    时点存款
                                </Text>
                                <Text style={[styles.welcome,{color:'#9D9D9D',fontSize:11}]}>
                                    业务类型
                                </Text>
                            </View>
                            <View style={styles.cellfixed}>
                                <Text style={styles.welcome}>
                                    {row.bidLimit}天
                                </Text>
                                <Text style={[styles.welcome,{color:'#9D9D9D',fontSize:11}]}>
                                    投资天数
                                </Text>
                            </View>
                            <View style={styles.cellfixed}>
                                <Text style={styles.welcome}>
                                    {row.dayRate}%
                                </Text>
                                <Text style={[styles.welcome,{color:'#9D9D9D',fontSize:11}]}>
                                    日化利率
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{flex:1,alignItems: 'center', justifyContent: 'center',backgroundColor:'#fff'}}>
                        <Progress.Circle size={60}    animated={true} thickness={4} progress={0.6} showsText={true} />
                    </View>
                </View>
            </TouchableHighlight>)

    }






}
const styles=StyleSheet.create({
    container:{

    },
    content:{
        width:width,
        height:height,
        backgroundColor:'yellow',
        justifyContent:'center',
        alignItems:'center'
    },
    cell:{
        height:100,
        backgroundColor:'#ddd',
        alignItems:'center',
        justifyContent:'center',
        borderBottomColor:'#ececec',
        borderBottomWidth:1

    },
    page: {
        flex: 1,
        height: 140,
        resizeMode: 'stretch'
    },
    menuView: {

        flexDirection: 'row',
        marginTop: 20
    },

    priceText: {
        flex: 1,
        alignSelf: 'flex-start',
        textAlign: 'left',
        fontSize: 13,
        color: '#f15353'
    },

    item:{
        width:width - 95,
        marginBottom:10,
        backgroundColor:'#fff',

        paddingLeft:15

    },

    title:{
        padding:10,
        fontSize:18,
        color:'#333'
    },
    itemFooter:{
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'#eee'
    },
    handleBox:{
        padding:10,
        flexDirection:'row',
        width:width / 2 - 0.5,
        justifyContent:'center',
        backgroundColor:'#fff'
    },

    handleText:{
        paddingLeft:12,
        fontSize:18,
        color:'#333'
    },
    up:{
        fontSize:22,
        color:'#333'
    },

    flexContainer: {
        // 容器需要添加direction才能变成让子元素flex
        flex:1,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center'

    },
    cell: {
        flex: 1,
        height: 50,
        marginLeft:10,
        alignItems: 'center', justifyContent: 'center'


    },
    welcome: {
        fontSize: 10,
        textAlign: 'center',
        justifyContent:'center',
        margin: 5,

    },
    bankName:{
        fontSize: 9,


        color:'#9D9D9D',


    },
    productName:{

        fontSize:12
    },
    cellfixed: {

        justifyContent:'center',
    },
    type: {
        height: 30,

        width:70,
        justifyContent:'center'


    },
    loadingMore:{
        marginVertical:20
    },
    loadingText:{
        color:"#777",
        textAlign:'center'
    }

})
