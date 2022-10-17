import "./Input.scss"
import { ErrorMessage } from '@hookform/error-message';

const HookedInput = (props: any) => {
    return (
        <div className="input-box">
            {props.title && (
                <label className="title">
                    {props.title}
                    {props.required && <span className="required"> *</span>}
                </label>
            )}
            <input {...props.register} placeholder={props.placeholder} />
            
        </div>
    )
}
export default HookedInput
