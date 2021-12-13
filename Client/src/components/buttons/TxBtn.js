import "./TxBtn.css";
import { trimAddress, intlMultipleDecimalNumFormat } from '../../helpers/functions';
import { ETHERSCAN_URL_ADDRESS, ETHERSCAN_URL_TX } from '../../helpers/constants';
import * as d3 from 'd3';

export default function TxBtn({ data }) {
    const formatDate = d3.timeFormat("%b %d, %Y");

    return (
        <>
            {
                data.tx_hash &&
                <button className="tx-btn">
                    <a
                        href={`${ETHERSCAN_URL_TX}/${data.tx_hash}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {trimAddress(data.tx_hash)}
                    </a>
                    <div className="tx-btn__date">{formatDate(new Date(data.timestamp).getTime())}</div>
                    <a
                        href={`${ETHERSCAN_URL_ADDRESS}/${data.sender}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {data.sender_name.length > 30 ? trimAddress(data.sender_name) : `${data.sender_name.slice(0, 10)}...`}
                    </a>
                    <a
                        href={`${ETHERSCAN_URL_ADDRESS}/${data.receiver}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {data.receiver_name.length > 30 ? trimAddress(data.receiver_name) : `${data.receiver_name.slice(0, 10)}...`}
                    </a>
                    <div className="tx-btn__type">
                        <div className={data.tx_type}>{data.tx_type.toUpperCase()}</div>
                    </div>
                    <div>{intlMultipleDecimalNumFormat(data.amount)}</div>
                    <div>{intlMultipleDecimalNumFormat(data.fee)}</div>
                    <div
                        className={`tx-btn__status ${data.status ? 'success' : 'fail'}`}
                    >
                        {data.status ? 'success' : 'fail'}
                    </div>
                </button>
            }
        </>
    );
}
