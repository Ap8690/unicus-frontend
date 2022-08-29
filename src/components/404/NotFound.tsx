import React from 'react'
import "./not_found.scss"
import {Link} from 'react-router-dom'

const NotFound = () => {
  return (
    <div id="notfound" className='w-full'>
		<div className="notfound">
			<div className="notfound-404">
				<h1>Oops!</h1>
			</div>
			<h2>404 - Page not found</h2>
			{/* <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p> */}
			<Link className='btn' to="/home">Go To Homepage</Link>
		</div>
	</div>
  )
}

export default NotFound