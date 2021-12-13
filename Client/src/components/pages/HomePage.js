import { useContext, useEffect, useState, useRef } from "react";
import "./HomePage.css";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { DataContext } from "../../context/DataContext";
import Modal from "../main/Modal";
import Navbar from "../main/Navbar";
import Topbar from "../main/Topbar";
import Loading from "../main/Loading";
import Error from "../main/Error";
import InfoCard from "../cards/InfoCard";
import AssetBtn from "../buttons/AssetBtn";
import ColumnsAsset from "../main/ColumnsAsset";
import TreeMap from "../charts/TreeMap";

export default function HomePage() {
    const authContext = useContext(AuthContext);
    const dataContext = useContext(DataContext);
    const [showModal, setShowModal] = useState(false);
    const [width, setWidth] = useState(0);
    const chartsRef = useRef(null);

    useEffect(() => handleDisplay());

    useEffect(() => {
        window.addEventListener('resize', handleDisplay);

        return () => {
            window.removeEventListener('resize', handleDisplay);
        }
    }, []);

    const handleDisplay = () => {
        if (chartsRef.current) {
            setWidth(chartsRef.current.clientWidth);
        }
    };

    if(!authContext.address) {
        return <Navigate to="/"/>
    }

    if(dataContext.stateHome.error) return (
        <main>
            <Modal
                showModal={showModal}
                setShowModal={setShowModal}
            />
            <div className="container home-container">
                <Navbar setShowModal={setShowModal} />
                <div className="wrapper home-wrapper">
                    <Topbar
                        title="Home"
                        user={authContext.user}
                        handleLogout={authContext.handleLogout}
                    />
                    <Error message={dataContext.stateHome.error} />
                </div>
            </div>
        </main>
    );

    if(dataContext.stateHome.loading) return (
        <main>
            <Modal
                showModal={showModal}
                setShowModal={setShowModal}
            />
            <div className="container home-container">
                <Navbar setShowModal={setShowModal} />
                <div className="wrapper home-wrapper">
                    <Topbar
                        title="Home"
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
            <div className="container home-container">
                <Navbar setShowModal={setShowModal} />
                <div
                    className="wrapper home-wrapper"
                    ref={chartsRef}
                >
                    <Topbar
                        title="Home"
                        user={authContext.user}
                        handleLogout={authContext.handleLogout}
                    />
                    <div className="home-wrapper__details">
                        <div className="info-cards">
                            <InfoCard
                                title="Net worth"
                                value={dataContext.stateHomeDetails.net_worth}
                                type="currency"
                                currency="usd"
                            />
                            <InfoCard
                                title="Assets"
                                value={dataContext.stateHomeDetails.total_tokens}
                                type="value"
                                currency=""
                            />
                            <InfoCard
                                title="Top asset"
                                value={dataContext.stateHomeDetails.top_asset_name}
                                type="value"
                                currency=""
                            />
                            <InfoCard
                                title="Top asset"
                                value={dataContext.stateHomeDetails.top_asset_value}
                                type="currency"
                                currency="usd"
                            />
                        </div>
                    </div>
                    {
                        dataContext.stateHome.data?.portfolio?.length > 0 &&
                        <TreeMap
                            rawData={dataContext.stateHome.data.portfolio}
                            width={width}
                        />
                    }
                    <ColumnsAsset />
                    {
                        dataContext.stateHome.data.tokens.length > 1 &&
                        <div className="home-wrapper__assets">
                            {
                                dataContext.stateHome.data.tokens.map((elem, ind) => (
                                    <AssetBtn key={ind} asset={elem}/>
                                ))
                            }
                        </div>
                    }
                </div>
            </div>
        </main>
    );
}
