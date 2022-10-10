// Libs 
import { Link } from "react-router-dom";
import uuid from "react-uuid";

// Styles
import "./ProfileNavigation.scss";

// Helper Components
const Tab = ({ tab, currentTab, onClick, index }) => {
  const className = index === currentTab ? " active" : "";
  const url = "/profile/" + tab.name.toLowerCase();
  return (
    <Link to={url} className={"tab" + className} onClick={() => onClick(index)}>
      <img src={tab.image} alt={tab.name} />
      {tab.name == "Created" ? "My Assets" : tab.name}
      <span className="additional">{tab.add}</span>
    </Link>
  );
};

const ProfileNavigation = ({ tabs, currentTab, setCurrentTab }) => {
  const updateTab = (index: Number) => setCurrentTab(index);
  return (
    <div className="profile-navigation">
      {tabs.map(
        (
          tab: {
            name: String;
            image: String;
          },
          i: Number
        ) => (
          <Tab
            tab={tab}
            currentTab={currentTab}
            onClick={updateTab}
            key={uuid()}
            index={i}
          />
        )
      )}
    </div>
  );
};

export default ProfileNavigation;
