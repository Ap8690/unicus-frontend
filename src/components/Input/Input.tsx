import "./Input.scss";

const Input = (props:any) => {
  const handleChange = (e:any) => {
    if(props.title?.includes('Description') && e.target.value?.length >240) {
      props.setState((e.target.value.slice(0,240)))
      return 
    }
    if(props.title?.includes('Royalty') && (e.target.value >99 || e.target.value < 0) ) {
      return 
    }
    props.setState(e.target.value);
  };
  
  return (
    <div className="input-box">
      {props.title && (
        <span className="title">
          {props.title}
          {props.required && <span className="required"> *</span>}
        </span>
      )}
      {props.time ? (
        <input type="time" onChange={handleChange} value={props.state} />
      ) : props.date ? (
        <input
          type="date"
          onChange={handleChange}
          value={props.state}
          placeholder={props.placeholder}
        />
      ) : props.multi ? (
        <textarea
          rows={6}
          onChange={handleChange}
          value={props.state}
          placeholder={props.placeholder}
        />
      ) : props.password ? (
        <div className="password-field">
        <input
          type={"password"}
          onChange={handleChange}
          value={props.state}
          placeholder={props.placeholder}
          disabled={props.disabled}
        />
        {props.forgetPass &&
            <div className="forget-pass">
                <button>Forgot Password?</button>
            </div>
        }
        </div>
      ) : props.number ? (
        <input
          type={"number"}
          onChange={handleChange}
          value={props.state}
          placeholder={props.placeholder}
          disabled={props.disabled}
        />
      ):
       (
        <input
          type={props.email ? "email" : "text"}
          onChange={handleChange}
          value={props.state}
          placeholder={props.placeholder}
          disabled={props.disabled}
        />
      )}
    </div>
  );
};
export default Input;
