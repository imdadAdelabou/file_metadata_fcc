require('dotenv').config()
var express = require('express');
var cors = require('cors');
const multer = require('multer');
const upload = multer({ dest: __dirname + "/uploads/imgs" });

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/fileanalyse", upload.single('upfile'), (req, res, next) => {
    if (req.file) {
        let file = req.file;
        return res.status(200).json({ "name": file["originalname"], "type": file["mimetype"], "size": file["size"], });
    }
    return res.status(400).json({ error: "No file send." });
});


const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('Your app is listening on port ' + port)
});