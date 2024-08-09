import React from 'react';
import { Link, useLocation } from 'react-router-dom';


const Navbar = () => {
const currentPage = useLocation().pathname;

    return ( 
        <>
            <nav className="navbar">
                <h1>Dogalogue</h1>
                <div className="links">
                    <Link to="/" className={currentPage === '/' ? 'nav-link active' : 'nav-link'}>Dog House</Link>
                    <Link to="/profile" className={currentPage === '/profile' ? 'nav-link active' : 'nav-link'}>Profile</Link>
                    
                </div>
            </nav>
        </>
     );
}
 
export default Navbar;