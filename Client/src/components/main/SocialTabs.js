import "./SocialTabs.css";
import { SOCIAL_PAGE_TABS } from "../../helpers/constants";

export default function SocialTabs({
    totalFollowers,
    totalFollowing,
    totalRecommended,
    tab,
    setTab
}) {
    const handleOnClick = e => {
        setTab(e.currentTarget.value);
    }

    const getNumberOf = tab => {
        if(tab === "followers") return totalFollowers;
        if(tab === "following") return totalFollowing;
        if(tab === "recommended") return totalRecommended;
    }

    return (
        <div className="social-tabs">
            {
                SOCIAL_PAGE_TABS.map((elem, ind) => (
                    <button
                        className={tab === elem.value ? "active" : ""}
                        key={ind}
                        value={elem.value}
                        onClick={handleOnClick}
                    >{elem.label}
                    <span>
                        ({getNumberOf(elem.value)
                        ? getNumberOf(elem.value)
                        : 0})
                    </span>
                    </button>
                ))
            }
            
        </div>
    );
}
