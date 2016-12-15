
import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Alert,
    ListView,
    Dimensions,
    TouchableHighlight,
    StatusBar,
    InteractionManager,
    ScrollView

} from 'react-native';
import ViewPager from 'react-native-viewpager';
import MenuButton from '../common/menuButton';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/Ionicons';
import Moment from 'moment'
import Config from '../common/config'
import ProductDetail from './productDetail'
import TicketDetail from './ticketDetail'
import  request from '../common/request'

const BANNER_IMGS = [
    require('../../images/banner/1.jpg'),
    require('../../images/banner/2.jpg'),
    require('../../images/banner/3.jpg'),
    require('../../images/banner/4.jpg'),
    require('../../images/banner/5.jpg'),
    require('../../images/banner/6.jpg'),
    require('../../images/banner/7.jpg'),
];

const len = 160;

const{width,height} = Dimensions.get('window')
var Platform = require('Platform');
//http://192.168.0.58:8360/api/plan/fundsBusiness/3



var _navigator;
class HomePage extends Component {

    constructor(props) {
        super(props);

        // 用于构建DataSource对象
        var dataSource = new ViewPager.DataSource({
            pageHasChanged: (p1, p2) => p1 !== p2,
        });
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        // 实际的DataSources存放在state中
        this.state = {
            progress:0.2,
            animated: true,
            hidden: false,
            pageSource: dataSource.cloneWithPages(BANNER_IMGS),

            listDataSource_money: ds.cloneWithRows([]),
            listDataSource_ticket:ds.cloneWithRows([]),
        }
    }

    componentDidMount() {
        _navigator = this.props.navigator;
        InteractionManager.runAfterInteractions(() => {
            this._fetchData_money()
        });

    }
    //私有方法
    _fetchData_money(){

        fetch(Config.api.release + Config.api.index_money )
            .then((response) => response.json())
            .then((responseText) =>{
                var data = responseText
                this._fetchData_ticket();
                if(data){
                    this.setState({
                        listDataSource_money:this.state.listDataSource_money.cloneWithRows(data.data)
                    })
                }
            })
            .catch((error) => {
                console.warn(error)
            })
    }
    _fetchData_ticket(){
        request.get(Config.api.release + Config.api.index_ticket,{})
            .then((responseText) =>{

                var data = responseText
                if(data){
                    this.setState({

                        listDataSource_ticket:this.state.listDataSource_ticket.cloneWithRows(data.data)
                    })
                }
            })
            .catch((error) => {

                console.warn(error)
            })
    }
    /*
    * {
     "errno": 0,
     "errmsg": "",
     "data": [
     {
     "id": 71,
     "transArea": "北京",
     "billType": "电票",
     "tickId": 43,
     "startTime": "2016-11-23T16:00:00.000Z",
     "endTime": "2016-11-27T16:00:00.000Z",
     "bankname": "中国农业银行股份有限公司 ",
     "issuingDate": "2016-11-24",
     "maturityDate": "2016-11-28",
     "surplusDays": 5,
     "faceAmount": 200000,
     "billCount": 1,
     "discountCount": 3,
     "state": 1
     },

     ]
     }*/

    _renderPage(data, pageID) {
        return (
            <Image
                source={data}
                style={styles.page}/>
        );
    }


