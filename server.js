const express = require('express'),
    expressFileupload = require('express-fileupload'),
    url = require('url'),
    path = require('path'),
    port = 3000;


const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(expressFileupload());

app.get('/', (req, res) => {
    res.json("File Upload Server is alive...,");
});

app.post('/upload', (req, res) => {

    let resData = {};





    console.log(Object.keys(req.files));

    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).json('No files were uploaded.');
    }

    let baseUrl = `${req.protocol}://${req.get('host')}`;


    let sampleFile = req.files[Object.keys(req.files)[0]];
    let fileName = Date.now() +'-'+ sampleFile.name;
    let uploadPath = __dirname + '/public/' + fileName;



    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function (err) {
        if (err) {

            console.log("error in file upload", err);
            res.json(err);

        } else {
            res.json(baseUrl+'/' + fileName);
        }

    });

})






app.listen(port, () => {
    console.log("Server is running on port ", port);
});