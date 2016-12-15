/**
 * Created by fandongyang on 2016/12/13.
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
    TouchableHighlight,
    ScrollView
} from 'react-native';
import Title from '../common/title'
import Moment from 'moment'
import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';
const {width,height} = Dimensions.get("window");

var _navigator;
class ticketDetail extends Component{


    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};

        _navigator = this.props.navigator;

    }



    render(){
        return(


            <View style={{flex:1,backgroundColor:'#F7F5F5'}}>
                {/*title*/}
                <Title titleName="我要票源详情" navigator={this.props.navigator} canBack={true} />
                {/*banner*/}
                <View style={{position:'relative'}}>
                    <Image
                        source={require('../../images/account/user-bg.jpg')}
                        style={styles.thumb}
                    >
                        {/* "id": 71,
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
                         "state": 1*/}
                        <View style={{flexDirection:'row'}}>
                            <View style={{  height: width*0.4,backgroundColor:'transparent', alignItems: 'center', justifyContent: 'center',marginLeft:20}}>
                                <Text style={{ backgroundColor:'transparent', color:'#fff', fontSize:14, fontWeight:'400',marginTop:width*0.08 }} />
                                <View style={{height: width*0.258,width: width*0.258, backgroundColor:'#rgba(223,224,226,.2)',borderRadius:52.5, alignItems: 'center', justifyContent: 'center'}}>
                                    <View style={{height: width*0.227,width:width*0.227, backgroundColor:'#rgba(223,224,226,.6)',borderRadius:48.5, alignItems: 'center', justifyContent: 'center'}}>
                                        <View style={{height:width*0.195,width:width*0.195, backgroundColor:'#DFE0E2',borderRadius:50, alignItems: 'center', justifyContent: 'center'}}>
                                            <Text style={{ backgroundColor:'transparent', color:'#F6A241', fontSize:15, fontWeight:'400'}}>回款行</Text>
                                            <Text style={{ backgroundColor:'transparent', color:'#F6A241', fontSize:8, fontWeight:'400'}}>{this.props.itemData.bankname}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{flex: 1,height: width*0.4,backgroundColor:'transparent', alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={{ backgroundColor:'transparent', color:'#fff', fontSize:14, fontWeight:'400',marginTop:width*0.027 }}>融资金额(万)</Text>
                                <View style={{height:width*0.28,width:width*0.28, backgroundColor:'#rgba(223,224,226,.2)',borderRadius:52.5, alignItems: 'center', justifyContent: 'center'}}>
                                    <View style={{height:width*0.248,width:width*0.248, backgroundColor:'#rgba(223,224,226,.6)',borderRadius:48.5, alignItems: 'center', justifyContent: 'center'}}>
                                        <View style={{height:width*0.216,width:width*0.216, backgroundColor:'#DFE0E2',borderRadius:50, alignItems: 'center', justifyContent: 'center'}}>
                                            <Text style={{ backgroundColor:'transparent', color:'#F6A241', fontSize:20, fontWeight:'400'}}>{this.props.itemData.faceAmount/10000}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{height: width*0.4,backgroundColor:'transparent', alignItems: 'center', justifyContent: 'center',marginRight:20}}>
                                <Text style={{ backgroundColor:'transparent', color:'#fff', fontSize:14, fontWeight:'400',marginTop:width*0.08 }} />
                                <View style={{height: width*0.258,width: width*0.258, backgroundColor:'#rgba(223,224,226,.2)',borderRadius:52.5, alignItems: 'center', justifyContent: 'center'}}>
                                    <View style={{height: width*0.227,width:width*0.227, backgroundColor:'#rgba(223,224,226,.6)',borderRadius:48.5, alignItems: 'center', justifyContent: 'center'}}>
                                        <View style={{height:width*0.195,width:width*0.195, backgroundColor:'#DFE0E2',borderRadius:50, alignItems: 'center', justifyContent: 'center'}}>
                                            <Text style={{ backgroundColor:'transparent', color:'#F6A241', fontSize:15, fontWeight:'400'}}>{this.props.itemData.billType}</Text>
                                            <Text style={{ backgroundColor:'transparent', color:'#F6A241', fontSize:8, fontWeight:'400'}}>票据种类</Text>

                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'center',backgroundColor:'rgba(0, 0, 0, .4)',height:width*0.1,width:width}}>
                            <View style={{width:width*0.25}}>
                                <Text style={{  color:'#fff', fontSize:10, fontWeight:'400',textAlign: 'center'}}>剩余天数</Text>
                                <Text style={{color:"#F6A241",textAlign: 'center' , fontSize:10}}>{this.props.itemData.surplusDays}天</Text>
                            </View>
                            <View style={{width:width*0.25}}>
                                <Text style={{  color:'#fff', fontSize:10, fontWeight:'400',textAlign: 'center'}}>国股</Text>
                                <Text style={{color:"#F6A241" ,textAlign: 'center', fontSize:10}}>出票行类型</Text>
                            </View>
                            <View style={{width:width*0.25}}>
                                <Text style={{  color:'#fff', fontSize:10, fontWeight:'400',textAlign: 'center'}}>报价截止日</Text>
                                <Text style={{color:"#F6A241" ,textAlign: 'center', fontSize:10}}>{Moment(this.props.itemData.endTime).format("YYYY.MM.DD")}</Text>

                            </View>
                            <View style={{width:width*0.25}}>
                                <Text style={{ color:'#fff', fontSize:10, fontWeight:'400',textAlign: 'center' }}>所在地区</Text>
                                <Text style={{color:"#F6A241",textAlign: 'center', fontSize:10 }}>{this.props.itemData.transArea}</Text>
                            </View>
                        </View>
                    </Image>

                </View>
                {/*投资详情tab*/}
                <View style={{flex:1,backgroundColor:'#F7F5F5'}}>


                    <ScrollableTabView
                        locked={false}
                        initialPage={0}
                        renderTabBar={() => <DefaultTabBar />}
                        tabBarUnderlineStyle = {{backgroundColor:'transparent'}}
                        tabBarUnderlineColor='#F6A341'
                        tabBarBackgroundColor='#FFFFFF'
                        tabBarActiveTextColor='#F6A341'
                        tabBarInactiveTextColor='#686868'
                        tabBarTextStyle={{fontSize: 15,fontWeight:'400'}}
                    >

                        <TicketPic tabLabel="汇票照片" />
                        <TicketInfo tabLabel="票据资料"
                                    bankname = {this.props.itemData.bankname}
                                    maturityDate={this.props.itemData.maturityDate}
                                    issuingDate = {this.props.itemData.issuingDate}
                        />


                    </ScrollableTabView>
                </View>
                {/*底部button*/}
                <View style={{backgroundColor:'#3D9EE7',width:width,bottom:0,height:50,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                    <TouchableHighlight
                        style={{width:width * 0.5}}>
                        <Text style={{color:'#fff',textAlign: 'center'}}>我有意向</Text>
                    </TouchableHighlight>
                    <View style={{backgroundColor:'#ddd',height:50,width: 1}} />
                    <TouchableHighlight   style={{width:width * 0.5}}>
                        <Text style={{color:'#fff',textAlign: 'center'}}>我要报价</Text>
                    </TouchableHighlight>
                </View>

            </View>

        )
    }




}

class TicketPic extends Component{

    render(){
        return(
            <ScrollView showsVerticalScrollIndicator={false}>



                <View>


                    <View style={{height:30,width:width,justifyContent:'center',paddingLeft: 20}}>
                        <Text>票据正面</Text>
                    </View>
                    <View style={{backgroundColor:'#fff',width:width,justifyContent:'center',flexDirection:'row'}}>
                        <View style={{margin:2,width:width*0.5,borderWidth:1,borderColor:"#F5F5F5",justifyContent:'center'}}>
                            <View style={{ padding:7,}}>
                                <Image  source={require('../../images/account/pj-pic1.jpg')}
                                        style={{height:100,width:width*0.5 - 20}}
                                />
                            </View>

                        </View>
                        <View style={{margin:2,width:width*0.5,borderWidth:1,borderColor:"#F5F5F5",justifyContent:'center'}}>
                            <View style={{ padding:7,}}>
                                <Image  source={require('../../images/account/pj-pic1.jpg')}
                                        style={{height:100,width:width*0.5 - 20}}
                                />
                            </View>

                        </View>
                    </View>

                    <View style={{height:30,width:width,justifyContent:'center',paddingLeft: 20}}>
                        <Text>票据背面</Text>
                    </View>
                    <View style={{backgroundColor:'#fff',width:width,justifyContent:'center',flexDirection:'row'}}>
                        <View style={{margin:2,width:width*0.5,borderWidth:1,borderColor:"#F5F5F5",justifyContent:'center'}}>
                            <View style={{ padding:7,}}>
                                <Image  source={require('../../images/account/pj-pic2.jpg')}
                                        style={{height:100,width:width*0.5 - 20}}
                                />
                            </View>

                        </View>
                        <View style={{margin:2,width:width*0.5,borderWidth:1,borderColor:"#F5F5F5",justifyContent:'center'}}>
                            <View style={{ padding:7,}}>
                                <Image  source={require('../../images/account/pj-pic2.jpg')}
                                        style={{height:100,width:width*0.5 - 20}}
                                />
                            </View>

                        </View>
                    </View>



                </View>

            </ScrollView>

        )
    }

}

class TicketInfoItem extends Component{
    render(){
        return(
            <View style={{  flexDirection: 'row',width:width,backgroundColor:'#fff',}}>
                <View style={{ height: 50,width: 35,backgroundColor: '#fff',}}>
                    <Image
                        source={this.props.renderIcon}
                        style={{width:20,height:20,margin:13}}>
                    </Image>
                </View>
                <View style={{backgroundColor: '#fff'}}>
                    <Text style={{ fontSize:16,textAlign: 'center',margin: 13}}>
                        {this.props.title}:
                    </Text>
                </View>
                <View style={{backgroundColor: '#fff'}}>
                    <Text style={{fontSize:16, textAlign: 'center', margin: 13,color:'#666'}}>
                        {this.props.info}
                    </Text>
                </View>
            </View>
        )
    }
}
class TicketInfo extends Component{

    render(){
        return(
            /*     <View>
             <View style={{flexDirection:'row',height:50,backgroundColor:'#F7F5F5',  justifyContent:'center'}}>
             <Text style={styles.investRecordTitle}>投资人</Text>
             <Text style={styles.investRecordTitle}>投资份数</Text>
             <Text style={styles.investRecordTitle}>投资金额</Text>
             <Text style={styles.investRecordTitle}>投资时间</Text>
             </View>


             </View>*/
            /*    <View style={{  flexDirection: 'row',width:width,backgroundColor:'#fff',}}>
             <View style={{ height: 50,width: 35,backgroundColor: '#fff',}}>
             <Image
             source={require('../../images/home_icons/icon1.jpg')}
             style={{width:20,height:20,margin:13}}>
             </Image>
             </View>
             <View style={{backgroundColor: '#fff'}}>
             <Text style={{ fontSize:16,textAlign: 'center',margin: 13}}>
             开票银行:
             </Text>
             </View>
             <View style={{backgroundColor: '#fff'}}>
             <Text style={{fontSize:16, textAlign: 'center', margin: 13,color:'#666'}}>
             北京建设银行北苑分行
             </Text>
             </View>
             </View>*/
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>

                    <TicketInfoItem renderIcon={require('../../images/home_icons/icon1.jpg')} title="开票银行" info={this.props.bankname}  />
                    <View style={{width:width,height:20,backgroundColor:'#F7F5F5'}} />
                    <TicketInfoItem renderIcon={require('../../images/home_icons/icon2.jpg')} title="出票日期" info={this.props.issuingDate}  />
                    <View style={{width:width,height:1,backgroundColor:'#F7F5F5'}} />
                    <TicketInfoItem renderIcon={require('../../images/home_icons/icon3.jpg')} title="出票企业" info="大连丰隆（商票特有）"  />
                    <View style={{width:width,height:20,backgroundColor:'#F7F5F5'}} />
                    <TicketInfoItem renderIcon={require('../../images/home_icons/icon2.jpg')} title="汇票号码" info="2222212121122211111"  />
                    <View style={{width:width,height:20,backgroundColor:'#F7F5F5'}} />
                    <TicketInfoItem renderIcon={require('../../images/home_icons/icon1.jpg')} title="到期日期" info={this.props.maturityDate}  />
                </View>
            </ScrollView>

        )
    }

}




var styles = StyleSheet.create({

    thumb:{
        width:width,
        height:width * 0.5,

    },
    info:{

        position:'absolute',
        bottom:14,
        right:14,
        width:46,
        height:46,
        paddingTop:9,
        paddingLeft:18,
        backgroundColor:'transparent',
        borderColor:'#fff',
        borderWidth:1,
        borderRadius:23,
        color:'#ed7b66'
    },
    flexContainer: {
        // 容器需要添加direction才能变成让子元素flex
        flexDirection: 'row',
        marginTop:20,

    },
    otherFlexContainer: {
        // 容器需要添加direction才能变成让子元素flex
        flexDirection: 'row',


    },
    cell: {
        flex: 1,
        height: 50,
        backgroundColor: '#fff',
        borderBottomWidth:1,
        borderBottomColor:'#ddd'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'right',
        margin: 10,
        color:'#666'
    },
    gotoName:{
        fontSize: 20,
        textAlign: 'left',
        margin: 10,
        color:'#666'
    },
    goto:{
        height: 50,
        width: 80,
        backgroundColor: '#fefefe',
        borderBottomWidth:1,
        borderBottomColor:'#ddd'
    },




});


module.exports = ticketDetail;
















