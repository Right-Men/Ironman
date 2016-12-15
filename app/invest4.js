'use strict';


import React, { Component } from 'react';
import {
    Image,
    ListView,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,

} from 'react-native';
import  request from './common/request'
import Config from './common/config'
//var REQUEST_URL = 'http://zhuanlan.zhihu.com/api/columns/pinapps/posts?limit=10&offset=';
var REQUEST_URL1 = ' http://139.129.234.183:8360/api/list/public/'

export default class Posts extends  Component{

    constructor(props) {

        super(props);

        // 初始状态
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            responseData: [],
            loaded: false,
            pageOffset: 0,
            loading: false,
        };
    }

    /**
     * component 渲染后加载数据
     */
    componentDidMount () {

        this.fetchData1(REQUEST_URL1 + this.state.pageOffset * 5 +'/5');
        //this.fetchData(REQUEST_URL + this.state.pageOffset * 10);
    }


    fetchData1 = (_URL) => {
        //var _URL = Config.api.release + Config.api.invest+this.state.num * 10+'/10'

        request.get(_URL)
            .then((responseText) =>{

                var data = this.state.responseData.concat(responseText.data.data);
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(data),
                    loaded: true,
                    responseData: data,
                    pageOffset: ++this.state.pageOffset,
                    loading: false,
                });


            })

    }

    /**
     * 渲染方法
     * @returns {XML}
     */
    render() {

        if (!this.state.loaded) {
            return this.renderLoadingView();
        }

        return (
            <ListView
                dataSource={this.state.dataSource}
                pageSize={5}
                renderRow={this.renderList}
                style={styles.listView}
                renderFooter={this.renderFooter}
            />
        );
    }

    /**
     * 页面进来的时候加载 loading
     * @returns {XML}
     */
    renderLoadingView () {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>
                    加载中...
                </Text>
            </View>
        );
    }

    /**
     * 滚动到底部的时候加载更多
     */
    endReached() {
        //this.fetchData(REQUEST_URL + this.state.pageOffset * 10);
        this.fetchData(REQUEST_URL1 + this.state.pageOffset * 5);
    }

    /**
     * 加载更多
     */
    loadMore () {
        this.setState({
            loading: true
        });
        //this.fetchData(REQUEST_URL + this.state.pageOffset * 10);
        this.fetchData1(REQUEST_URL1 + this.state.pageOffset * 5);
    }

    /**
     * 底部视图
     * @returns {XML}
     */
    renderFooter() {
        return (
            <TouchableHighlight
                onPress={this.loadMore}
                underlayColor='#FFFFFF'>
                <View style={styles.containerFooter}>
                    {this.state.loading ?
                        <Image
                            source={{uri: 'http://s6.mogucdn.com/pic/140813/kuw9n_ieyggojrmi4dknlbmiytambqgiyde_26x26.gif'}}
                            style={{width: 26, height: 26, flex: 1, marginLeft: -80}}
                        />
                        :
                        <Text style={styles.loadeMoreBtn}>
                            点击加载更多...
                        </Text>
                    }
                </View>
            </TouchableHighlight>
        )

    }

    /**
     * 开始加载列表
     * @param post
     * @returns {XML}
     */
    renderList(post) {
        return (
            <View>
                <Text>1</Text>
            </View>
        );
    }

    /**
     * 点击跳转到 post 详情页
     * @param post
     */
    renderDetail(post){
     /*   this.props.navigator.push({
            title: post.title,
            component: PostDetailView,
            passProps: {slug: post.slug}
        })*/
    }
};

var styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#ffffff',
    },
    listView: {
        paddingBottom: 20,
    },

    loadingText: {
        marginTop: 100,
        textAlign: 'center',
        flex: 1,
    },

    containerFooter: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'center',
    },

    loadeMoreBtn: {
        textAlign: 'center',
        flex: 1,
        color: '#f34943',
        fontSize: 14,
        marginTop: 5,
    },
});

