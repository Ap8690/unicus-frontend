import FullBlurLoading from "./FullBlurLoading"

const ButtonLoader = ({className}:{className?: String}) => {
    return (
        <button className={`btn btn-loader ${className}`} disabled>
            <FullBlurLoading /> Loading
        </button>
    )
}

export default ButtonLoader
