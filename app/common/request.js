'user strict'


import queryString from 'query-string'
import _ from 'lodash'

// var Mock = require('mockjs')

import config from './config'
var request = {}


request.get = function(url, params){
    if(params){
        url += '?' + queryString.stringify(params)
    }

    return fetch(url)
        .then((response) => response.json())
        // .then((response) => Mock.mock(response))
}

request.post = function(url,body){
    var options = _.extend(config.header,{
        body:JSON.stringify(body)
    })

    return fetch(url, options)
        .then((response) => response.json()) .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
            // ADD THIS THROW error
            throw error;
        });
        // .then((response) => Mock.mock(response))
}



module.exports = request




