const { gql, GraphQLClient } = require('graphql-request')
const { HttpRequest } = require("../Service/dataFetch");

async function getSocial(address, type = 'followers', pageSize = 10, pageNumber = 0) {
    return new Promise((resolve, reject) => {

        const client = new GraphQLClient("https://api.cybertino.io/connect/", { headers: {} })

        let after = (pageSize * pageNumber) - 1
        let query;
        switch (type) {
            case 'followers':
                query = gql`query {
                        identity(address: "${address}") {
                            address
                            followerCount
                            followers(first: ${pageSize} after:"${after}") {
                            list {
                                address
                                ens
                                alias
                            }
                            }
                        }
                        }`
                client.request(query).then((data) => {
                    if (data.identity.followers.list.length != 0) {
                        let followerCount = data.identity.followerCount;
                        let followers = filterFollowName(data.identity.followers.list);
                        getPortfolioBal(followers).then(data => {
                            resolve({
                                followerCount,
                                followers: data,
                            })
                        })
                    } else {
                        resolve({ followerCount: 0, followers: [] })
                    }

                }).catch((err) => {
                    console.log(err)
                    reject(err)
                })
                break;
            case 'followings':
                query = gql`query {
                        identity(address: "${address}") {
                            address
                            followingCount
                            followings(first: ${pageSize} after:"${after}") {
                            list {
                                address
                                ens
                                alias
                            }
                            }
                        }
                        }`
                client.request(query).then((data) => {
                    if (data.identity.followings.list.length != 0) {
                        let followingCount = data.identity.followingCount;
                        let followings = filterFollowName(data.identity.followings.list);
                        getPortfolioBal(followings).then(data => {
                            resolve({
                                followingCount,
                                followings: data,
                            })
                        })
                    } else {
                        resolve({ followingCount: 0, followings: [] })
                    }
                }).catch((err) => {
                    console.log(err)
                    reject(err)
                })
                break;
            case 'recommendations':
                query = gql`query {
                                recommendations(address: "${address}" first: ${pageSize} after:"${after}") {
                                    data {
                                    list {
                                        address
                                        recommendationReason
                                        followerCount
                                    }
                                    }
                                }
                                }`
                client.request(query).then((data) => {
                    if (data.recommendations.data != null) {
                        let recommendations = data.recommendations.data.list;
                        let recommendationCount = recommendations.length
                        getPortfolioBal(recommendations).then(data => {
                            resolve({
                                recommendationCount,
                                recommendations: data,
                            })
                        })
                    } else {
                        resolve({ recommendationCount: 0, recommendations: [] })
                    }
                }).catch((err) => {
                    console.log(err)
                    reject(err)
                })
                break;
            default:
                null
        }

    })
}

function filterFollowName(followers) {
    let filteredFollow = []
    followers.forEach(el => {
        el.alias
            ? filteredFollow.push({ address: el.address, name: el.alias })
            : el.ens
                ? filteredFollow.push({ address: el.address, name: el.ens })
                : filteredFollow.push({ address: el.address, name: '' })
    });
    return filteredFollow
}


async function getPortfolioBal(addressList) {
    return new Promise((resolve, reject) => {
        let list = [];
        const chain_id = 1
        const decimal = 5
        const matchPrimer = ''
        const type = `address`
        const method = `balances_v2`
        const params = `nft=false&quote-currency=usd`

        addressList.forEach(el => {
            const request = new HttpRequest(chain_id, type, method, el.address, 0, 0, matchPrimer, params);
            request.fetch().then(data => {
                let tokens = []
                data.items.forEach(element => {
                    element.quote != 0 ? tokens.push(element.quote) : null
                });
                const sum = tokens.reduce((a, b) => +a + +b, 0);
                list.push({ ...el, balance: sum, numberofTokens: tokens.length })
                list.length == addressList.length ? resolve(list) : null
            }).catch(err => {
                console.log(err)
                reject(err)
            })
        });
    })

}

async function search(address) {
    return new Promise((resolve, reject) => {
        const client = new GraphQLClient("https://api.cybertino.io/connect/", { headers: {} })
        const query = gql`query {
                        identity(address: "${address}") {
                            address
                            ens
                            displayName
                        }
                        }`
        client.request(query).then((data) => {
            let addr = filterFollowName([data.identity]);
            getPortfolioBal(addr).then(data => {
                resolve(data[0])
            }).catch((err) => {
                console.log(err)
                reject({ message: err })
            })
        }).catch((err) => {
            console.log(err)
            reject(err)
        })
    })

}

module.exports = {
    getSocial,
    search
}