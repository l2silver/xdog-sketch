const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const fs = require('fs');
 
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
 
const uploadImage = async (req, res, next) => {
 
    try {
 
        // to declare some path to store your converted image
        const path = './uploads/images/'+Date.now()+'.png'
 
        const imgdata = req.body.base64image;
 
        // to convert base64 format into random filename
        const base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, '');
        
        fs.writeFileSync(path, base64Data,  {encoding: 'base64'});
 
        return res.send(path);
 
    } catch (e) {
        next(e);
    }
}
 
app.post('/upload/image', uploadImage)
 
 
app.listen(port, () => console.log(`Example app listening on port ${port}!`))