import viewImg from '../../assets/svgs/views.svg'
import shareImg from '../../assets/svgs/share.svg'
import likesImg from '../../assets/svgs/likes.svg'
import flagImg from '../../assets/svgs/flag.svg'
import './viewnft.scss'

const NftImg = ({ img, likes, views, shares }) => {
    return (
        <div className='nft-img-box'>
            <img src={img} alt="" className='nft-img' />
            <div className='nft-interactions'>
                <button>
                    {views} <img src={viewImg} alt="views" />
                </button>
                <button>
                    {shares} <img src={shareImg} alt="shares" />
                </button>
                <button>
                    {likes} <img src={likesImg} alt="likes" />
                </button>
                <button>
                    <img src={flagImg} alt="flag" />
                </button>
            </div>
        </div>
    )
}
export default NftImg