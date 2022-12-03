var http = require('express');
const AWS = require("aws-sdk");
const s3 = new AWS.S3()
var app = http()
app.use(http.json())
app.get('/file/:file', async (req,res) => {
try {
    // get it back
let my_file = await s3.getObject({
    Bucket: "cyclic-gold-gentle-mackerel-ap-southeast-2",
    Key: req.params['file'],
}).promise()
res.send(my_file.Body)
} catch(err) {
 console.log(err)
 res.send("Error")
}
})
app.post('/file/:file', async (req,res)=>{
    try {
        await s3.putObject({
            Body: req.body['body'],
            Bucket: "cyclic-gold-gentle-mackerel-ap-southeast-2",
            Key: req.params['file'],
        }).promise()

    } catch(err){
        res.send("Error")
        console.log(err)
    }
})
app.listen(process.env.PORT || 3000);