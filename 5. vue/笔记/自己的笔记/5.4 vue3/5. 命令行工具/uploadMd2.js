const express = require('express')
const fs = require('fs') // 文件创建 查询 删除
const bodyParser = require('body-parser') // 获取post请求传递过来的数据
const multer = require('multer') // 中间件 处理multipart/form-data数据
const app = express() // 创建实例app

app.use('/public', express.static('./public'))
app.use(bodyParser.urlencoded({extended: false})) // 判断请求体是不是json，不是的话请求体转化为对象？
// 处理文件表单的数据
app.use(multer({dest: '/temp'}).array('file'))

// 设置允许跨域访问该服务
app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    res.header('Access-Control-Allow-Methods', '*')

    // 让OPTIONS请求快速返回
    if(req.methods === 'OPTIONS') res.send(200)
    else next()


   
    app.get('/download', (req, res) => {
        /**
         * @name: 通过给定的路径 读取文件
         * @param {*} 第一个参数就是完整的路径
         * @return {*}
         */ 
        res.send(1)
        res.sendFile(__dirname + '/' + 'index.html')
    })

    // 上传文件api
    app.post('/file_upload', (req, res) => {
        // 返回的信息
        const response = {}
        // 遍历文件
        for(let i = 0; i < req.files.length; i++) {
            // 读取文件内容
            fs.readFile(req.files[i].path, (err, data) => {
                // 文件要写到哪里
                let des_file = '/public' + '/' + req.files[i].originName
                /**
                 * @name: 写入文件
                 * @param {*}des_file - 写入的路径
                 * @param {*}data - 写入的数据
                 * @return {*}
                 */                
                fs.writeFile(des_file, data, (err) => {
                    if (err) {
                        console.log(err)
                    } else {
                        response = {
                            message: 'upload file successfully',
                            fileName: req.files[i].originName
                        }
                    }
                    console.log(data);
                    console.log(des_file);
                    res.end(JSON.stringify(response))
                })
            })
        }
        res.end(JSON.stringify(response))
    })
})
app.listen(8083, () => {
    console.log('the webserver is running at http://127.0.0.1:8083');
})