const express = require('express')
const bodyParser = require('body-parser')
const port = 8082
const app = express()

const jsonParset = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({extended: false})

app.post('/post', (req, res) => {
    console.log('***********');
    console.log(req.query);
    res.send(req.query)
})

app.get('/get', (req, res) => {
    console.log('***********');
    console.log(req.body);
    res.send('get111')
})

app.listen(port, () => {
    console.log('http://127.0.0.1:8081');
})