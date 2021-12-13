import { useContext } from "react";
import "./FollowBtn.css";
import Web3 from 'web3';
import {
    FollowButton,
    Env,
    Blockchain,
} from '@cyberconnect/react-follow-button';
import { DataContext } from "../../context/DataContext";

export default function FollowBtn({ address }) {
    const dataContext = useContext(DataContext);

    const handleOnSuccess = e => {
        dataContext.updateFollowing();
    }

    const handleOnFailure = e => {
        console.error(e);
    }

    return (
        <div className="follow-btn">
            <FollowButton
                key={address}
                provider={Web3.givenProvider}
                namespace="CyberConnect"
                toAddr={address}
                env={Env.PRODUCTION}
                onSuccess={handleOnSuccess}
                chain={Blockchain.ETH}
                onFailure={handleOnFailure}
            />
        </div>
    );
}
