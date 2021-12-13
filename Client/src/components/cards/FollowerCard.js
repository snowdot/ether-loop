import "./FollowerCard.css";
import etherscanLogo from "../../assets/etherscan.ico";
import openseaLogo from "../../assets/opensea.png";
import poapLogo from "../../assets/poap.png";
import {
    ETHERSCAN_URL_ADDRESS,
    OPENSEA_URL_ADDRESS,
    POAP_URL_ADDRESS,
} from "../../helpers/constants";
import FollowBtn from "../buttons/FollowBtn";
import {
    trimAddress,
    intlCompactCurrNumFormat
} from "../../helpers/functions";

export default function TabBtn({ follower }) {
    const {
        address,
        name,
        balance,
        numberofTokens,
        recommendationReason
    } = follower;

    return (
        <div className="follower-card">
            <div className="follower-card__name">{name ? name : trimAddress(address)}</div>
            {
                recommendationReason &&
                <div className="follower-card__reason">{recommendationReason}</div>
            }
            <div className="follower-card__info">
                <div className="follower-card__worth">
                    <div>{intlCompactCurrNumFormat(balance, "usd")}</div>
                    <div>net worth</div>
                </div>
                <div className="follower-card__assets">
                    <div>{numberofTokens}</div>
                    <div>{numberofTokens === 1 ? "asset" : "assets"}</div>
                </div>
            </div>
            <div className="follower-card__btns">
                <div className="follower-card__links">
                    <a
                        href={`${ETHERSCAN_URL_ADDRESS}/${address}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img src={etherscanLogo} alt="logo"></img>
                    </a>
                    <a
                        href={`${OPENSEA_URL_ADDRESS}/${address}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img src={openseaLogo} alt="logo"></img>
                    </a>
                    <a
                        href={`${POAP_URL_ADDRESS}/${address}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img src={poapLogo} alt="logo"></img>
                    </a>
                </div>
                <FollowBtn address={address}/>
            </div>           
        </div>
    );
}
