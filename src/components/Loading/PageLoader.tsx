import React from "react";
import "./loading.scss";
import unicusLogo from "../../assets/images/Unicus-logo.png"

interface PageLoaderProps {
    info?: any;
}
const PageLoader = ({ info }: PageLoaderProps) => {
    return (
            <div className="absolute bg-[#00040e] top-0 left-0 z-[100000] flex justify-center items-center h-[100vh] w-[100vw]">
                <img src={unicusLogo} alt="" className="relative bottom-40 h-14" />
                <div className="Loader"></div>
            </div>
    );
};

export default PageLoader;
