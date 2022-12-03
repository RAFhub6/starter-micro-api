var http = require('express');
const AWS = require("aws-sdk");
var mime = require('mime-types')
const s3 = new AWS.S3()
var app = http()
app.use(http.json())
app.get('/file/get/:file', async (req,res) => {
try {
    // get it back
let my_file = await s3.getObject({
    Bucket: "cyclic-gold-gentle-mackerel-ap-southeast-2",
    Key: req.params['file'],
})
res.setHeader('Content-Type', my_file.ContentType)
res.send(my_file.Body)
} catch(err) {
 console.log(err)
 res.send("Error")
}
})
app.post('/file/new/:file(*)', async (req,res)=>{
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