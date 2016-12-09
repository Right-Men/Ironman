/**
 * Created by fandongyang on 2016/11/30.
 */
/**
 * Created by fandongyang on 2016/11/30.
 */
import React,{Component} from 'react';
import {

    StyleSheet,
    View,
    Text,
    Image,
    Dimensions
} from 'react-native';
const {width,height} = Dimensions.get("window");
import Title from '../common/title'

class News extends Component {


    render() {
        return (

            <View style={{flex:1,backgroundColor:'#fff'}}>
                <Title titleName="消息中心" navigator={this.props.navigator} canBack={true} />
                <View style={{flexDirection:'row',width:width,alignItems:'center',height: 50,justifyContent:'space-between',borderBottomColor:'#F8F8F8',borderBottomWidth:1}}>
                    <View style={{flexDirection:'row',alignItems:'center',marginLeft:10}}>
                        <Image style={{width:25,height:25}} source={require('../../images/account/message.png')}/>
                        <Text>消息类型</Text>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Image style={{width:25,height:25}} source={require('../../images/account/star.png')}/>
                        <Text>消息标题</Text>
                    </View>
                    <View  style={{flexDirection:'row',alignItems:'center',marginRight:10}}>
                        <Image style={{width:25,height:25}} source={require('../../images/account/send.png')}/>
                        <Text>发送时间</Text>
                    </View>
                </View>
                <View>
                    <NewsItem  newsType="网站更新" newsTitle="版本更新提醒" newsDate="2016.09.10" />
                </View>
            </View>


        );
    }}
class NewsItem extends Component{
    render(){
        return(
            <View style={{flex:1,backgroundColor:'#fff'}}>

                <View style={{flexDirection:'row',width:width,alignItems:'center',height: 50,justifyContent:'space-between',borderBottomColor:'#F8F8F8',borderBottomWidth:1}}>
                    <View style={{flexDirection:'row',alignItems:'center',marginLeft:10}}>

                        <Text style={{color:'#979797'}}>{this.props.newsType}</Text>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center'}}>

                        <Text style={{color:'#F4A13D'}}>{this.props.newsTitle}</Text>
                    </View>
                    <View  style={{flexDirection:'row',alignItems:'center',marginRight:10}}>

                        <Text style={{color:'#979797'}}>{this.props.newsDate}</Text>
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

})
module.exports = News;