import { useContext, useState } from "react";
import "./LedgerPage.css";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { DataContext } from "../../context/DataContext";
import Modal from "../main/Modal";
import Navbar from "../main/Navbar";
import Topbar from "../main/Topbar";
import Loading from "../main/Loading";
import Error from "../main/Error";
import ColumnsTx from "../main/ColumnsTx";
import TxBtn from '../buttons/TxBtn';
import InfoCard from "../cards/InfoCard";

export default function LedgerPage() {
    const authContext = useContext(AuthContext);
    const dataContext = useContext(DataContext);
    const [showModal, setShowModal] = useState(false);

    if(!authContext.address) {
        return <Navigate to="/"/>
    }

    if(dataContext.stateLedger.error) return (
        <main>
            <Modal
                showModal={showModal}
                setShowModal={setShowModal}
            />
            <div className="container ledger-container">
                <Navbar setShowModal={setShowModal} />
                <div className="wrapper ledger-wrapper">
                    <Topbar
                        title="Ledger"
                        user={authContext.user}
                        handleLogout={authContext.handleLogout}
                    />
                    <Error message={dataContext.stateLedger.error} />
                </div>
            </div>
        </main>
    );

    if(dataContext.stateLedger.loading) return (
        <main>
            <Modal
                showModal={showModal}
                setShowModal={setShowModal}
            />
            <div className="container ledger-container">
                <Navbar setShowModal={setShowModal} />
                <div className="wrapper ledger-wrapper">
                    <Topbar
                        title="Ledger"
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
            <div className="container ledger-container">
                <Navbar setShowModal={setShowModal} />
                <div className="wrapper ledger-wrapper">
                    <Topbar
                        title="Ledger"
                        user={authContext.user}
                        handleLogout={authContext.handleLogout}
                    />
                    <div className="info-cards">
                        <InfoCard
                            title="Total amount"
                            value={dataContext.stateLedgerDetails.total_in + dataContext.stateLedgerDetails.total_out}
                            type="currency"
                            currency="eth"
                        />
                        <InfoCard
                            title="Fees"
                            value={dataContext.stateLedgerDetails.total_fee}
                            type="currency"
                            currency="eth"
                        />
                        <InfoCard
                            title="Tx count"
                            value={dataContext.stateLedgerDetails.total_tx}
                            type="value"
                            currency=""
                        />
                        <InfoCard
                            title="Success rate"
                            value={dataContext.stateLedgerDetails.success_rate}
                            type="percent"
                            currency=""
                        />
                    </div>
                    <ColumnsTx />
                    {
                        dataContext.stateLedger.data.length > 0 &&
                        <div className="ledger-wrapper__txs">
                            
                            {
                                dataContext.stateLedger.data.map((elem, ind) => (
                                    <TxBtn
                                        key={ind}
                                        data={elem}
                                    />
                                ))
                            }
                        </div>
                    }
                    {
                        dataContext.stateLedger.data.length === 0 &&
                        <div className="message">No transactions found.</div>
                    }
                </div>
            </div>
        </main>
    );
}
