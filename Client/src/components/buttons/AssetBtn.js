import "./AssetBtn.css";
import { intlCurrNumFormat, intlDecimalNumFormat } from "../../helpers/functions";
import { ETHERSCAN_URL_ADDRESS } from "../../helpers/constants";
import DEFAULT_IMAGE from "../../assets/placeholder.png";

export default function AssetBtn({ asset }) {
    const {
        name,
        symbol,
        contract_address,
        quote,
        quote_rate,
        currency,
        logo,
        balance
    } = asset;

    return (
        <button
            className="asset-btn"
        >
            <div className="asset-btn__coin">
                <img src={logo} alt="asset" onError={(e) => { e.target.src = DEFAULT_IMAGE }} ></img>
                <div className="mob">{symbol}</div>
                <a
                    className="web"
                    href={`${ETHERSCAN_URL_ADDRESS}/${contract_address}`}
                    target="_blank"
                    rel="noreferrer"
                >{`${name} (${symbol})`}</a>
            </div>
            <div className="asset-btn__price">
                <div>{intlCurrNumFormat(quote_rate, currency)}</div>
            </div>
            <div className={`asset-btn__holding`}>
                <div>{intlCurrNumFormat(quote, currency)}</div>
                <div>{intlDecimalNumFormat(balance)}</div>
            </div>
        </button>
    );
}
