/**
 * Created by fandongyang on 2016/12/9.
 */
/**
 * Created by fandongyang on 2016/12/4.
 */

import React, {Component} from 'react';
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
    RefreshControl,
    Image

} from 'react-native';

import  request from './common/request'
import Config from './common/config'
const {width, height}=Dimensions.get('window')

var _navigator;

import Detail from './home/productDetail'




export default class Invest1 extends Component {
    _dataSource = new ListView.DataSource({rowHasChanged:(row1,row2)=>row1 !== row2})
    // 构造
    constructor(props) {

        super(props);

        // 初始状态
        this.state = {
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
        var URL = Config.api.release + Config.api.invest +  this.pageIndex * 10 + '/10';
        request.get(URL).then((responseText) => {
            var data = responseText;
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
                    /* alert('没有更多数据了')*/
                }
            })
        }

    };

    _renderFooter = () => {
        if (!this.state.hasMore) {
            return (
                <View style={styles.loadingMore}>
                    <Text style={styles.loadingText}>没有更多数据了</Text>
                </View> )
        }

    }

    render(){

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


    _renderRow = (row) => {
        console.log(row)
        return (
            <TouchableHighlight
                onPress={() => _navigator.push({name: 'Detail', component: Detail, passProps: {itemData: row}})}
                underlayColor='rgba(34,26,38,.1)'
                style={{marginBottom: 10, backgroundColor: '#fff', borderBottomColor: '#F7F5F5', borderBottomWidth: 1, borderTopWidth: 1, borderTopColor: '#F7F5F5'}}>
                <View style={{width: width, backgroundColor: '#fff', marginBottom: 10}}>
                    <View style={{flexDirection: 'row', height: 40, alignItems: 'center'}}>
                        <Text style={{marginLeft: 10, width: 80}}>
                           {row.productKey == 'depositInstead' ? '保证金代存' : row.productKey == 'timePointSave' ? '时点存款' : '敞口代还'}</Text>
                        <View style={{flexDirection: 'row', marginLeft: 20,}}>
                            <Text>投资进度 {row.planId} </Text>
                            <Text style={{justifyContent: 'center', color: 'red', marginLeft: 10, textDecorationLine: 'underline'}}>查看</Text>
                        </View>
                    </View>
                    <View style={{width: width, height: 1, backgroundColor: '#ccc', marginBottom: 10}}/>
                  <View style={{flex: 1}}>
                        <View style={{marginBottom: 10, backgroundColor: '#fff', flex: 1, marginLeft: 10, marginRight: 10}}>

                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', height: 35, alignItems: 'center'}}>


                                <Text style={styles.productName}>
                                    {row.borrowerName}
                                </Text>
                                <Image style={{width: 13, height: 13}} source={require('../images/account/house_index.png')}/>
                                <Text style={[styles.bankName, {fontSize: 10, alignItems: 'center'}]}>
                                    ({row.bankname})
                                </Text>


                            </View>
                            <View style={[styles.flexContainer]}>
                                <View style={{
                                    height: 50,
                                    justifyContent: 'center',
                                }}>
                                    <Text style={[styles.welcome, {color: 'red', fontSize: 11}]}>
                                        {row.planMoney / 10000}万
                                    </Text>
                                    <Text style={[styles.welcome, {color: '#9D9D9D', fontSize: 11}]}>
                                        融资金额
                                    </Text>
                                </View>
                                <View style={styles.cellfixed}>
                                    <Text style={styles.welcome}>
                                        {row.bidLimit}天
                                    </Text>
                                    <Text style={[styles.welcome, {color: '#9D9D9D', fontSize: 11}]}>
                                        投资天数
                                    </Text>
                                </View>
                                <View style={styles.cellfixed}>
                                    <Text style={styles.welcome}>
                                        {row.dayRate}%
                                    </Text>
                                    <Text style={[styles.welcome, {color: '#9D9D9D', fontSize: 11}]}>
                                        日化利率
                                    </Text>
                                </View>
                                <View style={styles.cellfixed}>
                                    <Text style={styles.welcome}>
                                        {row.dayRate}%
                                    </Text>
                                    <Text style={[styles.welcome, {color: '#9D9D9D', fontSize: 11}]}>
                                        所在地区
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={{width: width, flexDirection: 'row', justifyContent: 'center', marginBottom: 10}}>
                            <View style={{
                                marginRight: 10,
                                width: width * 0.18,
                                height: 23,
                                justifyContent: 'center',
                                backgroundColor: '#EAEBEC',
                                borderWidth: 1,
                                borderColor: '#EAEBEC',
                                borderRadius: 3
                            }}>
                                <Text style={{fontSize: 12, textAlign: 'center'}}>我要预约</Text>
                            </View>
                            <View style={{
                                marginLeft: 10,
                                width: width * 0.18,
                                height: 23,
                                justifyContent: 'center',
                                backgroundColor: '#4BB0F1',
                                borderWidth: 1,
                                borderColor: '#EAEBEC',
                                borderRadius: 3
                            }}>
                                <Text style={{fontSize: 12, textAlign: 'center', color: '#fff'}}>立即投资</Text>
                            </View>
                        </View>

                    </View>
                </View>
            </TouchableHighlight>)

    }
}


const styles = StyleSheet.create({
    container: {},
    content: {
        width: width,
        height: height,
        backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cell: {
        height: 100,
        backgroundColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#ececec',
        borderBottomWidth: 1

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

    item: {
        width: width - 95,
        marginBottom: 10,
        backgroundColor: '#fff',

        paddingLeft: 15

    },

    title: {
        padding: 10,
        fontSize: 18,
        color: '#333'
    },
    itemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#eee'
    },
    handleBox: {
        padding: 10,
        flexDirection: 'row',
        width: width / 2 - 0.5,
        justifyContent: 'center',
        backgroundColor: '#fff'
    },

    handleText: {
        paddingLeft: 12,
        fontSize: 18,
        color: '#333'
    },
    up: {
        fontSize: 22,
        color: '#333'
    },

    flexContainer: {
        // 容器需要添加direction才能变成让子元素flex
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'

    },
    cell: {
        flex: 1,
        height: 50,
        marginLeft: 10,
        alignItems: 'center', justifyContent: 'center'


    },
    welcome: {
        fontSize: 10,
        textAlign: 'center',
        justifyContent: 'center',
        margin: 5,

    },
    bankName: {
        fontSize: 9,


        color: '#9D9D9D',


    },
    productName: {

        fontSize: 12
    },
    cellfixed: {

        justifyContent: 'center',
    },
    type: {
        height: 30,

        width: 70,
        justifyContent: 'center'


    },
    loadingMore: {
        marginVertical: 20
    },
    loadingText: {
        color: "#777",
        textAlign: 'center'
    }

})