    _renderRow_money(row) {

        return(
            <TouchableHighlight
                onPress={() => _navigator.push({name:'Detail',component:ProductDetail,passProps: {itemData:row}})}
                underlayColor='rgba(34,26,38,.1)'
                style={{marginBottom:10,backgroundColor:'#fff',borderBottomColor:'#F7F5F5',borderBottomWidth:1,borderTopWidth:1,borderTopColor:'#F7F5F5'}}>
                <View style={{flex:1,flexDirection:'row',marginLeft:10,backgroundColor:'#fff'}}>
                    <View style={{ width: width*0.2,height:width*0.16}}>
                        <Image source={
                            row.productKey === 'depositInstead'?
                            require('../../images/account/baozhengjindaicun.png'): row.productKey === 'timePointSave'?
                            require('../../images/account/shidiancunkuan.png'):require('../../images/account/changkoudaihuan.png')
                        } style={{width:width*0.2,height:width*0.2}} />
                    </View>
                    <View style={{  marginBottom:10,backgroundColor:'#fff',width:width*0.8 - 20 }}>

                        <View style={{ flex:1,flexDirection: 'row',justifyContent: 'flex-start',height: 35,alignItems:'center' }}>


                                <Text style={styles.productName}>
                                    {row.borrowerName}
                                </Text>
                            <Image style={{width:13,height:13}} source={require('../../images/account/house_index.png')}/>
                                <Text style={[styles.bankName,{fontSize:10,alignItems: 'center'}]}>
                                    ({row.bankname})
                                </Text>


                        </View>
                        <View style={{ flex:1, flexDirection: 'row', justifyContent:'space-between'}}>
                            <View style={{height: 50,
                                    justifyContent:'center',
                                   }}>
                                <Text style={[styles.welcome,{color:'#FB4147',fontSize:11}]}>
                                    {row.planMoney/10000}万
                                </Text>
                                <Text style={[styles.welcome,{color:'#9D9D9D',fontSize:11}]}>
                                    融资金额
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
                            <View style={styles.cellfixed}>
                                <Text style={styles.welcome}>
                                    陕西省
                                </Text>
                                <Text style={[styles.welcome,{color:'#9D9D9D',fontSize:11}]}>
                                    所在地区
                                </Text>
                            </View>


                        </View>
                        <View style={{flexDirection:'row',width:width*0.8-20}}>
                            <View style={{justifyContent:'center',alignItems:'center'}}><Text style={{ fontSize: 12,textAlign: 'center',color:'#4BB0F1'}}>投资进度</Text></View>
                            <View style={{flexDirection:'row',flex:1,justifyContent:'flex-end'}}>
                            <View style={{width:width*0.18,height:23,justifyContent:'center',backgroundColor:'#EAEBEC',borderWidth:1,borderColor:'#EAEBEC',borderRadius:3}}><Text style={{ fontSize: 12,textAlign: 'center'}}>我要预约</Text></View>
                            <View style={{marginLeft:15,width:width*0.18,height:23,justifyContent:'center',backgroundColor:'#4BB0F1',borderWidth:1,borderColor:'#EAEBEC',borderRadius:3}}><Text style={{ fontSize: 12,textAlign: 'center',color:'#fff'}}>立即投资</Text></View>
                            </View>
                        </View>
                    </View>

                </View>
            </TouchableHighlight>
        )



    }
    _renderRow_ticket(row) {
        return (
            <TouchableHighlight
                onPress={() => _navigator.push({name:'Detail',component:TicketDetail,passProps: {itemData:row}})}
                underlayColor='rgba(34,26,38,.1)'
                style={{marginBottom:10,backgroundColor:'#fff',borderBottomColor:'#F7F5F5',borderBottomWidth:1,borderTopWidth:1,borderTopColor:'#F7F5F5'}}>
                {/*
                 {
                 "id": 66,
                 "transArea": "北京",
                 "billType": "纸票",
                 "tickId": 41,
                 "startTime": "2016-11-22T16:00:00.000Z",
                 "endTime": "2016-11-24T16:00:00.000Z",
                 "bankname": "中国工商银行股份有限公司  ",
                 "issuingDate": "2016-11-23",
                 "maturityDate": "2016-11-25",
                 "surplusDays": 3,
                 "faceAmount": 1000000,
                 "billCount": 1,
                 "discountCount": 3,
                 "state": 1
                 }*/}
                <View style={{flex:1,flexDirection:'row',marginLeft:10,backgroundColor:'#fff'}}>
                    <View style={{ width: width*0.2,height:width*0.16}}>
                        <Image source={require('../../images/account/chupiaoyinhang1.png')} style={{width:width*0.2,height:width*0.2}} />



                    </View>
                    <View style={{  width:width*0.8-20, marginBottom:10, backgroundColor:'#fff' }}>


                        <View style={{ flex:1,flexDirection: 'row',justifyContent: 'flex-start',height: 35,alignItems:'center' }}>


                            <Text style={styles.productName}>
                               {/* {row.bankname}*/}国股
                            </Text>
                            <Image style={{width:10,height:10}} source={require('../../images/account/local_index.png')}/>
                            <Text style={[styles.bankName,{fontSize:10}]}>

                                ({row.transArea})
                            </Text>



                        </View>
                        <View style={[ {flexWrap:'wrap',      flex:1,
                                        flexDirection: 'row',
                                        justifyContent:'space-between'}]}>
                            <View style={styles.cellfixed}>
                                <Text style={[styles.welcome,{color:'#FB4147',fontSize:14}]}>
                                    {row.faceAmount/10000}万
                                </Text>
                                <Text style={[styles.welcome,{color:'#9D9D9D',fontSize:11}]}>
                                    票面总金额
                                </Text>
                            </View>

                            <View style={styles.cellfixed}>
                                <Text style={[styles.welcome,{fontSize:11,fontWeight:'500'}]}>
                                    {row.billType}
                                </Text>
                                <Text style={[styles.welcome,{color:'#9D9D9D',fontSize:11}]}>
                                    票据类型
                                </Text>
                            </View>

                            <View style={styles.cellfixed}>
                                <Text style={[styles.welcome,{color:'#F59C00',fontSize:11}]}>
                                    {row.surplusDays}天

                                </Text>
                                <Text style={[styles.welcome,{color:'#9D9D9D',fontSize:11}]}>
                                    剩余天数
                                </Text>
                            </View>
                            <View style={styles.cellfixed}>
                                <Text style={[styles.welcome,{fontSize:11}]}>
                                    {row.billCount}
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
                                    {Moment(row.issuingDate).format("YYYY.MM.DD")}
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
                                    {row.discountCount}次
                                </Text>
                            </View>
                            <View style={[styles.cellfixed,{flex:1}]}>

                                <Text style={[styles.welcome,{color:'#9D9D9D',fontSize:11}]}>

                                </Text>
                                <Text style={[styles.welcome,{color:'#4BB0F1',fontSize:11}]}>

                                </Text>
                            </View>


                        </View>
                        <View style={{flexDirection:'row',width:width*0.8-20}}>
                            <View style={{justifyContent:'center',alignItems:'center'}}><Text style={{ fontSize: 10,textAlign: 'center',color:'#4BB0F1'}}>投资进度</Text></View>
                            <View style={{flexDirection:'row',flex:1,justifyContent:'flex-end'}}>
                                <View style={{height:20,width:width*0.16,justifyContent:'center',backgroundColor:'#EAEBEC',borderWidth:1,borderColor:'#EAEBEC',borderRadius:3}}><Text style={{ fontSize: 10,textAlign: 'center'}}>立即报价</Text></View>
                                <View style={{marginLeft:10,height:20,width:width*0.16,justifyContent:'center',backgroundColor:'#4BB0F1',borderWidth:1,borderColor:'#EAEBEC',borderRadius:3}}><Text style={{ fontSize: 10,textAlign: 'center',color:'#fff'}}>我有意向</Text></View>
                            </View>
                        </View>
                    </View>

                </View>
            </TouchableHighlight>)

    }
    render() {
        return (
            <View style={{flex:1}}>


                <View style={{width:width,height:width*0.45}}>
                    <ViewPager
                        dataSource={this.state.pageSource}
                        renderPage={this._renderPage}
                        isLoop={true}
                        autoPlay={true}/>
                </View>

               <Text style={{color:'#7f7f7f',backgroundColor:'#F7F5F5', fontSize:12,padding:10,height:50 }}>最新公告：最新投资端票据系统App上线了</Text>

             <ScrollView style={{flex:1,marginTop:-20}} showsVerticalScrollIndicator={false}>
                <ListView
                    dataSource={this.state.listDataSource_money}
                    renderRow={this._renderRow_money}
                    style={{backgroundColor:"#F7F5F5"}}
                    enableEmptySections={true}
                    automaticallyAdjustContentInsets = {false}
                    renderHeader={() => {return(
               <View style={{ flex: 1, backgroundColor:'#73BDF4',height: 40,justifyContent:'center',flexDirection:'row',alignItems: 'center'}}>
                    <View style={{width: width*0.25,height: 1,backgroundColor:'#fff',marginRight:15}} />
                    <Text style={{textAlign:'center',color: '#fff'}}>资金业务</Text>
                    <Image style={{width:15,height:15}} source={require('../../images/account/money_index.png')}/>

                    <View style={{width: width*0.25,height: 1,backgroundColor:'#fff',marginLeft:15}} />

                </View>


                )}}
        />
                <ListView
                    dataSource={this.state.listDataSource_ticket}
                    renderRow={this._renderRow_ticket}
                    style={{backgroundColor:"#F7F5F5"}}
                    onEndReachedThreshold={20}
                    enableEmptySections={true}
                    automaticallyAdjustContentInsets = {false}
                    renderHeader={() => {return(
                <View style={{ flex: 1, backgroundColor:'#FB7682',height: 40,justifyContent:'center',flexDirection:'row',alignItems: 'center'}}>
                       <View style={{width: width*0.25,height: 1,backgroundColor:'#fff',marginRight:15}} />
                      <Text style={{textAlign:'center',color: '#fff'}}>票据业务</Text>
                      <Image style={{width:15,height:15}} source={require('../../images/account/ticket_index_title.png')}/>
                      <View style={{width: width*0.25,height: 1,backgroundColor:'#fff',marginLeft:15}} />
                </View>


                )}}
                />
            </ScrollView>
            </View>


        )
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        width:width,
        height: width*0.45,
        resizeMode: 'stretch',

    },

    flexContainer: {
        // 容器需要添加direction才能变成让子元素flex
        flex:1,
        flexDirection: 'row',
        justifyContent:'space-between'

    },
    cell: {
         flex: 1,
        height: 50,
        marginLeft:10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row'


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
        textAlign:'center'

    },
    productName:{

        fontSize:12
    },
    cellfixed: {

        justifyContent:'center',
    },
    type: {

        height: 30,
        marginTop:10,
        width:70,
        justifyContent:'center',



    }
});

module.exports = HomePage;
