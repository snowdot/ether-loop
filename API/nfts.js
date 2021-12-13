const { Moralis } = require('../Service/moralis_init');

async function getNfts(address) {
    return new Promise((resolve, reject) => {
        const options = {
            chain: '0x1',
            address: address,
        }
        Moralis.Web3API.account.getNFTs(options)
            .then(res => {
                let nfts = [];
                if (res.result.length > 0) {
                    res.result.forEach(el => {
                        if (el.metadata) {
                            let eachNft = {
                                token_id: el.token_id,
                                title: JSON.parse(el.metadata).name != null ? JSON.parse(el.metadata).name : '',
                                description: JSON.parse(el.metadata).description != null ? JSON.parse(el.metadata).description : '',
                                image: JSON.parse(el.metadata).image != null ? ipfsFormat(JSON.parse(el.metadata).image) : '',
                                token_address: el.token_address,
                            }
                            nfts.push(eachNft)
                        }

                    });
                    resolve(nfts)
                } else {
                    resolve([])
                }

            }).catch(err => {
                console.log(err);
                reject(err);
            });

    })
}
function ipfsFormat(link) {
    if (link.substring(0, 4) == "ipfs") {
        newLink = link.replace("ipfs:/", "https://ipfs.io")
        return newLink
    } else {
        return link
    }
}

module.exports = {
    getNfts
}