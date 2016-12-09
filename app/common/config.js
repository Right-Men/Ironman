'use strict'

module.exports = {
    header:{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        }
    },
    api:{
        beta:'http://192.168.0.58:8360/',
        release:'http://139.129.234.183:8360/',
        login:'api/user/login',
        index_money:'api/plan/fundsBusiness/3',
        index_ticket:'api/discountplan/2',
        ticket:'api/list/public/',//参数：/start/limit
        invest:'api/list/public/'//参数：/start/limit
    }
}