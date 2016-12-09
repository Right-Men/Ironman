
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
    LoadMoreStatus
} from 'react-native-swRefresh'
import  request from './common/request'
import Config from './common/config'
const {width,height}=Dimensions.get('window')
var _navigator;
import Detail from './home/productDetail'
import * as Progress from 'react-native-progress';
export default class Main extends Component{
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
/*
* {
 "errno": 0,
 "errmsg": "",
 "data": [
 {
 "planId": 74,
 "planName": "新丹兰有限公司2016年11月资金业务项目",
 "state": 1,
 "borrowerName": "新丹兰有限公司",
 "planMoney": 2500000,
 "productName": "保证金代存",
 "productKey": "depositInstead",
 "bankname": "中国农业银行股份有限公司 ",
 "planLimit": 4,
 "dayRate": 2.12,
 "area": "吉林",
 "bidLimit": 2323,
 "bidEnd": "2016-11-27T16:00:00.000Z",
 "proportion": 20
 }
 ]
 }*/
    componentDidMount() {
        _navigator = this.props.navigator;
        InteractionManager.runAfterInteractions(() => {
            this._fetchData(0)
        });

    }
    //私有方法
    _fetchData(start){

        request.get(Config.api.release + Config.api.invest+start+'/7',{})
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


    }

})
