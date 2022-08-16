import './searchbar.scss'
import searchIcon from '../../assets/svgs/searchIcon.svg'

const SearchBar = ({search, setSearch}) => {
  const handleChange = (e:any) => {
    setSearch(e.target.value)
  }
  return <div className="search-bar">
    <div className="search">
      <button className='search-icon'>
        <img src={searchIcon} alt="search-btn" />
      </button>
      <input type="text" value={search} onChange={handleChange} placeholder='Search items' />
    </div>
  </div>
}

export default SearchBar