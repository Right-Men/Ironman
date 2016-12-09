let postUtil = {
    postJson(url, data, callback){
        var fetchOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data;boundary=6ff46e0b6b5148d984f148b6542e5a5d'
            },
            body:data//这里我参数只有一个data,大家可以还有更多的参数
        };

        fetch(url, fetchOptions)
            .then((response) => response.json())
            .then((responseText) => {
                //  callback(JSON.parse(responseText));
                callback(responseText);
            }).done();
    },
}
export default postUtil;
