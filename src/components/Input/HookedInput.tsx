import "./Input.scss"
import { ErrorMessage } from "@hookform/error-message"

const HookedInput = (props: any) => {
    console.log(props.errors)
    return (
        <div className="input-box">
            {props.title && (
                <label className="title">
                    {props.title}
                    {props.required && <span className="required"> *</span>}
                </label>
            )}
            <input {...props.register} placeholder={props.placeholder} />
            <ErrorMessage
                errors={props.errors}
                name={props.name}
                render={({ message }) => <p className="text-right text-sm text-[#7460ed] w-full pt-1">{message}</p>}
            />
        </div>
    )
}
export default HookedInput
