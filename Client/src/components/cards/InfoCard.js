import "./InfoCard.css";
import { intlPercentNumFormat, intlCompactCurrNumFormat } from "../../helpers/functions";

export default function InfoCard({ title, value, type, currency }) {

    const formatValue = (value, currency) => {
        if(type === "percent") return intlPercentNumFormat(value);
        if(type === "currency") return intlCompactCurrNumFormat(value, currency);
        return value;
    }

    return (
        <div className="info-card">
            <div>{formatValue(value, currency)}</div>
            <div>{title}</div>
        </div>
    );
}
