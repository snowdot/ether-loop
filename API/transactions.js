const { Moralis } = require('../Service/moralis_init');
const axios = require('axios');
require('dotenv').config();

async function getTnx(address) {
    return new Promise((resolve, reject) => {
        let tnx = [];
        let total_tx = 0;
        let total_fee = 0;
        let total_fee_usd = 0;
        let total_in = 0;
        let total_out = 0;
        let success_rate = 0;
        let success_tnx = 0;
        let failed_tnx = 0;
        // get transactions from Moralis
        async function getAllTnx(address, offset = 0) {
            return new Promise((resolve, reject) => {
                const options = { chain: "0x1", address: address, order: "desc", from_block: "0", limit: 500, offset: offset };
                Moralis.Web3API.account.getTransactions(options)
                    .then(res => {
                        if (res.result.length > 0) {
                            total_tx = res.total;
                            res.result.forEach(el => {
                                if (el.receipt_status == "1") {
                                    success_tnx++;
                                } else {
                                    failed_tnx++;
                                }
                                total = (Number(((el.value / (10 ** 18)) + ((el.gas_price * el.receipt_gas_used) / (10 ** 18))).toFixed(6)))
                                el.from_address.toLowerCase() == address.toLowerCase() ? total_out += total : total_in += (Number((el.value / (10 ** 18)).toFixed(6)));
                                total_fee += Number(((el.gas_price * el.receipt_gas_used) / (10 ** 18)).toFixed(6));

                                let transaction = {
                                    timestamp: el.block_timestamp,
                                    tx_hash: el.hash,
                                    sender: el.from_address,
                                    sender_name: el.from_address,
                                    receiver: el.to_address,
                                    receiver_name: el.to_address,
                                    amount: Number((el.value / (10 ** 18)).toFixed(6)),
                                    gas_units: el.receipt_gas_used,
                                    gas_price: Number((el.gas_price / (10 ** 9)).toFixed(0)),
                                    fee: Number(((el.gas_price * el.receipt_gas_used) / (10 ** 18)).toFixed(6)),
                                    total_balance: 0,
                                    total_quote: Number(((el.value / (10 ** 18)) + ((el.gas_price * el.receipt_gas_used) / (10 ** 18))).toFixed(6)),
                                    status: el.receipt_status == "1" ? true : false,
                                    tx_type: el.from_address.toLowerCase() == address.toLowerCase() ? "out" : "in",
                                }
                                tnx.push(transaction)

                            });

                            if (tnx.length < total_tx) {
                                getAllTnx(address, tnx.length).then(res => {
                                    resolve(res)
                                }).catch(err => {
                                    console.log(err)
                                    reject(err)
                                })
                            } else {
                                if (failed_tnx == 0) {
                                    success_rate = 1;
                                } else {
                                    success_rate = Number(((success_tnx * 100) / (success_tnx + failed_tnx) / 100).toFixed(5))
                                }

                                //get ether price from etherscan
                                const es_api = process.env.ETHERSCAN_API_KEY
                                let url = `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${es_api}`;
                                axios.get(url, { timeout: 60000 }).then(response => {
                                    if (response && response.data && response.data.status == '1' && response.data.result) {
                                        let price = response.data.result.ethusd;
                                        total_fee_usd = Number((total_fee * price).toFixed(5));
                                        tnx.forEach(element => {
                                            element.total_balance = Number((element.total_quote * price).toFixed(5))
                                        });
                                        resolve({ total_tx: total_tx, total_fee: total_fee, total_fee_usd: total_fee_usd, total_in: total_in, total_out: total_out, success_rate: success_rate, transactions: tnx })
                                    }
                                }).catch(error => {
                                    console.log(error)
                                    reject(error);
                                });

                            }
                        } else {
                            resolve({ total_tx: total_tx, total_fee: 0, total_fee_usd: 0, total_in: 0, total_out: 0, success_rate: 0, transactions: [] })
                        }

                    }).catch(err => {
                        console.log(err)
                        reject(err);
                    });
            })
        }

        getAllTnx(address, 0).then(res => {
            resolve(res)
        }).catch(err => {
            console.log(err)
            reject(err)
        })
    })
}

module.exports = {
    getTnx
}