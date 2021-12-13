const { HttpRequest } = require("../Service/dataFetch");

async function getPortfolio(address, chain_id = 1, currency = 'usd', decimal = 5) {
    return new Promise((resolve, reject) => {
        const matchPrimer = ''
        const type = `address`
        const method = `balances_v2`
        const params = `nft=false&quote-currency=${currency}`
        const request = new HttpRequest(chain_id, type, method, address, 0, 0, matchPrimer, params);
        request.fetch().then(data => {
            try {
                let tokens = []

                data.items.forEach(el => {
                    let eachCoin = {
                        name: el.contract_name,
                        symbol: el.contract_ticker_symbol,
                        contract_address: el.contract_address,
                        logo: el.logo_url,
                        balance: Number((el.balance / (10 ** el.contract_decimals)).toFixed(decimal)),
                        quote_rate: el.quote_rate == null ? 0 : Number(el.quote_rate.toFixed(decimal)),
                        quote: el.quote,
                        percentage: 0,
                        currency: currency
                    }
                    tokens.push(eachCoin)
                });

                const sum = tokens.reduce((a, b) => +a + +b.quote, 0);

                tokens.forEach(element => {
                    element.percentage = Number((((element.quote * 100) / sum) / 100).toFixed(decimal))
                });

                let portfolio = [];

                tokens.forEach(el2 => {
                    if (el2.quote != 0) {
                        let eachToken = {
                            name: el2.name,
                            symbol: el2.symbol,
                            quote: el2.quote,
                            percentage: Number((((el2.quote * 100) / sum) / 100).toFixed(decimal)),
                            currency: currency
                        }
                        portfolio.push(eachToken)
                    }
                });

                resolve({
                    portfolio: portfolio,
                    tokens: tokens,
                })
            } catch (error) {
                console.log(error)
                reject(error);
            }


        }).catch(err => {
            console.log(err)
            reject(err)
        })

    });
}

module.exports = {
    getPortfolio
}