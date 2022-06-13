import './stats.scss'

import CloseIcon from "@mui/icons-material/Close"

const Stats = ({ state, setState }) => {
    const addProperty = () => {
        setState([
            ...state,
            {
                property: '',
                value: '',
                total: ''
            },
        ])
    }
    const handleChange = (e, index) => {
        const { name, value } = e.target
        const list = [...state]
        list[index][name] = value
        setState(list)
    }
    const handleRemove = (index) => {
        if (state.length === 1) {
            return setState([
                {
                    property: '',
                    value: '',
                    total: ''
                },
            ])
        }
        const list = [...state]
        list.splice(index, 1)
        setState(list)
    }
    return (<>
        <div className="adding-values">
            <div className="values">
                <span className="head">Name</span>
                {state.map((singleProperty, index) => (
                    <PropertyInput
                        key={index}
                        name={"property"}
                        state={singleProperty.property}
                        handleChange={handleChange}
                        index={index}
                        handleRemove={handleRemove}
                    />
                ))}
            </div>
            <div className="values">
                <span className="head">Value</span>
                {state.map((singleProperty, index) => (
                    <StatsInput
                        key={index}
                        state={singleProperty.value}
                        handleChange={handleChange}
                        index={index}
                    />
                ))}
            </div>
        </div>
        <button onClick={addProperty} className="btn-outline">
            Add More
        </button>
    </>)
}

const PropertyInput = ({ state, handleChange, handleRemove, index, name }) => {
    return (
        <div className="property-input">
            <CloseIcon
                onClick={() => handleRemove(index)}
                fontSize="small"
                className="close"
            />
            <input
                type="text"
                name={name}
                value={state}
                onChange={(e) => handleChange(e, index)}
                placeholder={'Speed'}
            />
        </div>
    )
}
const StatsInput = ({ value, totalValue, handleChange, index }) => {
    return (
        <div className="property-input">
            <input
                type="number"
                name='value'
                value={value}
                onChange={(e) => handleChange(e, index)}
                placeholder={'3'}
                min={0}
            />
            <div className='center-of'>
                Of
            </div>
            <input
                type="number"
                name='total'
                value={totalValue}
                onChange={(e) => handleChange(e, index)}
                placeholder={'5'}
                min={0}
            />
        </div>
    )
}

export default Stats