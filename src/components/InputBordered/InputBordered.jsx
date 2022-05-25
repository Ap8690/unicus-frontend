import "./inputbordered.scss";

const InputBordered = ({
  title,
  placeholder,
  multi,
  date,
  time,
  password,
  state,
  setState,
  required,
  disabled,
}) => {
  const handleChange = (e) => {
    setState(e.target.value);
  };
  return (
    <div className="input-box-bordered">
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
      ) : (
        <input
          type={password ? "password" : "text"}
          onChange={handleChange}
          value={state}
          placeholder={placeholder}
          disabled={disabled}
        />
      )}
    </div>
  );
};
export default InputBordered;
