var http = require('express');
const AWS = require("aws-sdk");
const s3 = new AWS.S3()
var app = http()

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
app.listen(process.env.PORT || 3000);