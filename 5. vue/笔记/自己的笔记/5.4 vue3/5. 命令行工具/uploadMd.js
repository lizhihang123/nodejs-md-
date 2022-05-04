// 如何获取当前目录下所有的md后缀的文件
const path = require('path')
const fs = require('fs')
const request = require('request')

const glob = require('glob')
// const res = require('express/lib/response')
module.exports = function upload () {
    glob('static/*.md', function(er, files) {
        // 为什么能够通过这个glob 得到这个里面的文件 - 只是得到了里面的文件名 但是文件内容？
        console.log(files);
        for(var i = 0; i < files.length; i++) {
            const filePath = path.join(__dirname, files[i])
            console.log(filePath);
            const file = fs.createReadStream(filePath);
            console.log(file);
            const options = {
                // 远程服务器地址
                method: 'POST',
                url: 'https://www.yuque.com/api/v2',
                headers: {
                    // 必须是json类型？
                    // 'Content-Type': 'multipart/form-data',
                    'Content-Type': 'application/json',
                    'Authorization': 'ZUEEB4EpKIroqNiUIsJh37BO1PWQqXPXzMMPkt7H',
                    'User-Agent': 'xiaohangge'
                },
                json: true,
                formData: {
                    'file': file 
                }
            }
            request(options, (error, response, body) => {
                // console.log(1);
                if(!error && response.statusCode === 200) {
                    // 请求处理成功
                    // console.log(1);
                } 
            })
        }      
    })

}