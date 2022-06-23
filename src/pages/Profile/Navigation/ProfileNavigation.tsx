// Libs
import { Link } from "react-router-dom";

// Styles
import "./ProfileNavigation.scss";

// Helper Components
const Tab = ({ tab, currentTab, onClick, index }) => {
  const className = index === currentTab ? " active" : "";
  const url = "/profile/" + tab.toLowerCase();
  return (
    <Link to={url} className={"tab" + className} onClick={() => onClick(index)}>
      {tab}
    </Link>
  );
};

const ProfileNavigation = ({ tabs, currentTab, setCurrentTab }) => {
  const updateTab = (index: Number) => setCurrentTab(index);
  return (
    <div className="profile-navigation">
      {tabs.map((tab: String, i: Number) => (
        <Tab
          tab={tab}
          currentTab={currentTab}
          onClick={updateTab}
          key={`expf${i}`}
          index={i}
        />
      ))}
    </div>
  );
};

export default ProfileNavigation;
