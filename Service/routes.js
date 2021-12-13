const express = require('express');
const apiResponse = require("./apiResponse");
const router = express.Router();
const { getPortfolio } = require('../API/portfolio');
const { getNfts } = require('../API/nfts');
const { getTnx } = require('../API/transactions');
const { getSocial, search } = require('../API/social');
const { getPoaps } = require('../API/poaps');

// health check
router.get('/healthcheck', async (req, res) => {
    const data = {
        uptime: process.uptime(),
        timestamp: Date.now()
    }

    try {
        apiResponse.successResponseWithData(res, 'OK', data);
    } catch (e) {
        apiResponse.errorResponse(res, e);
    }

});

// get portfolio
router.get('/portfolio', (req, res) => {
    let address = req.query.address;
    let chain_id = req.query.chain_id;
    let currency = req.query.currency;
    let decimal = req.query.decimal;

    if (address === undefined) {
        apiResponse.errorResponse(res, "No Address Defined")
    } else {
        chain_id === undefined ? chain_id = 1 : null;
        getPortfolio(address, chain_id, currency, decimal).then(data => {
            if (data === "") {
                apiResponse.errorResponse(res, "No Data")
            } else {
                apiResponse.successResponseWithData(res, "Found Data", data)
            }
        }).catch(error => {
            apiResponse.errorResponse(res, error.message)
        });
    }
});

// get nfts
router.get('/nfts', (req, res) => {
    let address = req.query.address;

    if (address === undefined) {
        apiResponse.errorResponse(res, "No Address Defined")
    } else {
        getNfts(address).then(data => {
            if (data === "") {
                apiResponse.errorResponse(res, "No Data")
            } else {
                apiResponse.successResponseWithData(res, "Found Data", data)
            }
        }).catch(error => {
            apiResponse.errorResponse(res, error.message)
        });
    }
});

// get transactions
router.get('/transactions', (req, res) => {
    let address = req.query.address;
    let chain_id = req.query.chain_id;
    let page_number = req.query.page_number;
    let page_size = req.query.page_size;

    if (address === undefined) {
        apiResponse.errorResponse(res, "No Address Defined")
    } else {
        chain_id === undefined ? chain_id = 1 : null;
        getTnx(address, chain_id, page_number, page_size).then(data => {
            if (data === "") {
                apiResponse.errorResponse(res, "No Data")
            } else {
                apiResponse.successResponseWithData(res, "Found Data", data)
            }
        }).catch(error => {
            apiResponse.errorResponse(res, error.message)
        });
    }
});

// get social 
router.get('/social', (req, res) => {
    let address = req.query.address;
    let type = req.query.type;
    let page_number = req.query.page_number;
    let page_size = req.query.page_size;

    if (address === undefined) {
        apiResponse.errorResponse(res, "No Address Defined")
    } else {
        getSocial(address, type, page_size, page_number).then(data => {
            if (data === "") {
                apiResponse.errorResponse(res, "No Data")
            } else {
                apiResponse.successResponseWithData(res, "Found Data", data)
            }
        }).catch(error => {
            apiResponse.errorResponse(res, error.message)
        });
    }
});

// search for an address
router.get('/search', (req, res) => {
    let address = req.query.address;

    if (address === undefined) {
        apiResponse.errorResponse(res, "No Address Defined")
    } else {
        search(address).then(data => {
            if (data === "") {
                apiResponse.errorResponse(res, "No Data")
            } else {
                apiResponse.successResponseWithData(res, "Found Data", data)
            }
        }).catch(error => {
            apiResponse.errorResponse(res, error.message)
        });
    }
});

// get poaps 
router.get('/poaps', (req, res) => {
    let address = req.query.address;

    if (address === undefined) {
        apiResponse.errorResponse(res, "No Address Defined")
    } else {
        getPoaps(address).then(data => {
            if (data === "") {
                apiResponse.errorResponse(res, "No Data")
            } else {
                apiResponse.successResponseWithData(res, "Found Data", data)
            }
        }).catch(error => {
            apiResponse.errorResponse(res, error.message)
        });
    }
});
module.exports = router;