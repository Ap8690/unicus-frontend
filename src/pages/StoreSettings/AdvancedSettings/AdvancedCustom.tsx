import { useState } from "react"
import Input from "../../../components/Input/Input"

const AdvancedCustom = () => {
    const [privacy, setPrivacy] = useState('')
    const [terms, setTerms] = useState('')
    const [about, setAbout] = useState('')
    const [creators, setCreators] = useState('')
    return (
        <div className="advanced-supported">
            <div className="large-text">
                You can add texts with html tags for formatting purposes.
            </div>
            <div className="inputs">
            <Input
                title="Privacy policy"
                placeholder="Enter Privacy policy"
                state={privacy}
                setState={setPrivacy}
                multi
            />
            <Input
                title="Terms & Conditions"
                placeholder="Enter Terms & Conditions"
                state={terms}
                setState={setTerms}
                multi
            />
            <Input
                title="About Us"
                placeholder="Enter About Us"
                state={about}
                setState={setAbout}
                multi
            />
            <Input
                title="Creators"
                placeholder="Enter Creators"
                state={creators}
                setState={setCreators}
                multi
            />
            </div>
            <button className="btn">Save Changes</button>
        </div>
    )
}

export default AdvancedCustom
