var http = require('express');
const AWS = require("aws-sdk");
const s3 = new AWS.S3()
var app = http()

app.get('/', async (req,res) => {
 // store something
await s3.putObject({
    Body: JSON.stringify({key:"valuse"}),
    Bucket: "cyclic-gold-gentle-mackerel-ap-southeast-2",
    Key: "my_file.json",
}).promise()

// get it back
let my_file = await s3.getObject({
    Bucket: "cyclic-gold-gentle-mackerel-ap-southeast-2",
    Key: "my_file.json",
}).promise()

res.json(JSON.parse(my_file))

})
app.listen(process.env.PORT || 3000);