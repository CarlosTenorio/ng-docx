const express = require('express');
const path = require('path');
const app = express();
const port = process.env.port || 8080;
const dir = 'dist/ng-docx-sandbox';

app.use(express.static(dir));
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/' + dir + '/index.html'));
});
app.listen(port);
