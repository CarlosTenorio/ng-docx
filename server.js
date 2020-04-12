const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;
const dir = __dirname + '/dist/ng-docx-sandbox';

app.use(express.static(dir));
app.get('*', function (req, res) {
    res.sendFile(path.join(dir + '/index.html'));
});
app.listen(port, function () {
    console.log('App running on port ' + port);
});
