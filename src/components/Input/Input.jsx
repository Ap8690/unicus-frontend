import "./input.scss";

const Input = ({
  title,
  placeholder,
  multi,
  date,
  time,
  email,
  password,
  state,
  number,
  setState,
  required,
  disabled,
  forgetPass
}) => {
  const handleChange = (e) => {
    setState(e.target.value);
  };
  return (
    <div className="input-box">
      {title && (
        <span className="title">
          {title}
          {required && <span className="required"> *</span>}
        </span>
      )}
      {time ? (
        <input type="time" onChange={handleChange} value={state} />
      ) : date ? (
        <input
          type="date"
          onChange={handleChange}
          value={state}
          placeholder={placeholder}
        />
      ) : multi ? (
        <textarea
          rows="6"
          onChange={handleChange}
          value={state}
          placeholder={placeholder}
        />
      ) : password ? (
        <div className="password-field">
        <input
          type={"password"}
          onChange={handleChange}
          value={state}
          placeholder={placeholder}
          disabled={disabled}
        />
        {forgetPass &&
            <div className="forget-pass">
                <button>Forgot Password?</button>
            </div>
        }
        </div>
      ) : number ? (
        <input
          type={"number"}
          onChange={handleChange}
          value={state}
          placeholder={placeholder}
          disabled={disabled}
        />
      ) : (
        <input
          type={email ? "email" : "text"}
          onChange={handleChange}
          value={state}
          placeholder={placeholder}
          disabled={disabled}
        />
      )}
    </div>
  );
};
export default Input;
