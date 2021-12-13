import { useState } from "react";
import "./Modal.css";
import { getFollower } from "../../api";
import FollowerCard from "../cards/FollowerCard";
import Loading from "../main/Loading";
import Error from "../main/Error";

export default function Modal({ showModal, setShowModal }) {
    const [input, setInput] = useState("");
    const [stateFollower, setStateFollower] = useState({
        loading: false,
        error: false,
        data: []
    });

    const handleOnClick = e => {
        if(e.target.className === "modal") {
            reset();
            setShowModal(false);
        }
    }

    const handleClose = () => {
        reset();
        setShowModal(false);
    }

    const handleSearch = async () => {
        setStateFollower({
            loading: true,
            error: false,
            data: []
        });
        try {
            const res = await getFollower(input);
            setStateFollower({
                loading: false,
                error: false,
                data: res
            });
        } catch (error) {
            setStateFollower({
                loading: false,
                error: error.message,
                data: []
            });
        }
    }

    const handleOnChange = e => {
        setInput(e.target.value);
    }

    const reset = () => {
        setInput("");
        setStateFollower({
            loading: false,
            error: false,
            data: []
        });
    }

    return (
        <>
            {
                showModal &&
                <div
                    className="modal"
                    onClick={handleOnClick}
                >
                    <div className="modal-wrapper">
                        <div className="modal-wrapper__close">
                            <button
                                onClick={handleClose}
                            >x</button>
                        </div>
                        <div className="modal-wrapper__search">
                            <div>Search an ETH address</div>
                            <input
                                onChange={handleOnChange}
                                value={input}
                                placeholder="Enter address.."
                            ></input>
                            <button
                                onClick={handleSearch}
                                disabled={!Boolean(input)}
                            >Search address</button>
                        </div>
                        {
                            stateFollower.loading &&
                            <Loading />
                        }
                        {
                            stateFollower.error &&
                            <Error message={stateFollower.error} />
                        }
                        {
                            stateFollower.data.address &&
                            <FollowerCard
                                follower={stateFollower.data}
                            />
                        }
                    </div>
                </div>
            }
        </>
    );
}
