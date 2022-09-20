import parse from 'html-react-parser';
import "./style.scss"

const PrivacyPolicy = (props:any) => {
  
  return (
    <div>
      <div className="my-store-cont mt-5 px-5 min-h-full">
        <div>
          <div>
            <div>
              <h1 className="paraTitle">
                {props.title}
              </h1>
            </div>
          </div>
          <div className="mt-5 px-4">
            <div className="paracontent">
              {parse(props.text)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy