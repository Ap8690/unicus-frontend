import React from "react";
import "./loading.scss";

interface PageLoaderProps {
    info?: any;
}
const PageLoader = ({ info }: PageLoaderProps) => {
    return (
            <div className="flex justify-center items-center h-[100vh]">
                <div className="Loader"></div>
            </div>
    );
};

export default PageLoader;
