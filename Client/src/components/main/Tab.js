import "./Tab.css";
import Pagination from "./Pagination";
import Loading from "../main/Loading";
import Error from "../main/Error";
import FollowerCard from "../cards/FollowerCard";
import { PAGE_LIMIT } from "../../helpers/constants";

export default function Tab({
    tab,
    tabData,
    limit,
    total,
    page,
    setPage
}) {
    const { loading, error, data } = tabData;

    if(loading) {
        return <Loading />
    }

    if(error) {
        return <Error message={error} />
    }

    return (
        <div className="tab">
            <div className="tab-wrapper">
            {
                tab === "followers" && data.length > 0 &&
                data.map((elem, ind) => (
                    <FollowerCard
                        key={ind}
                        follower={elem}
                    />
                ))
            }
            {
                tab === "followers" && data.length === 0 &&
                <div className="message">You don't have any followers yet.</div>
            }
            {
                tab === "following" && data.length > 0 &&
                data.map((elem, ind) => (
                    <FollowerCard
                        key={ind}
                        follower={elem}
                    />
                ))
            }
            {
                tab === "following" && data.length === 0 &&
                <div className="message">You're not following anyone yet.</div>
            }
            {
                tab === "recommended" && data.length > 0 &&
                data.map((elem, ind) => (
                    <FollowerCard
                        key={ind}
                        follower={elem}
                    />
                ))
            }
            {
                tab === "recommended" && data.length === 0 &&
                <div className="message">No recommendations as of yet.</div>
            }
            </div>
            {
                total > PAGE_LIMIT && tab !== "recommended" &&
                <Pagination
                    limit={limit}
                    total={total}
                    page={page}
                    setPage={setPage}
                />
            }
        </div>
    );
}
