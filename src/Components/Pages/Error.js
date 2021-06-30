import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
    return (<>
    <div className="error" style={{color:"white"}}>Sorry the url "{window.location.href}" you requested is invalid </div>
    <Link to="/">
    <button className="btn-primary"> Go to Home</button>
    </Link>

    </>
    )
}

export default Error
