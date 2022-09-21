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
    if(props?.item === 'socialLinks') {
      props.setState(e)
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
        <input type="time" onChange={props.customChange ? props.customChange : handleChange} value={props.state} maxLength={props.maxLength ? props.maxLength : ''} />
      ) : props.date ? (
        <input
          type="date"
          onChange={props.customChange ? props.customChange : handleChange}
          value={props.state}
          placeholder={props.placeholder}
          maxLength={props.maxLength ? props.maxLength : ''}
        />
      ) : props.multi ? (
        <textarea
          rows={6}
          onChange={props.customChange ? props.customChange : handleChange}
          value={props.state}
          placeholder={props.placeholder}
          maxLength={props.maxLength ? props.maxLength : ''}
        />
      ) : props.password ? (
        <div className="password-field">
        <input
          type={"password"}
          onChange={props.customChange ? props.customChange : handleChange}
          value={props.state}
          placeholder={props.placeholder}
          disabled={props.disabled}
          maxLength={props.maxLength ? props.maxLength : ''}
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
          onChange={props.customChange ? props.customChange : handleChange}
          value={props.state}
          placeholder={props.placeholder}
          disabled={props.disabled}
          maxLength={props.maxLength ? props.maxLength : ''}
        />
      ):
       (
        <input
          type={props.email ? "email" : "text"}
          onChange={props.customChange ? props.customChange : handleChange}
          value={props.state}
          placeholder={props.placeholder}
          disabled={props.disabled}
          maxLength={props.maxLength ? props.maxLength : ''}
        />
      )}
    </div>
  );
};
export default Input;
