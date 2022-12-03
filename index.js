var http = require('express');
const AWS = require("aws-sdk");
var mime = require('mime-types')
const s3 = new AWS.S3()
var app = http()
app.use(http.json())
app.get('/file/:file', async (req,res) => {
try {
    await s3.getObject({
    Bucket: "cyclic-gold-gentle-mackerel-ap-southeast-2",
    Key: req.params['file'],
}, (err, data) =>{
    if (err){
        res.send("Error")
        console.log(err)
        return
    }
    res.type(data.ContentType)
    res.send(data.Body)
})

} catch(err) {
 console.log(err)
 res.send("Error")
}
})
app.post('/file/:file', async (req,res)=>{
    var name = req.params['file']
    try {
        await s3.putObject({
            Body: req.body['body'],
            Bucket: "cyclic-gold-gentle-mackerel-ap-southeast-2",
            Key: name,
            ContentType: mime.lookup(name.split('.')[name.split('.').length - 1])
        }).promise()
        res.send("Done")
    } catch(err){
        res.send("Error")
        console.log(err)
    }
})
app.listen(process.env.PORT || 3000);