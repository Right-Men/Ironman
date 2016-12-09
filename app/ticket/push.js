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
    TouchableHighlight

} from 'react-native';
import {
    SwRefreshScrollView,
    SwRefreshListView,
    RefreshStatus,
    LoadMoreStatus
} from 'react-native-swRefresh'
import  request from '../common/request'

const {width,height}=Dimensions.get('window')
var _navigator;
import Detail from '../home/productDetail'
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

    componentDidMount() {
        _navigator = this.props.navigator;
        this._fetchData(0)
    }
    //私有方法
    _fetchData(start){

        request.get('http://139.129.234.183:8360/api/list/public/'+start+'/7',{})
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
                    <View style={{width:width*0.72,marginBottom:10, backgroundColor:'#fff',}}>

                        <View style={styles.flexContainer}>

                            <View style={styles.cell}>
                                <Text style={styles.productName}>
                                    {row.borrowerName}
                                </Text>
                            </View>
                            <View style={styles.cellfixed}>
                                <Text style={[styles.bankName,{fontSize:10}]}>
                                    ({row.bankname})
                                </Text>
                            </View>
                        </View>
                        <View style={[styles.flexContainer]}>
                            <View style={{height: 50,
                                    justifyContent:'center',
                                   }}>
                                <Text style={[styles.welcome,{color:'red',fontSize:13}]}>
                                    {row.planMoney/10000}万
                                </Text>
                                <Text style={[styles.welcome,{color:'#9D9D9D',fontSize:11}]}>
                                    融资金额
                                </Text>
                            </View>
                            <View style={styles.cellfixed}>
                                <Text style={[styles.welcome,{fontSize:13}]}>
                                    时点存款
                                </Text>
                                <Text style={[styles.welcome,{color:'#9D9D9D',fontSize:11}]}>
                                    业务类型
                                </Text>
                            </View>
                            <View style={styles.cellfixed}>
                                <Text style={[styles.welcome,{color:'#F59C00',fontSize:13}]}>
                                    {row.dayRate}天
                                </Text>
                                <Text style={[styles.welcome,{color:'#9D9D9D',fontSize:11}]}>
                                    投资天数
                                </Text>
                            </View>
                            <View style={styles.cellfixed}>
                                <Text style={[styles.welcome,{color:'#F59C00',fontSize:13}]}>
                                    {row.dayRate}%
                                </Text>
                                <Text style={[styles.welcome,{color:'#9D9D9D',fontSize:11}]}>
                                    日化利率
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{flex:1,alignItems: 'center', justifyContent: 'center'}}>
                        <Progress.Circle size={70}    animated={true} thickness={4} progress={0.6} showsText={true} />
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
        this._fetchData(0)
        end()
    }

    /**
     * 加载更多
     * @param end
     * @private
     */
    _onLoadMore(end){
        this._page++
        this._fetchData(this._page*7)
        end(this._page*7/this.state.dataLength>1)
    }


}
const styles=StyleSheet.create({


    cell:{

        backgroundColor:'#fff',
        // flex: 1,
        height: 50,

        alignItems: 'center', justifyContent: 'center'

    },

    flexContainer: {
        // 容器需要添加direction才能变成让子元素flex
        flex:1,
        flexDirection: 'row',
        justifyContent:'space-between'

    },

    welcome: {
        fontSize: 13,
        textAlign: 'center',
        justifyContent:'center',
        margin: 5,

    },
    bankName:{
        fontSize: 9,
        textAlign: 'center',
        justifyContent:'center',
        color:'#9D9D9D',

    },
    productName:{

        fontSize:12
    },
    cellfixed: {
        height: 50,
        justifyContent:'center',
    },
    type: {
        height: 30,
        marginTop:10,
        justifyContent:'center'


    }

})
