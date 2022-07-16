import { useState } from "react"
import Input from "../../../components/Input/Input"
import { IOSSwitch } from "./GeneralBasic"

const GeneralContact = () => {
    const [contactNumber, setContactNumber] = useState("")
    const [email, setEmail] = useState("")
    const [enableContact, setEnableContact] = useState(true)
    return (
        <div className="general-contact">
            <Input
                title="Contact Number"
                placeholder="Enter Contact Number"
                state={contactNumber}
                number
                setState={setContactNumber}
            />
            <Input
                title="Email"
                placeholder="Enter Email"
                state={email}
                setState={setEmail}
            />
            <Input
                title="Message"
                placeholder="Enter Message"
                state={email}
                setState={setEmail}
                multi
            />
            <div className="title-tog">Toggle Settings</div>
            <div className="switch-box">
                <IOSSwitch
                    defaultChecked
                    checked={enableContact}
                    onChange={(e: any) => setEnableContact(e.target.checked)}
                />
                <div className="terms">
                    <span className="large-text">Contact Us</span>
                    <span>
                        Turn this on/off to show/hide the contact us section
                    </span>
                </div>
            </div>
            <button className="btn">Save Changes</button>
        </div>
    )
}

export default GeneralContact
