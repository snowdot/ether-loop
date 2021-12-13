import { useContext, useState } from "react";
import "./PoapPage.css";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { DataContext } from "../../context/DataContext";
import Modal from "../main/Modal";
import Navbar from "../main/Navbar";
import Topbar from "../main/Topbar";
import Loading from "../main/Loading";
import Error from "../main/Error";
import PoapCard from "../cards/PoapCard";

export default function PoapPage() {
    const authContext = useContext(AuthContext);
    const dataContext = useContext(DataContext);
    const [showModal, setShowModal] = useState(false);

    if(!authContext.address) {
        return <Navigate to="/"/>
    }

    if(dataContext.statePoap.error) return (
        <main>
            <Modal
                showModal={showModal}
                setShowModal={setShowModal}
            />
            <div className="container poap-container">
                <Navbar setShowModal={setShowModal} />
                <div className="wrapper poap-wrapper">
                    <Topbar
                        title="POAPs"
                        user={authContext.user}
                        handleLogout={authContext.handleLogout}
                    />
                    <Error message={dataContext.statePoap.error} />
                </div>
            </div>
        </main>
    );

    if(dataContext.statePoap.loading) return (
        <main>
            <Modal
                showModal={showModal}
                setShowModal={setShowModal}
            />
            <div className="container poap-container">
                <Navbar setShowModal={setShowModal} />
                <div className="wrapper poap-wrapper">
                    <Topbar
                        title="POAPs"
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
            <div className="container poap-container">
                <Navbar setShowModal={setShowModal} />
                <div className="wrapper poap-wrapper">
                    <Topbar
                        title="POAPs"
                        user={authContext.user}
                        handleLogout={authContext.handleLogout}
                    />
                    {
                        dataContext.statePoap.data.length > 0 &&
                        <div className="poap-wrapper__poaps">
                            {
                                dataContext.statePoap.data.map((elem, ind) => (
                                    <PoapCard key={ind} poap={elem}/>
                                ))
                            }
                        </div>
                    }
                    {
                        dataContext.statePoap.data.length === 0 &&
                        <div className="message">No POAPs found.</div>
                    }
                </div>
            </div>
        </main>
    );
}
