/**
 * Created by fandongyang on 2016/12/2.
 */
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


} from 'react-native';
import {
    SwRefreshScrollView,
    SwRefreshListView,
    RefreshStatus,
    LoadMoreStatus
} from 'react-native-swRefresh'
import  request from '../common/request'

const {width,height}=Dimensions.get('window')

import Detail from '../ticket/ticketDetail'


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
            this. _fetchData(0);
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
                style={styles.touchStyle}>
                <View style={styles.info}>
                    <View style={styles.leftStyle}>

                        <View style={styles.flexContainer}>

                            <View style={styles.bankTypeView}>
                                <Text style={styles.bankType}>

                                    {row.issuingBankType}
                                </Text>
                            </View>
                            <View style={styles.cell}>
                                <Text style={styles.productName}>
                                    ({row.transArea})
                                </Text>
                            </View>

                        </View>
                        <View style={styles.flexContainer}>
                            <View style={{height: 50,
                                    justifyContent:'center',
                                   }}>
                                <Text style={styles.welcome1}>
                                    {row.billType}
                                </Text>
                                <Text style={styles.welcome2}>
                                    票据种类
                                </Text>
                            </View>
                            <View style={styles.cellfixed}>
                                <Text style={styles.welcome1}>
                                    {row.billType}
                                </Text>
                                <Text style={styles.welcome2}>
                                    票据类型
                                </Text>
                            </View>
                            <View style={styles.cellfixed}>
                                <Text style={styles.welcome1}>
                                    {row.planMoney/10000}万
                                </Text>
                                <Text style={styles.welcome2}>
                                    票面总金额
                                </Text>
                            </View>
                            <View style={styles.cellfixed}>
                                <Text style={styles.welcome1}>
                                    {row.surplusDays}天
                                </Text>
                                <Text style={styles.welcome2}>
                                    剩余天数
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.bottomView}>
                        <View style={styles.bottomView2}>
                            <Text style={styles.btoomText}>查看</Text>
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
    touchStyle:{
        marginBottom:10,backgroundColor:'#fff',borderBottomColor:'#F7F5F5',borderBottomWidth:1,borderTopWidth:1,borderTopColor:'#F7F5F5'
    },
    info:{flex:1,flexDirection:'row',marginLeft:10},
    leftStyle:{  width:width*0.72, marginBottom:10, backgroundColor:'#fff'},
    bankTypeView:{ backgroundColor:'#FB6766',width: 50, height: 30,  justifyContent:'center',borderWidth:1,borderColor:'#FB6766',borderRadius:3,alignItems:'center'},
    bankType:{justifyContent:'center',color:"#fff", fontSize: 16,fontWeight:'500',textAlign: 'center',   margin: 5},
    bottomView:{flex:1,alignItems: 'center', justifyContent: 'center',backgroundColor:'#fff'},
    bottomView2:{borderRadius:3,borderWidth:1,borderColor:'#3D9EE7',alignItems: 'center',justifyContent: 'center',width: width*0.186,height:27,backgroundColor:'#3D9EE7'},
    bottomText:{fontSize:15,color:'#fff'},
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

    welcome1: {

        textAlign: 'center',
        justifyContent:'center',
        margin: 5,
        color:'#9D9D9D',fontSize:14

    },
    welcome2: {

        textAlign: 'center',
        justifyContent:'center',
        margin: 5,
        color:'#9D9D9D',fontSize:11

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
