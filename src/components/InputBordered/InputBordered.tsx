import "./inputbordered.scss";

const InputBordered = (props : any) => {
  const handleChange = (e:any) => {
    props.setState(e.target.value);
  };
  return (
    <div className="input-box-bordered mt-2">
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
      ) : (
        <input
          type={props.password ? "password" : "text"}
          onChange={handleChange}
          value={props.state}
          placeholder={props.placeholder}
          disabled={props.disabled}
        />
      )}
    </div>
  );
};
export default InputBordered;
