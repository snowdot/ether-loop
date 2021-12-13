import { useContext, useState } from "react";
import "./NftPage.css";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { DataContext } from "../../context/DataContext";
import Modal from "../main/Modal";
import Navbar from "../main/Navbar";
import Topbar from "../main/Topbar";
import Loading from "../main/Loading";
import Error from "../main/Error";
import NFTCard from "../cards/NftCard";

export default function NftPage() {
    const authContext = useContext(AuthContext);
    const dataContext = useContext(DataContext);
    const [showModal, setShowModal] = useState(false);

    if(!authContext.address) {
        return <Navigate to="/"/>
    }

    if(dataContext.stateNft.error) return (
        <main>
            <Modal
                showModal={showModal}
                setShowModal={setShowModal}
            />
            <div className="container nft-container">
                <Navbar setShowModal={setShowModal} />
                <div className="wrapper nft-wrapper">
                    <Topbar
                        title="NFTs"
                        user={authContext.user}
                        handleLogout={authContext.handleLogout}
                    />
                    <Error message={dataContext.stateNft.error} />
                </div>
            </div>
        </main>
    );

    if(dataContext.stateNft.loading) return (
        <main>
            <Modal
                showModal={showModal}
                setShowModal={setShowModal}
            />
            <div className="container nft-container">
                <Navbar setShowModal={setShowModal} />
                <div className="wrapper nft-wrapper">
                    <Topbar
                        title="NFTs"
                        user={authContext.user}
                        handleLogout={authContext.handleLogout}
                    />
                    <Loading />
                </div>
            </div>
        </main>
    );

    return (
        <main>
            <Modal
                showModal={showModal}
                setShowModal={setShowModal}
            />
            <div className="container nft-container">
                <Navbar setShowModal={setShowModal} />
                <div className="wrapper nft-wrapper">
                    <Topbar
                        title="NFTs"
                        user={authContext.user}
                        handleLogout={authContext.handleLogout}
                    />
                    {
                        dataContext.stateNft.data.length > 0 &&
                        <div className="nft-wrapper__nfts">
                            {
                                dataContext.stateNft.data.map((elem, ind) => (
                                    <NFTCard key={ind} nft={elem}/>
                                ))
                            }
                        </div>
                    }
                    {
                        dataContext.stateNft.data.length === 0 &&
                        <div className="message">No NFTs found.</div>
                    }
                </div>
            </div>
        </main>
    );
}
