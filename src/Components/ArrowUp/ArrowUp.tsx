import {useState} from 'react'
import {ReactComponent as RiArrowDropUpLine} from "../../Assets/react-icons/RiArrowDropUpLine.svg"

const ArrowUp = () => {
  const [showScroll, setShowScroll] = useState(false)
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true)
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false)
    }
  }
  window.addEventListener('scroll', checkScrollTop)
  return (
    <div className={showScroll ? 'arrow_up' : 'hide'} onClick={scrollTop}>
      <RiArrowDropUpLine/>
    </div>
  )
}

export default ArrowUp
