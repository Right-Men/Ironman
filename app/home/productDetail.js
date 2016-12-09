
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
    ScrollView,
    TextInput
} from 'react-native';
import Title from '../common/title'

import Modal from 'react-native-modalbox'
import Button from 'react-native-button'
import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';
const {width,height} = Dimensions.get("window");

var _navigator;
class ProductDetail extends Component{


    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            text:null
        };


        _navigator = this.props.navigator;

    }

    componentDidMount() {

    }

    _openModal_yx =() =>{

        this.refs.modal_yx.open();
    }
    _closeModal_yx =() =>{
        this.refs.modal_yx.close();
    }
    _openModal_bj =() =>{

        this.refs.modal_bj.open();
    }
    _closeModal_bj =() =>{
        this.refs.modal_bj.close();
    }
    render(){
        return(


            <View style={{flex:1,backgroundColor:'#F7F5F5'}}>
                {/*title*/}
                <Title titleName="我要投资详情" navigator={this.props.navigator} canBack={true} />
                {/*banner*/}
                <View style={{ }}>
                    <Image
                        source={require('../../images/account/user-bg.jpg')}
                        style={styles.thumb}
                    >

                        <View style={{height: width*0.4,backgroundColor:'transparent', alignItems: 'center',justifyContent:'center'}}>
                            <Text style={{ backgroundColor:'transparent', color:'#fff', fontSize:14, fontWeight:'400'}}>融资金额(万)</Text>
                            <View style={{height: width*0.28,width:width*0.28, backgroundColor:'#rgba(223,224,226,.2)',borderRadius:52.5, alignItems: 'center', justifyContent: 'center'}}>
                                <View style={{height: width*0.25,width:width*0.25, backgroundColor:'#rgba(223,224,226,.6)',borderRadius:48.5, alignItems: 'center', justifyContent: 'center'}}>
                                    <View style={{height: width*0.22,width:width*0.22, backgroundColor:'#DFE0E2',borderRadius:50, alignItems: 'center', justifyContent: 'center'}}>
                                         <Text style={{ backgroundColor:'transparent', color:'#F6A241', fontSize:30, fontWeight:'400'}}>{this.props.itemData.planMoney/10000}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'center',backgroundColor:'rgba(0, 0, 0, .4)', height:width*0.1,width:width}}>
                            <View style={{width:width*0.33}}>
                                <Text style={{  color:'#fff', fontSize:12, fontWeight:'400',textAlign: 'center'}}>日化利率:<Text style={{color:"#F6A241" }}>{this.props.itemData.dayRate}‰</Text></Text>
                            </View>
                            <View style={{width:width*0.33}}>
                                <Text style={{  color:'#fff', fontSize:12, fontWeight:'400',textAlign: 'center'}}>投资天数:<Text style={{color:"#F6A241" }}>{this.props.itemData.bidLimit}天</Text></Text>
                            </View>
                            <View style={{width:width*0.33}}>
                                <Text style={{ color:'#fff', fontSize:12, fontWeight:'400',textAlign: 'center' }}>招标截止:<Text style={{color:"#F6A241" }}>2016.3.10</Text></Text>
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

                       tabBarUnderlineStyle={{backgroundColor: '#E1E0E1',height:1}}
                       tabBarUnderlineColor='#F6A341'
                       tabBarBackgroundColor='#F7F5F5'
                       tabBarActiveTextColor='#F6A341'
                       tabBarInactiveTextColor='#686868'
                       tabBarTextStyle={{fontSize: 15,fontWeight:'400'}}
                    >

                        <ProductInfo tabLabel="产品介绍" />
                        <InvestRecord tabLabel="投资记录" />
                        <ProjectSchedule tabLabel="项目进程" />

                    </ScrollableTabView>
                </View>
                {/*底部button*/}
                <View style={{backgroundColor:'#3D9EE7',width:width,bottom:0,height:50,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                    <TouchableHighlight
                        onPress={this._openModal_yx}
                        underlayColor='rgba(34,26,38,.1)'
                        style={{width:width * 0.5,height:50,justifyContent:'center'}}>

                        <Text style={{color:'#fff',textAlign: 'center'}}>我有意向</Text>
                    </TouchableHighlight>
                    <View style={{backgroundColor:'#ddd',height:50,width: 1}}></View>
                    <TouchableHighlight
                        onPress={this._openModal_bj}
                        underlayColor='rgba(34,26,38,.1)'
                        style={{width:width * 0.5,height:50,justifyContent:'center'}}>
                        <Text style={{color:'#fff',textAlign: 'center'}}>我要报价</Text>
                    </TouchableHighlight>
                </View>
                {/*弹出框*/}
                <Modal style={{ width:width*0.9, height: 250,bottom:70, backgroundColor: "#fff",borderWidth:1,borderColor:'#fff',borderRadius:4}} backdrop={true}  backButtonClose={true} position={"bottom"} ref={"modal_yx"}>

                    <View style={{flex:1,justifyContent:'space-around',alignItems:'center'}}>
                            <Image source={require('../../images/account/server.png')}
                                      style={{width:80,height:80}}/>
                            <Text style={{fontSize:20,fontWeight:'400'}}>请耐心等待工作人员的联系</Text>
                        <View>
                            <Button
                                containerStyle={{borderWidth:1,borderColor:'#3686C0',borderRadius:4}}
                                style={{padding:5,width:width*0.4,height:35,backgroundColor:'#3686C0',color:'#fff',fontSize:16}}
                                onPress={this._closeModal_yx}>确认</Button>
                        </View>
                    </View>
                </Modal>
                <Modal style={{width:width*0.9,height: 260, backgroundColor: "#fff",borderWidth:1,borderColor:'#fff',borderRadius:5}}backdrop={true}  backButtonClose={true} position={"center"} ref={"modal_bj"}>
                    <View>
                        <Text style={{margin: 20,fontSize:18}}>购买份额（份）</Text>
                        <View style={{margin:10,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <TextInput
                                keyboardType="numeric"
                                clearButtonMode="while-editing"
                                underlineColorAndroid="transparent"
                                textAlign='center'
                                placeholder="请输入投资份数"
                                style={{height: 40,width:width*0.7, borderColor: '#60A7E9', borderWidth: 1,borderRadius:3}}
                                onChangeText={(text) => this.setState({text})}
                            />
                            <Text style={{marginLeft:10,fontSize:17}}>份</Text>
                        </View>
                        <View style={{width:width*0.9,marginTop:20}}>
                            <View style={{flexDirection:'row'}}>
                                <View style={{justifyContent:'center',flex: 1,flexDirection:'row'}}>
                                    <Image source={require('../../images/account/money_s.png')}
                                            style={{width:15,height:15}}/>
                                    <Text>投资金额</Text>
                                </View>
                                <View style={{justifyContent:'center',flex: 1,flexDirection:'row'}}>
                                    <Image source={require('../../images/account/note_s.png')}
                                           style={{width:15,height:15}}/>
                                    <Text>预计收益</Text>
                                </View>
                                <View style={{justifyContent:'center',flex: 1,flexDirection:'row'}}>
                                    <Image source={require('../../images/account/group_s.png')}
                                           style={{width:15,height:15}}/>
                                    <Text>剩余份数</Text>
                                </View>
                            </View>
                            <View style={{marginTop:10,flexDirection:'row'}}>
                                <Text style={{flex: 1,textAlign:'center',color:'#FDB55F'}}>8888888元</Text>
                                <Text style={{flex: 1,textAlign:'center'}}>599元</Text>
                                <Text style={{flex: 1,textAlign:'center'}}>5份</Text>
                            </View>

                        </View>

                        <View style={{alignItems:'center',marginTop:20}}>
                            <Button
                                containerStyle={{borderWidth:1,borderColor:'#3686C0',borderRadius:4}}
                                style={{padding:5,width:width*0.4,height:35,backgroundColor:'#3686C0',color:'#fff',fontSize:16}}
                                onPress={this._closeModal_bj}>确认</Button>
                        </View>
                    </View>


                </Modal>
            </View>

        )
    }




}

class ProductInfo extends Component{

    render(){
        return(
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{height:30,width:width,justifyContent:'center',paddingLeft: 20}}>
                <Text>融资企业信息</Text>
            </View>
            <View style={{backgroundColor:'#fff',height:60,width:width,justifyContent:'center'}}>
        <View style={{flexDirection:'row',paddingTop:7}}>
            <Text style={{width:  width*0.3,paddingLeft: 20,color:'#999'}}>企业名称:</Text ><Text style={{width: width*0.7,color:'#999'}}>大连丰隆资产</Text>
        </View>
        <View  style={{flexDirection:'row',paddingTop:7}}>
        <Text style={{width:  width*0.3,paddingLeft:34,color:'#999'}}>联系人:</Text><Text style={{width: width*0.7,color:'#999'}}>刘</Text>
        </View>
        </View>
                <View>
                    <View style={{height:30,width:width,justifyContent:'center',paddingLeft: 20}}>
                        <Text>股东信息</Text>
                    </View>
                    <View style={{backgroundColor:'#fff',height:60,width:width,justifyContent:'center',flexDirection:'row'}}>
                        <View style={{margin:2,width:width*0.5,borderWidth:1,borderColor:"#F5F5F5",justifyContent:'center'}}>
                        <View style={{flexDirection:'row',paddingTop:5}}>
                            <Text style={{paddingLeft: 20,color:'#999',fontSize:12}}>姓名：</Text ><Text style={{color:'#999',fontSize:12}}>大连丰隆资产</Text>
                        </View>
                        <View  style={{flexDirection:'row',paddingTop:5}}>
                            <Text style={{color:'#999',paddingLeft: 18,fontSize:12}}>持股比例：</Text><Text style={{color:'#999',fontSize:12}}>10%</Text>
                        </View>
                        </View>
                        <View style={{margin:2,width:width*0.5,borderWidth:1,borderColor:"#F5F5F5",justifyContent:'center'}}>
                            <View style={{flexDirection:'row',paddingTop:5}}>
                                <Text style={{paddingLeft: 20,color:'#999',fontSize:12}}>姓名：</Text ><Text style={{color:'#999',fontSize:12}}>大连丰隆资产</Text>
                            </View>
                            <View  style={{flexDirection:'row',paddingTop:5}}>
                                <Text style={{color:'#999',paddingLeft: 18,fontSize:12}}>持股比例：</Text><Text style={{color:'#999',fontSize:12}}>10%</Text>
                            </View>
                        </View>
                    </View>

                </View>
                <View>
                    <View style={{height:30,width:width,justifyContent:'center',paddingLeft: 20}}>
                        <Text>高管信息</Text>
                    </View>
                    <View style={{backgroundColor:'#fff',height:60,width:width,justifyContent:'center',flexDirection:'row'}}>
                        <View style={{margin:2,width:width*0.5,borderWidth:1,borderColor:"#F5F5F5",justifyContent:'center'}}>
                            <View style={{flexDirection:'row',paddingTop:5}}>
                                <Text style={{paddingLeft: 20,color:'#999',fontSize:12}}>姓名：</Text ><Text style={{color:'#999',fontSize:12}}>李四</Text>
                                <Text style={{color:'#999',fontSize:12,marginLeft:15}}>职位：</Text><Text style={{color:'#999',fontSize:12}}>经理</Text>
                            </View>
                            <View  style={{flexDirection:'row',paddingTop:5}}>
                                <Text style={{color:'#999',paddingLeft: 18,fontSize:12}}>联系方式：</Text><Text style={{color:'#999',fontSize:12}}>13377888999</Text>
                            </View>
                        </View>
                        <View style={{margin:2,width:width*0.5,borderWidth:1,borderColor:"#F5F5F5",justifyContent:'center'}}>
                            <View style={{flexDirection:'row',paddingTop:5}}>
                                <Text style={{paddingLeft: 20,color:'#999',fontSize:12}}>姓名：</Text ><Text style={{color:'#999',fontSize:12}}>李四</Text>
                                <Text style={{color:'#999',fontSize:12,marginLeft:15}}>职位：</Text><Text style={{color:'#999',fontSize:12}}>经理</Text>
                            </View>
                            <View  style={{flexDirection:'row',paddingTop:5}}>
                                <Text style={{color:'#999',paddingLeft: 18,fontSize:12}}>联系方式：</Text><Text style={{color:'#999',fontSize:12}}>13377888999</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{height:30,width:width,justifyContent:'center',paddingLeft: 20}}>
                        <Text>图片资料</Text>
                    </View>
                    <View style={{backgroundColor:'#fff',width:width,justifyContent:'center',flexDirection:'row'}}>
                        <View style={{margin:2,width:width*0.5,borderWidth:1,borderColor:"#F5F5F5",justifyContent:'center'}}>
                            <View style={{ padding:7,}}>
                              <Image  source={require('../../images/account/pj-pic1.jpg')}
                                      style={{height:100,width:width*0.5 - 20}}
                                      ></Image>
                             </View>

                        </View>
                        <View style={{margin:2,width:width*0.5,borderWidth:1,borderColor:"#F5F5F5",justifyContent:'center'}}>
                            <View style={{ padding:7,}}>
                                <Image  source={require('../../images/account/pj-pic2.jpg')}
                                        style={{height:100,width:width*0.5 - 20}}
                                ></Image>
                              </View>

                        </View>
                    </View>
                    <View style={{height:30,width:width,justifyContent:'center',paddingLeft: 20}}>
                        <Text>信用评级</Text>
                    </View>
                    <View style={{backgroundColor:'#fff',height:30,width:width,justifyContent:'center',flexDirection:'row'}}>
                        <Text style={{width:  width,paddingLeft: 20,paddingTop:7,color:'#999'}}>A级</Text >

                    </View>

                </View>

        </ScrollView>

         )
}

}

