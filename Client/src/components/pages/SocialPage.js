import { useContext, useState } from "react";
import "./SocialPage.css";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { DataContext } from "../../context/DataContext";
import { PAGE_LIMIT } from "../../helpers/constants";
import Modal from "../main/Modal";
import Navbar from "../main/Navbar";
import Topbar from "../main/Topbar";
import SocialTabs from "../main/SocialTabs";
import Tab from "../main/Tab";

export default function SocialPage() {
    const authContext = useContext(AuthContext);
    const dataContext = useContext(DataContext);
    const [showModal, setShowModal] = useState(false);
    const [tab, setTab] = useState("followers");

    if(!authContext.address) {
        return <Navigate to="/"/>
    }

    return (
        <main>
            <Modal
                showModal={showModal}
                setShowModal={setShowModal}
            />
            <div className="container social-container">
                <Navbar setShowModal={setShowModal} />
                <div className="wrapper social-wrapper">
                    <Topbar
                        title="Social"
                        user={authContext.user}
                        handleLogout={authContext.handleLogout}
                    />
                    <SocialTabs
                        totalFollowers={dataContext.totalFollowers}
                        totalFollowing={dataContext.totalFollowing}
                        totalRecommended={dataContext.totalRecommended}
                        tab={tab}
                        setTab={setTab}
                    />
                    <div className="social-wrapper__followers">
                        {
                            tab === "followers" &&
                            <Tab
                                tab="followers"
                                tabData={dataContext.stateFollowers}
                                limit={PAGE_LIMIT}
                                total={dataContext.totalFollowers}
                                page={dataContext.pageFollowers}
                                setPage={dataContext.setPageFollowers}
                            />
                        }
                        {
                            tab === "following" &&
                            <Tab
                                tab="following"
                                tabData={dataContext.stateFollowing}
                                limit={PAGE_LIMIT}
                                total={dataContext.totalFollowing}
                                page={dataContext.pageFollowing}
                                setPage={dataContext.setPageFollowing}
                            />
                        }
                        {
                            tab === "recommended" &&
                            <Tab
                                tab="recommended"
                                tabData={dataContext.stateRecommended}
                                limit={PAGE_LIMIT}
                                page={dataContext.pageRecommended}
                                total={dataContext.totalRecommended}
                                setPage={dataContext.setPageRecommended}
                            />
                        }
                    </div>
                </div>
            </div>
        </main>
    );
}
