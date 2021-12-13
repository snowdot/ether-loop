import "./NftCard.css";
import { OPENSEA_URL_ASSETS } from "../../helpers/constants";

export default function NFTCard({ nft }) {
    const {
        title,
        description,
        image,
        token_address,
        token_id
    } = nft;

    return (
        <a
            href={`${OPENSEA_URL_ASSETS}/${token_address}/${token_id}`}
            target="_blank"
            rel="noreferrer"
            className="nft-card"
        >
            <div className="nft-card__title">{title}</div>
            <div className="nft-card__description">{description}</div>
            <div className="nft-card__media">
                <img src={image} alt="nft"></img>
            </div>
        </a>
    );
}
