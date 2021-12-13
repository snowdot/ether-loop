const express = require('express');
require('dotenv').config()
const port = process.env.PORT || 2300;
const app = express();
const path = require('path');
const apiResponse = require("./Service/apiResponse");
const routes = require("./Service/routes");
const cors = require('cors');

//applying cors only on localhost
const corsOptions = {
    origin: ['http://localhost:2300', 'http://localhost:3000', 'http://localhost:8080'],
    methods: "GET",
    allowedHeaders:
        "Access-Control-Allow-Headers,Access-Control-Allow-Origin,Access-Control-Request-Method,Access-Control-Request-Headers,Origin,Cache-Control,Content-Type,X-Token,X-Refresh-Token",
    credentials: true, preflightContinue: false,
    optionsSuccessStatus: 204
};
app.use(cors(corsOptions));

// routing APIs
app.use('/api', routes);

//serving webpage files
app.use(express.json());
app.use(express.static('Client/build'));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '/Client/build/', 'index.html'), function (err) {
        if (err) {
            apiResponse.notFoundResponse(res, "404 Page not found")
        }
    });
});

// throw 404 if URL not found
app.all("*", function (req, res) {
    return apiResponse.notFoundResponse(res, "404 Page not found");
});

// start server listen and port number
app.listen(port, () => {
    console.log('Server started! At http://localhost:' + port);
});

// init Moralis server
const { initMoralis } = require("./Service/moralis_init");
initMoralis();