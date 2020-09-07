'use strict';

const express = require('express');
const cors = require('cors');
const path = require('path');
const mountRoutes = require('./routes')

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(cors());
mountRoutes(app);
// middleware
// app.use(helmet())
// app.use(compression())
// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))
// app.use(cookieParser())
// app.use(bodyParser.json())

// add middleware to server react app
// app.use(express.static(path.join(__dirname, "..", "build")));
app.set('appPath', 'build')
app.use(express.static(__dirname + "/build"));
app.route('/*')
    .get(function(req, res) {
        res.sendfile(app.get('appPath') + '/index.html')
    })
// app.use((req, res, next) => {
//     // res.send('Hi');
//     res.sendFile(path.join(__dirname, "build", "index.html"));
// });

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);