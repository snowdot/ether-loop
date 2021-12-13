import React, { useState, useEffect, useContext } from "react";
import {
    getAssetsData,
    getSocialData,
    getPoapData,
    getNFTData,
    getTxData
} from "../api";
import { PAGE_LIMIT } from "../helpers/constants";
import { AuthContext } from "./AuthContext";

export const DataContext = React.createContext();
DataContext.displayName = "DataProvider";

export default function DataProvider({ children }) {
    const authContext = useContext(AuthContext);

    // ~~~ Keeping tabs on loading and error ~~~
    const [stateHome, setStateHome] = useState({
        data: {},
        loading: true,
        error: ""
    });
    const [stateHomeDetails, setStateHomeDetails] = useState({
        total_tokens: 0,
        net_worth: 0,
        top_asset_name: "",
        top_asset_value: 0
    });
    const [stateFollowers, setStateFollowers] = useState({
        data: [],
        loading: true,
        error: ""
    });
    const [stateFollowing, setStateFollowing] = useState({
        data: [],
        loading: true,
        error: ""
    });
    const [stateRecommended, setStateRecommended] = useState({
        data: [],
        loading: true,
        error: ""
    });
    const [statePoap, setStatePoap] = useState({
        data: [],
        loading: true,
        error: ""
    });
    const [stateNft, setStateNft] = useState({
        data: [],
        loading: true,
        error: ""
    });
    const [stateLedger, setStateLedger] = useState({
        data: [],
        loading: true,
        error: ""
    });
    const [stateLedgerDetails, setStateLedgerDetails] = useState({
        success_rate: 0,
        total_fee: 0,
        total_fee_usd: 0,
        total_in: 0,
        total_out: 0,
        total_tx: 0,
    });
    // ~~~ Keeping tabs on pagination ~~~
    const [pageFollowers, setPageFollowers] = useState(1);
    const [pageFollowing, setPageFollowing] = useState(1);
    const [pageRecommended, setPageRecommended] = useState(1);
    const [totalFollowers, setTotalFollowers] = useState(0);
    const [totalFollowing, setTotalFollowing] = useState(0);
    const [totalRecommended, setTotalRecommended] = useState(0);

    // ~~~ API calls ~~~
    // ~~~ Fetching data for Home page ~~~
    useEffect(() => {
        if(!authContext.address) return;

        let mounted = true;
        (async () => {
            if (mounted) {
                try {
                    const response = await getAssetsData(authContext.address);
                    let total = 0;
                    let symbol = "";
                    let value = 0;
                    if(response.portfolio?.length > 0) {
                        total = response.portfolio.reduce((acc, cur) => acc + cur.quote, 0);
                        symbol = response.portfolio[0].symbol;
                        value = response.portfolio[0].quote;
                    }
                    
                    setStateHome({
                        data: response,
                        loading: false,
                        error: ""
                    });
                    setStateHomeDetails({
                        total_tokens: response.tokens.length,
                        net_worth: total,
                        top_asset_name: symbol,
                        top_asset_value: value
                    });
                } catch (err) {
                    setStateHome({
                        data: [],
                        loading: false,
                        error: err.message
                    });
                    setStateHomeDetails({
                        total_tokens: 0,
                        net_worth: 0,
                        top_asset_name: "",
                        top_asset_value: 0
                    });
                }
            }
        })();

        return () => {
            mounted = false;
            setStateHome({
                data: [],
                loading: true,
                error: ""
            });
            setStateHomeDetails({
                total_tokens: 0,
                net_worth: 0,
                top_asset_name: "",
                top_asset_value: 0
            });
        }
    }, [authContext.address]);

    // ~~~ Fetching data for Social page ~~~
    useEffect(() => {
        if(!authContext.address) return;

        let mounted = true;
        (async () => {
            if (mounted) {
                try {
                    const response = await getSocialData(authContext.address, "followers", PAGE_LIMIT, (pageFollowers - 1));
                    setStateFollowers({
                        data: response.followers,
                        loading: false,
                        error: ""
                    });
                    setTotalFollowers(Number(response.followerCount));
                } catch (err) {
                    setStateFollowers({
                        data: [],
                        loading: false,
                        error: err.message
                    });
                }
            }
        })();

        return () => {
            mounted = false;
            setStateFollowers({
                data: [],
                loading: true,
                error: ""
            });
        }
    }, [authContext.address, pageFollowers]);

    useEffect(() => {
        if(!authContext.address) return;

        let mounted = true;
        (async () => {
            if (mounted) {
                try {
                    const response = await getSocialData(authContext.address, "followings", PAGE_LIMIT, (pageFollowing - 1));
                    setStateFollowing({
                        data: response.followings,
                        loading: false,
                        error: ""
                    });
                    setTotalFollowing(Number(response.followingCount));
                } catch (err) {
                    setStateFollowing({
                        data: [],
                        loading: false,
                        error: err.message
                    });
                }
            }
        })();

        return () => {
            mounted = false;
            setStateFollowing({
                data: [],
                loading: true,
                error: ""
            });
        }
    }, [authContext.address, pageFollowing]);

    useEffect(() => {
        if(!authContext.address) return;

        let mounted = true;
        (async () => {
            if (mounted) {
                try {
                    const response = await getSocialData(authContext.address, "recommendations", PAGE_LIMIT, (pageRecommended - 1));

                    setStateRecommended({
                        data: response.recommendations,
                        loading: false,
                        error: ""
                    });
                    setTotalRecommended(Number(response.recommendationCount));
                } catch (err) {
                    setStateRecommended({
                        data: [],
                        loading: false,
                        error: err.message
                    });
                }
            }
        })();

        return () => {
            mounted = false;
            setStateRecommended({
                data: [],
                loading: true,
                error: ""
            });
        }
    }, [authContext.address, pageRecommended]);
    
    // ~~~ Fetching data for POAPs page ~~~
    useEffect(() => {
        if(!authContext.address) return;

        let mounted = true;
        (async () => {
            if (mounted) {
                try {
                    const response = await getPoapData(authContext.address);
                    setStatePoap({
                        data: response,
                        loading: false,
                        error: ""
                    });
                } catch (err) {
                    setStatePoap({
                        data: [],
                        loading: false,
                        error: err.message
                    });
                }
            }
        })();

        return () => {
            mounted = false;
            setStatePoap({
                data: [],
                loading: true,
                error: ""
            });
        }
    }, [authContext.address]);

    // ~~~ Fetching data for NFTs page ~~~
    useEffect(() => {
        if(!authContext.address) return;

        let mounted = true;
        (async () => {
            if (mounted) {
                try {
                    const response = await getNFTData(authContext.address);
                    setStateNft({
                        data: response,
                        loading: false,
                        error: ""
                    });
                } catch (err) {
                    setStateNft({
                        data: [],
                        loading: false,
                        error: err.message
                    });
                }
            }
        })();

        return () => {
            mounted = false;
            setStateNft({
                data: [],
                loading: true,
                error: ""
            });
        }
    }, [authContext.address]);

    // ~~~ Fetching data for Ledger page ~~~
    useEffect(() => {
        if(!authContext.address) return;

        let mounted = true;
        (async () => {
            if (mounted) {
                try {
                    const response = await getTxData(authContext.address);
                    const data = response.transactions;
                    setStateLedger({
                        data: data,
                        loading: false,
                        error: ""
                    });
                    setStateLedgerDetails({
                        success_rate: response.success_rate,
                        total_fee: response.total_fee,
                        total_fee_usd: response.total_fee_usd,
                        total_in: response.total_in,
                        total_out: response.total_out,
                        total_tx: response.total_tx,
                    });
                } catch (err) {
                    setStateLedger({
                        data: [],
                        loading: false,
                        error: err.message
                    });
                    setStateLedgerDetails({
                        success_rate: 0,
                        total_fee: 0,
                        total_fee_usd: 0,
                        total_in: 0,
                        total_out: 0,
                        total_tx: 0,
                    });
                }
            }
        })();

        return () => {
            mounted = false;
            setStateLedger({
                data: [],
                loading: true,
                error: ""
            });
            setStateLedgerDetails({
                success_rate: 0,
                total_fee: 0,
                total_fee_usd: 0,
                total_in: 0,
                total_out: 0,
                total_tx: 0,
            });
        }
    }, [authContext.address]);

    const updateFollowing = async () => {
        try {
            const response = await getSocialData(authContext.address, "followings", PAGE_LIMIT, (pageFollowing - 1));
            setStateFollowing({
                data: response.followings,
                loading: false,
                error: ""
            });
            setTotalFollowing(Number(response.followingCount));
        } catch (err) {
            setStateFollowing({
                data: [],
                loading: false,
                error: err.message
            });
        }
    }

    return (
        <DataContext.Provider
            value={{
                pageFollowers: pageFollowers,
                pageFollowing: pageFollowing,
                pageRecommended: pageRecommended,
                totalFollowers: totalFollowers,
                totalFollowing: totalFollowing,
                totalRecommended: totalRecommended,
                stateHome: stateHome,
                stateHomeDetails: stateHomeDetails,
                stateFollowers: stateFollowers,
                stateFollowing: stateFollowing,
                stateRecommended: stateRecommended,
                statePoap: statePoap,
                stateNft: stateNft,
                stateLedger: stateLedger,
                stateLedgerDetails: stateLedgerDetails,
                setPageFollowers: setPageFollowers,
                setPageFollowing: setPageFollowing,
                setPageRecommended: setPageRecommended,
                updateFollowing: updateFollowing
            }}
        >
            {children}
        </DataContext.Provider>
    );
}
