var http = require('express');
const AWS = require("aws-sdk");
var mime = require('mime-types')
const s3 = new AWS.S3()
var app = http()
app.use(http.json())
app.get('/file/:file', async (req,res) => {
try {
    // do not get it back
let my_file = await s3.getObject({
    Bucket: "cyclic-gold-gentle-mackerel-ap-southeast-2",
    Key: req.params['file'],
}).promise()
res.setHeader('Content-Type', my_file.ContentType)
res.send(my_file.Body)
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
app.delete('/file/:file', (req,res) => {
    s3.deleteObject({Key: req.params['file'], Bucket: 'cyclic-gold-gentle-mackerel-ap-southeast-2'}, function(err, data) {
        if (err) { res.send("Error"); console.log(err, err.stack); } // error
        else     res.send("Done")              // deleted
      });
})
app.listen(process.env.PORT || 3000);
