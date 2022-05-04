const https = require('https')
const fs = require('fs')
// 注意这里的地址写的是https 不是ssl
const url = 'https://github.com/lizhihang123/gitIgnore-.git'

module.exports = function getIgnore () {
    https.get(url, (res) => {
        // res发送请求后 返回的一个对象
        console.log(res);
        res.setEncoding('utf8')
        let rawData = ''
        // res.on(‘data’) 监听data事件。
        res.on('data', (chunk) => {
            rawData += chunk
            console.log(rawData);
        })
        // res.on(‘end’) 数据获取完毕事件。 
        res.on('end', () => {
            /**
             * @name: fs模块 指定内容写入到一个文件
             * @param {*} .gitIgnore 文件名称
             * @param {*} 'rawData 要写入的内容'
             * @return {*}
             */            
            fs.writeFileSync('.gitIgnore', rawData)
        })
    }).on('error', () => {  
        // 监听error事件
        console.log(error);
    })
}