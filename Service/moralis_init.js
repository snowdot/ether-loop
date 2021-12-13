const Moralis = require('moralis/node');
require('dotenv').config()


function initMoralis() {
    // Connect to Moralis server
    const serverUrl = process.env.MORALIS_SERVER_URL;
    const appId = process.env.APPID;
    Moralis.start({ serverUrl, appId });
};

module.exports = { initMoralis, Moralis };