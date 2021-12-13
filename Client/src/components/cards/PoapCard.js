import "./PoapCard.css";
import { POAP_URL_TOKEN } from "../../helpers/constants";

export default function PoapCard({ poap }) {
    const {
        tokenId,
        image_url
    } = poap;

    return (
        <a
            className="poap-card"
            href={`${POAP_URL_TOKEN}/${tokenId}`}
            target="_blank"
            rel="noreferrer"
        >
            <img src={image_url} alt="poap"></img>
        </a>
    );
}