class InvestRecordItem extends Component{
    render(){
        return(
            <View>
        <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',justifyContent:'center'}}>
            <Text style={styles.investRecordTitle}>{this.props.name}</Text>
            <Text style={styles.investRecordTitle}>{this.props.num}份</Text>
            <Text style={styles.investRecordTitle}>{this.props.count}万</Text>
            <Text style={styles.investRecordTitle}>{this.props.date}</Text>
        </View>
        <View style={{backgroundColor:'#F7F5F5',height:1}}></View>
            </View>
        )
    }
}
class InvestRecord extends Component{

    render(){
        return(
            <View>
            <View style={{flexDirection:'row',height:50,backgroundColor:'#F7F5F5',  justifyContent:'center'}}>
                <Text style={styles.investRecordTitle}>投资人</Text>
                <Text style={styles.investRecordTitle}>投资份数</Text>
                <Text style={styles.investRecordTitle}>投资金额</Text>
                <Text style={styles.investRecordTitle}>投资时间</Text>
            </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                <InvestRecordItem name="张**" num="5" count="500" date="2013-02-1"  />
                <InvestRecordItem name="李**" num="5" count="500" date="2013-02-1"  />
                <InvestRecordItem name="王**" num="5" count="500" date="2013-02-1"  />
                <InvestRecordItem name="刘**" num="5" count="500" date="2013-02-1"  />
                <InvestRecordItem name="赵**" num="5" count="500" date="2013-02-1"  />
                <InvestRecordItem name="刘**" num="5" count="500" date="2013-02-1"  />
                <InvestRecordItem name="赵**" num="5" count="500" date="2013-02-1"  />
                <InvestRecordItem name="刘**" num="5" count="500" date="2013-02-1"  />
                <InvestRecordItem name="赵**" num="5" count="500" date="2013-02-1"  />
                <InvestRecordItem name="赵**" num="5" count="500" date="2013-02-1"  />


                </ScrollView>

        </View>

        )
    }

}
class ProjectScheduleItem extends Component{
 render(){

     return(
         <View>
             <View style={{ backgroundColor:'#fff', flexDirection:'row'}}>
                 <View style={{width:90,backgroundColor:'#F7F5F5',margin: 15,borderRadius:50}}>
                     <Image source={this.props.renderIcon}
                            style={{width:50,height:50,margin:20}}
                     />
                 </View>
                 <View style={{width:width*0.7,justifyContent:'center',margin: 25}}>
                     <Text>{this.props.title}</Text>
                     <Text style={{color:'#878787',marginTop:10}}>{this.props.info}</Text>
                 </View>
             </View>
         </View>
     )
 }
}
class ProjectSchedule extends Component{

    render(){
        return(
            <View>
                <ScrollView showsVerticalScrollIndicator={false}>
                <ProjectScheduleItem  renderIcon={require('../../images/account/alarm.png')}  title="发布时间" info="2016.08.10    15：00"  />
                <ProjectScheduleItem  renderIcon={require('../../images/account/calculator.png')}  title="计划金额" info="500000元"  />
                <ProjectScheduleItem  renderIcon={require('../../images/account/group.png')}  title="参与人数" info="6人"  />
                <ProjectScheduleItem  renderIcon={require('../../images/account/money.png')}  title="赚取收益" info="60000"  />
                </ScrollView>
            </View>
        )
    }

}


var styles = StyleSheet.create({
    modalYX: {
        height: 230,
        backgroundColor: "#3B5998"
    },
    modalBJ: {
        height: 230,
        backgroundColor: "#3B5998"
    },
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
    cellfixed: {
        height: 50,
        width: 80,
        backgroundColor: '#fefefe',

    },
    investRecordTitle:{
        flex: 1,
        textAlign: 'center',
        margin:15,
        fontSize:13
    }
});


module.exports = ProductDetail;
















