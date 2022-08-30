import './searchbar.scss'
import searchIcon from '../../assets/svgs/searchIcon.svg'

const SearchBar = ({search, setSearch, handleGlobalSearch}) => {
  const handleChange = (e:any) => {
    setSearch(e.target.value)
  }
  return <form onSubmit={handleGlobalSearch} className="search-bar">
    <div className="search">
      <button className='search-icon'>
        <img src={searchIcon} alt="search-btn" />
      </button>
      <input type="text" value={search} onChange={handleChange} placeholder='Search items' />
    </div>
  </form>
}

export default SearchBar