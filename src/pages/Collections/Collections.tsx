import toast from "react-hot-toast";
import InfiniteScroll from "react-infinite-scroll-component";
import { Helmet } from "react-helmet";
import "../Explore/Explore.scss";
import BlueBackground from "../../components/BlueBackground/BlueBackground";

const Collections = () => {
    return (
        <div className="min-h-[100vh] explore">
            <Helmet>
                <meta charSet="utf-8" />
                <title>UnicusOne - Collections</title>
                <link rel="canonical" href={window.location.href} />
            </Helmet>
            <BlueBackground />
            <h1 className="explore-heading">Explore Collections</h1>
        </div>
    );
};

export default Collections;
