import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { BASE_URL } from "../../../config";
import { IGeneral } from "../../../models/General";
import GeneralBasic from "./GeneralBasic";
import GeneralContact from "./GeneralContact";
import GeneralNameAndLogo from "./GeneralNameAndLogo";
import GeneralSocial from "./GeneralSocial";
import { StoreContext } from "../../../context/StoreContext";
import PageLoader from "../../../components/Loading/PageLoader";

const GeneralSettings = () => {
    const { store } = useContext(StoreContext);
    const [currentFilter, setCurrentFilter] = useState("nameLogo");
    //@ts-ignore
    const [general, setGeneral] = useState<IGeneral>({});
    const [loading, setLoading] = useState(true);
    const post = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${BASE_URL}/general`);
            setGeneral(res.data.result);
            setLoading(false);
        } catch (err) {
            //console.log(err);
            setLoading(false);
        }
    };
    useEffect(() => {
        post();
    }, []);
    return (
        <div className="generalSettings">
          {loading && <PageLoader/>}
            <h2>General Settings</h2>
            <div className="setting-box">
                <div className="filter">
                    <button
                        className={currentFilter === "nameLogo" && "active"}
                        onClick={() => setCurrentFilter("nameLogo")}
                    >
                        Name & Logo
                    </button>
                    <button
                        className={currentFilter === "basic" && "active"}
                        onClick={() => setCurrentFilter("basic")}
                    >
                        Basic Settings
                    </button>
                    <button
                        className={currentFilter === "contactUs" && "active"}
                        onClick={() => setCurrentFilter("contactUs")}
                    >
                        Contact Us
                    </button>
                    <button
                        className={currentFilter === "social" && "active"}
                        onClick={() => setCurrentFilter("social")}
                    >
                        Social Links
                    </button>
                </div>
                {currentFilter === "nameLogo" && (
                    <GeneralNameAndLogo {...general} />
                )}
                {currentFilter === "basic" && <GeneralBasic {...general} />}
                {currentFilter === "contactUs" && (
                    <GeneralContact {...general} />
                )}
                {currentFilter === "social" && <GeneralSocial />}
            </div>
        </div>
    );
};

export default GeneralSettings;
