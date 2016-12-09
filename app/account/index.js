
import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions,
    TouchableHighlight,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import Accountdetile from './accountdetile'
import Title from '../common/title'
import MyInvest from './myInvest'
import MyTicket from './myTicket'
import Settings from './settings'
import WebViewDemo from '../webTest'
import News from './news'

const {width,height} = Dimensions.get("window");

var _navigator;
class Account extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
        _navigator = this.props.navigator;

    }

    componentDidMount() {

    }
    render(){
        return(
        <View style={{flex:1,backgroundColor:'#F7F5F5'}}>
            <Title titleName="用户中心" navigator={this.props.navigator} canBack={false} />
            <View style={{position:'relative'}}>
                <Image
                    source={require('../../images/account/user-bg.jpg')}
                    style={styles.thumb}
                >

                    <View style={{height:width*0.4 ,backgroundColor:'transparent', alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{ backgroundColor:'transparent', color:'#fff', fontSize:38, fontWeight:'400'}}>8888</Text>
                        <Text style={{ backgroundColor:'transparent', color:'#fff', fontSize:12, fontWeight:'400' }}>票面总金额(万)</Text>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'center',alignItems:'center',backgroundColor:'rgba(0, 0, 0, .4)',height:width * 0.1,width:width}}>
                        <View style={{width:width*0.5,flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
                            <Text style={{  color:'#fff', fontSize:13, fontWeight:'400',textAlign: 'center'}}>累计投资：</Text>
                            <Text style={{  color:'#E69842', fontSize:13, fontWeight:'400',textAlign: 'center'}}>127.65</Text>
                            <Text style={{  color:'#E69842', fontSize:9, fontWeight:'400',textAlign: 'center'}}> (元)</Text>
                        </View>
                        <View style={{width:width*0.5,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <Text style={{ color:'#fff', fontSize:13, fontWeight:'400',textAlign: 'center' }}>累计投资：</Text>
                            <Text style={{ color:'#E69842', fontSize:13, fontWeight:'400',textAlign: 'center' }}>60</Text>
                            <Text style={{ color:'#E69842', fontSize:9, fontWeight:'400',textAlign: 'center' }}> (笔)</Text>
                        </View>
                    </View>
                </Image>
            </View>
            <ScrollView>
            <TouchableOpacity
                     onPress={() => _navigator.push({name:'Accountdetile',component:Accountdetile})}>
                 <AccountItem title="账号总览"   imgSource={require('../../images/account/account_index.png')}    />
            </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => _navigator.push({name:'MyInvest',component:MyInvest})}>
            <AccountItem title="我的投资" navigator={_navigator} imgSource={require('../../images/account/invest_index.png')}  />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => _navigator.push({name:'MyTicket',component:MyTicket})}>
                        <AccountItem title="我的票源" navigator={_navigator} imgSource={require('../../images/account/ticket_index.png')} noBorder={true} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => _navigator.push({name:'Settings',component:Settings})}>
           <AccountItem title="账号设置" navigator={this.props.navigator} imgSource={require('../../images/account/setting_index.png')} mgTop={true}   />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => _navigator.push({name:'News',component:News})}>
            <AccountItem title="消息中心" navigator={_navigator} imgSource={require('../../images/account/message_index.png')}  noBorder={true} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => _navigator.push({name:'WEB',component:WebViewDemo})}>
                    <AccountItem title="WEBVIEW" navigator={_navigator} imgSource={require('../../images/account/message_index.png')}  noBorder={true} />
                </TouchableOpacity>
            </ScrollView>
        </View>
        )
    }
}
class AccountItem extends Component{
    setNativeProps(nativeProps) {
        this._root.setNativeProps(nativeProps);
    }
    render(){
        return(

            <View ref={component => this._root = component} {...this.props}>
                <View style={this.props.mgTop? styles.flexContainer: styles.otherFlexContainer}>
                    <View style={styles.cellfixed}>
                        <Image
                            source={this.props.imgSource}
                            style={{width:30,height:30,margin:10}}>
                        </Image>
                    </View>
                    <View style={this.props.noBorder?styles.cell_noBorder:styles.cell}>
                        <Text style={styles.gotoName}>
                            {this.props.title}
                        </Text>
                    </View>
                    <View style={ this.props.noBorder?styles.goto_noBorder:styles.goto}>
                        <Image
                            source={require('../../images/account/arrow_right.png')}
                            style={{width:20,height:20,marginLeft:40,marginTop:10,marginBottom:10}}>
                        </Image>
                    </View>

                </View>
            </View>

        )
    }
}

var styles = StyleSheet.create({
    header:{
        paddingTop:25,
        paddingBottom:12,
        backgroundColor:'#42AFF0'
    },
    headerTitle:{
        color:'#fff',
        fontSize:16,
        textAlign:'center',
        fontWeight:'600'
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
        borderBottomColor:'#EEEEEE'
    },
    cell_noBorder: {
        flex: 1,
        height: 50,
        backgroundColor: '#fff'

    },
    welcome: {
        fontSize: 20,
        textAlign: 'right',
        margin: 10,
        color:'#666'
    },
    gotoName:{
        fontSize: 16,
        textAlign: 'left',
        padding: 15,
        color:'#666'
    },
    goto:{
        height: 50,
        width: 80,
        backgroundColor: '#fefefe',
        borderBottomWidth:1,
        borderBottomColor:'#EEEEEE'
    },
    goto_noBorder:{
        height: 50,
        width: 80,
        backgroundColor: '#fefefe',

    },
    cellfixed: {
        height: 50,
        width: 50,
        backgroundColor: '#fefefe',

    }
});


export default Account;











