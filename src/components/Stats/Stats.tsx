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
    const handleChange = (e:any, index:any) => {
        const { name, value } = e.target
        const list = [...state]
        list[index][name] = value
        setState(list)
    }
    const handleRemove = (index:any) => {
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
                {state.map((singleProperty:any, index:any) => (
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

const PropertyInput = (props:any) => {
    return (
        <div className="property-input">
            <CloseIcon
                onClick={() => props.handleRemove(props.index)}
                fontSize="small"
                className="close"
            />
            <input
                type="text"
                name={props.name}
                value={props.state}
                onChange={(e) => props.handleChange(e, props.index)}
                placeholder={'Speed'}
            />
        </div>
    )
}
const StatsInput = (props:any) => {
    return (
        <div className="property-input">
            <input
                type="number"
                name='value'
                value={props.value}
                onChange={(e) => props.handleChange(e, props.index)}
                placeholder={'3'}
                min={0}
            />
            <div className='center-of'>
                Of
            </div>
            <input
                type="number"
                name='total'
                value={props.totalValue}
                onChange={(e) => props.handleChange(e, props.index)}
                placeholder={'5'}
                min={0}
            />
        </div>
    )
}

export default Stats