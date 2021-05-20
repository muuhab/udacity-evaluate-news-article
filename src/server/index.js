const dotenv = require('dotenv');
dotenv.config();

var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express()
const PORT=8082

const key=process.env.API_KEY
const baseUrl=`https://api.meaningcloud.com/sentiment-2.1?key=${key}&lang=en&url=`;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('dist'))

console.log(__dirname)



app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// app.get('/apiKey',(req,res)=>{
//     res.send(key)
// })
app.post('/api',async(req,res)=>{
    const url=req.body.url
    const response = await fetch(baseUrl+url);
    try {
        const data = await response.json()
        // console.log(data);
        const result={agreement:data.agreement,subjectivity:data.subjectivity,confidence:data.confidence,irony:data.irony,score_tag:data.score_tag,text:data.sentence_list[0].text};
        res.send(result)
    } catch (error) {
        console.log("error", error);
    }
})
// designates what port the app will listen to for incoming requests
app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`)
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})
