import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions,
    ListView,
    Alert,
    ActivityIndicatorIOS,
    TouchableHighlight,
    InteractionManager
} from 'react-native';
import {
    SwRefreshScrollView, //支持下拉刷新的ScrollView
    SwRefreshListView, //支持下拉刷新和上拉加载的ListView
    RefreshStatus, //刷新状态 用于自定义下拉刷新视图时使用
    LoadMoreStatus //上拉加载状态 用于自定义上拉加载视图时使用
} from 'react-native-swRefresh'
import request from './common/request'
import config from './common/config'
var width = Dimensions.get('window').width;
var cachedResults = {
    nextStart :0,
    items:[]

}

class Account extends Component{

    constructor(props) {
        super(props);

        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([]),
            isLoadingTail:false
        };
    }
    /*{
        "errno": 0,
        "errmsg": "",
        "data": {
            "type": "remitting",
            "iTotalRecords": 16,
            "data": [
                {
                    "bidId": 350,
                    "planId": 68,
                    "projectName": "云南香格里拉2016年11月资金业务项目",
                    "bidtime": "2016-11-23",
                    "userMoney": 400000,
                    "see": null,
                    "loanLife": 4,
                    "interestRate": 2.12,
                    "sendStatus": 0,
                    "shares": 1,
                    "borrowerName": "云南香格里拉",
                    "productName": "保证金代存",
                    "bankname": "中国农业银行股份有限公司 ",
                    "state": 1
                }
                ]
        }
    }*/

    _renderRow(row){
        return(
            <TouchableHighlight

                underlayColor='rgba(34,26,38,.1)'
                style={{marginTop:5}}>
                <View style={styles.item}>
                    <Text style={styles.title}>{row.projectName}</Text>


                </View>
            </TouchableHighlight>
        )
    }

    componentDidMount() {
     /*   Alert.alert('提示');*/
        InteractionManager.runAfterInteractions(() => {
            this._fetchData()
        });

    }
    //私有方法
    _fetchData(start){
        this.setState({
            isLoadingTail:true
        })

        var limit = 20
        request.get(config.api.base + config.api.invest+start+'/'+limit)
            .then((responseText) =>{
                console.log(responseText)
                var data = responseText
                if(data){
                    var items = cachedResults.items.slice()
                    cachedResults.total = data.data.data.length
                    for(var i in data.data.data){}
                    items = items.concat(data.data.data)
                    cachedResults.items = items
                    this.setState({
                        isLoadingTail:false,
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
    _fetchMoreData(){
        if(!this._hasMore || this.state.isLoadingTail ){
            return
        }
        var start = cachedResults.nextStart

        InteractionManager.runAfterInteractions(() => {
            this._fetchData(start)
        });

    }
    _hasMore(){
        return true
    }
    _renderFooter(){
       if(!this._hasMore){
            return (
                <View style={styles.loadingMore}>
                    <Text style={styles.loadingText}>没有更多了</Text>
                </View>
            )
        }

    }
    render(){
        return(
            <View style={styles.container}>

                <ListView

                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                    //renderFooter={this._renderFooter}
                    //onEndReached={this._fetchMoreData}
                    onEndReachedThreshold={20}
                    enableEmptySections={true}
                    automaticallyAdjustContentInsets = {false}
                />
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },

    header:{
        paddingTop:25,
        paddingBottom:12,
        backgroundColor:'#ee735c'
    },
    headerTitle:{
        color:'#fff',
        fontSize:16,
        textAlign:'center',
        fontWeight:'600'
    },
    item:{
        width:width,
        marginBottom:10,
        backgroundColor:'#fff'
    },
    thumb:{
        width:width,
        height:width * 0.2,
        resizeMode:'cover'
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
    play:{
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
    handleText:{
        paddingLeft:12,
        fontSize:18,
        color:'#333'
    },
    up:{
        fontSize:22,
        color:'#333'
    },
    commonentIcon:{
        fontSize:22,
        color:'#333'
    },
    loadingMore:{
        marginVertical:20
    },
    loadingText:{
        color:'#777',
        textAlign:'center'
    }
});

module.exports = Account