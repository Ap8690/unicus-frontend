import React from "react";
import "./loading.scss";

const PageLoader = ({info}) => {
    return (
        <div className="flex justify-center items-center h-[100vh]">
            <div className="Loader"></div>
        </div>
    );
};

export default PageLoader;
