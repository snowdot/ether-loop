require('dotenv').config();
const axios = require('axios');

const cov_api = process.env.COV_API
const cov_key = process.env.COV_KEY

class HttpRequest {
    constructor(chain, type, method, address, pageNumber, pageSize, matchPrimer, params) {
        this.chain = chain;
        this.type = type;
        this.method = method;
        this.address = address;
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.matchPrimer = matchPrimer;
        this.params = params;
    }

    urlBuilder() {
        let url = `${cov_api}/${this.chain}/${this.type}/${this.address}/${this.method}/?`;
        this.pageNumber ? url += `page-number=${this.pageNumber}&` : null;
        this.pageSize ? url += `page-size=${this.pageSize}&` : null;
        this.matchPrimer ? url += `match=${this.matchPrimer}&` : null;
        this.params ? url += `${this.params}&` : null;
        url += `key=${cov_key}`;
        return url;
    }

    async fetch() {
        return new Promise((resolve, reject) => {
            let url = this.urlBuilder();

            axios.get(url, { timeout: 120000 }).then(response => {

                if (response.data
                    && response.data.data
                    && response.data.data.items
                    && response.data.data.items.length != 0
                ) {
                    let data = response.data.data;
                    resolve(data);
                } else {
                    reject(response.data.error_message);
                }
            }).catch(error => {
                if (error && error.response && error.response.data && error.response.data.error_message) {
                    reject(error.response.data.error_message)
                } else {
                    reject(error)
                }
            });
        });
    }

    toString() {
        console.log("url: ", this.urlBuilder());
    }
}


module.exports = {
    HttpRequest
}