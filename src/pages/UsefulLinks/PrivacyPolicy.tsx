import ReactHtmlParser from "react-html-parser";
import "./style.scss"

const PrivacyPolicy = (props) => {
  
  return (
    <div>
      <div className="my-store-cont mt-5 px-5">
        <div>
          <div>
            <div>
              <h1 className="paraTitle" style={{ float: "left", marginTop: "70px", marginLeft:"25px" }}>
                {props.title}
              </h1>
            </div>
          </div>
          <div className="mt-5 px-4">
            <div className="paracontent">
              {ReactHtmlParser(props.text)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy