/**
 * Created by fandongyang on 2016/11/22.
 */


/**
 * Sample React Native App
 * htsssstps://github.com/facebook/react-native
 * @flow
 */
/*noinspection JSAnnotator,JSUnresolvedVariable*/
import React, { Component } from 'react';
import {
    AppRegistry,
    Navigator,
    StyleSheet,
    TabBarIOS,
    TouchableOpacity,
    View,
    Text,
    Image,
    Dimensions
} from 'react-native';




import HomePage from './home/index';
import Account from './account/index';
import Invest from './invest/index';
import Ticket from './ticket/index';
import Icon from 'react-native-vector-icons/Ionicons';
import TabNavigator from 'react-native-tab-navigator';


const  {width,height} = Dimensions.get('window')
var Platform = require('Platform');

const tabBarItems = [
    { title: '首页', icon: () => <Image style={{ width: 25, height: 25 }} source={require('../images/home_icons/home_android_home.png')} />,
        selectedIcon: () => <Image style={{ width: 25, height: 25 }} source={require('../images/home_icons/home_android_home_selected.png')} />
        ,component: HomePage },
    { title: '我要投资', icon: () => <Image style={{width: 30, height: 25 }} source={require('../images/home_icons/home_android_invest.png')} />,
        selectedIcon: () => <Image style={{ width: 30, height: 25 }} source={require('../images/home_icons/home_android_invest_selected.png')} />,
        component: Invest }
    ,
    { title: '我要票源', icon: () => <Image style={{ width: 30, height: 25 }} source={require('../images/home_icons/home_android_ticket.png')} />,
        selectedIcon: () => <Image style={{ width: 30, height: 25 }} source={require('../images/home_icons/home_android_ticket_selected.png')} />,
        component: Ticket }
    ,
    { title: '用户中心', icon: () => <Image style={{ width: 25, height: 25 }} source={require('../images/home_icons/home_android_account.png')} />,
        selectedIcon: () => <Image style={{ width: 25, height: 25 }} source={require('../images/home_icons/home_android_account_selected.png')} />,
        component: Account }

    // { title: '关于', icon: () => <Image style={{ width: 30, height: 30 }} source={require('./imgs/me.png') }/>, Component: HomeContainer },
]
class Root extends Component {
    constructor(){
        super();
        this.state = {
            selectedTab: tabBarItems[0].title,
            selectedTabIOS :'list'

        };


    }


    render() {

        if (Platform.OS === 'android') {
            console.log('sys -----a------ '+Platform.OS);
            return(

                <TabNavigator tabBarStyle={{height:width*0.133,backgroundColor:'#5BAAE6'}}>
                    {
                        tabBarItems.map((controller,i) => {
                            let Component = controller.component;
                            return(
                                <TabNavigator.Item
                                    key={i}
                                    selected = {this.state.selectedTab === controller.title}
                                    title = {controller.title}
                                    renderIcon = {controller.icon}
                                    renderSelectedIcon = {controller.selectedIcon}
                                    onPress={() => this.setState({selectedTab:controller.title})}
                                    titleStyle={{color:'#fff',fontSize:12}}
                                    selectedTitleStyle={{color:'#fff'}}
                                    allowFontScaling={true}
                                >
                                    <Component navigator = {this.props.navigator} {...this.props} />
                                </TabNavigator.Item>

                            )
                        })
                    }

                </TabNavigator>
            /*    <TabNavigator>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'home'}
                        title="Home"
                        renderIcon={() => <Image source={...} />}
                        renderSelectedIcon={() => <Image source={...} />}
                        badgeText="1"
                        onPress={() => this.setState({ selectedTab: 'home' })}>
                        {homeView}
                    </TabNavigator.Item>

                </TabNavigator>*/
            );
        }
            return (
                <TabBarIOS unselectedTintColor="#fff" translucent={true} tintColor="#fff" barTintColor="rgba(61,157,231,0.4)" >
                    <Icon.TabBarItemIOS
                        title="首页"
                        renderAsOriginal={true}
                        iconColor="#fff"
                        iconName='ios-home-outline'
                        selectedIconName='ios-home'
                        selectedIconColor='#fff'
                        selected={this.state.selectedTabIOS === 'list'}
                        onPress={() => {
                        this.setState({
                            selectedTabIOS: 'list',
                        });
                    }}>

                        <HomePage navigator={this.props.navigator} />

                    </Icon.TabBarItemIOS>
                    <Icon.TabBarItemIOS
                        title="我要投资"
                        renderAsOriginal={true}
                        iconColor="#fff"
                        iconName='ios-cart-outline'
                        selectedIconName='ios-cart'
                        selected={this.state.selectedTabIOS === 'edit'}
                        onPress={() => {
                        this.setState({
                            selectedTabIOS: 'edit'
                        });
                    }}>
                        <Invest navigator={this.props.navigator} />

                    </Icon.TabBarItemIOS>
                    <Icon.TabBarItemIOS
                        title="我要票源"
                        renderAsOriginal={true}
                        iconColor="#fff"
                        iconName='ios-pricetags-outline'

                        selectedIconName='ios-pricetags'
                        selected={this.state.selectedTabIOS === 'ticket'}
                        onPress={() => {
                        this.setState({
                            selectedTabIOS: 'ticket'
                        });
                    }}>
                        <Ticket navigator={this.props.navigator} />
                    </Icon.TabBarItemIOS>
                    <Icon.TabBarItemIOS
                        title="用户中心"
                        iconName='ios-person-outline'
                        renderAsOriginal={true}
                        iconColor="#fff"
                        selectedIconName='ios-person'
                        selected={this.state.selectedTabIOS === 'account'}
                        onPress={() => {
                        this.setState({
                            selectedTabIOS: 'account'
                        });
                    }}>
                        <Navigator
                            initialRoute={{
                            name:'account',
                            component:Account
                        }}
                            configureScene={(route) => {
                            return Navigator.SceneConfigs.PushFromRight
                        }}
                            renderScene={(route,navigator) =>{
                            let Component = route.component;
                            return <Component {...route.passProps} route = {route} navigator={navigator} />
                        }}
                        />
                        {/*<Account />*/}
                    </Icon.TabBarItemIOS>

                </TabBarIOS>


            )
        }

       ;


}
var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});


module.exports = Root;
// AppRegistry.registerComponent('fl', () => fl);