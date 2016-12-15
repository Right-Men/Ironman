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
        beta:'http://192.168.0.58:8360/',//18810472461
        release:'http://139.129.234.183:8360/',
        login:'api/user/login',
        index_money:'api/plan/fundsBusiness/3',
        index_ticket:'api/discountplan/2',
        ticket:'api/discountlist/public/',//参数：/start/limit
        invest:'api/list/public/',//参数：/start/limit
        investDetail:'api/item/',//投资ID

    }
}
// http://192.168.0.58:8360/api/plan/fundsBusiness/3        PC首页资金业务
// http://192.168.0.58:8360/api/discountplan/2              PC首页票据业务

// http://192.168.0.58:8360/api/list/public/0/5             PC我要投资首页
// http://192.168.0.58:8360/api/discountlist/public/0/5     PC我要票源首页
// http://139.129.234.183:8360/api/discountlist/public/0/5  PC我要票源首页

//http://192.168.0.58:8360/api/item/90                      个人中心查看投资详情