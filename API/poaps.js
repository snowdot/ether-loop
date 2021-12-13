const axios = require('axios');

async function getPoaps(address) {
    return new Promise((resolve, reject) => {
        let url = `https://api.poap.xyz/actions/scan/${address}`;
        axios.get(url, { timeout: 60000 }).then(response => {
            let data = response.data;
            if (data
                && data.length != 0) {
                let poaps = [];
                for (let i = 0; i < data.length; i++) {
                    poaps.push({
                        tokenId: data[i].tokenId,
                        created: data[i].created,
                        name: data[i].event.name,
                        image_url: data[i].event.image_url,
                        description: data[i].event.description,
                    });
                };
                resolve(poaps);
            } else {
                reject(response.data.message);
            }
        }).catch(error => {
            reject(error);
            console.log(error);
        });
    })
}

module.exports = {
    getPoaps
}