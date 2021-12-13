import axios from "axios";

export const getFollower = async (address) => {
    try {
        const response = await axios.get(`/api/search?address=${address}`);
        const data = response.data;

        if(data["status"]) {
            return data["data"];
        } else {
            throw Error(data["message"]);
        }
    } catch (err) {
        throw new Error(err.message);
    }
}

export const getAssetsData = async (address) => {
    try {
        const response = await axios.get(`/api/portfolio?address=${address}`);

        const data = response.data;

        if(data["status"]) {
            return data["data"];
        } else {
            throw Error(data["message"]);
        }
    } catch (err) {
        throw new Error(err.message);
    }
}

export const getSocialData = async (address, type, page_size = 10, page_number = 0) => {
    try {
        const response = await axios.get(`/api/social?address=${address}&type=${type}&page_size=${page_size}&page_number=${page_number}`);

        const data = response.data;

        if(data["status"]) {
            return data["data"];
        } else {
            throw Error(data["message"]);
        }
    } catch (err) {
        throw new Error(err.message);
    }
}

export const getPoapData = async (address) => {
    try {
        const response = await axios.get(`/api/poaps?address=${address}`);
        const data = response.data;

        if(data["status"]) {
            return data["data"];
        } else {
            throw Error(data["message"]);
        }
    } catch (err) {
        throw new Error(err.message);
    }
}

export const getNFTData = async (address) => {
    try {
        const response = await axios.get(`/api/nfts?address=${address}`);
        const data = response.data;

        if(data["status"]) {
            return data["data"];
        } else {
            throw Error(data["message"]);
        }
    } catch (err) {
        throw new Error(err.message);
    }
}

export const getTxData = async (address, chainId = 1, pageNum = 0, pageSize = 1000) => {
    try {
        const response = await axios.get(`/api/transactions?address=${address}&chain_id=${chainId}&page_number=${pageNum}&page_size=${pageSize}`);
        const data = response.data;

        if(data["status"]) {
            return data["data"];
        } else {
            throw Error(data["message"]);
        }
    } catch (err) {
        throw new Error(err.message);
    }
}
