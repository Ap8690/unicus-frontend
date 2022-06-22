// Lib
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

// Styles
import "./User.scss";

// Icons
import twitter from "../../../assets/svgs/profileTwitter.svg";
import instagram from "../../../assets/svgs/profileInstagram.svg";
import facebook from "../../../assets/svgs/profileFacebook.svg";

const User = ({ user }): ReactJSXElement => {
  return (
    <div className="user">
      <div className="user-background-image">
        <img src={user.backimg} alt="Background" />
      </div>
      <div className="user-details">
        <div className="user-image">
          <img src={user.image} alt={user.name} />
        </div>
        <div className="user-info">
          <h3 className="user-name">{user.name}</h3>
          <p className="user-id">{user.id}</p>
          <p className="user-join-date">Joined: {user.joinDate}</p>
          <div className="user-links">
            <a href={user.social.twitter}>
              <img src={twitter} alt="twitter" />
            </a>
            <a href={user.social.instagram}>
              <img src={instagram} alt="instagram" />
            </a>
            <a href={user.social.facebook}>
              <img src={facebook} alt="facebook" />
            </a>
          </div>
        </div>
        <button className="edit-profile">Edit Profile</button>
      </div>
    </div>
  );
};

export default User;
