import React from 'react';
// import { Link, useLocation } from 'react-router-dom';

// const Navbar = () => {
// const currentPage = useLocation().pathname;

//     return ( 
//         <>
//             <nav className="navbar fixed-top">
//                 <h1>Dogalogue</h1>
//                 <div className="links">
//                     <Link to="/" className={currentPage === '/' ? 'nav-link active' : 'nav-link'}>Dog House</Link>
//                     <Link to="/profile" className={currentPage === '/profile' ? 'nav-link active' : 'nav-link'}>Profile</Link>
                    
//                 </div>
//             </nav>
//         </>
//      );
// }
 
// export default Navbar;


import Nav from 'react-bootstrap/Nav';

function Navbar() {
  return (
    <>
    <nav className="navbarmargintop">
    {/* <h1>Dogalogue</h1> */}
    <Nav  variant="tabs" defaultActiveKey="/home">
    <h1 className="titlespace">Dogalogue</h1>
      <Nav.Item>
        <Nav.Link href="/">Dog House</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/profile">Profile</Nav.Link>
      </Nav.Item>
      {/* <Nav.Item>
        <Nav.Link eventKey="disabled" disabled>
          Disabled
        </Nav.Link>
      </Nav.Item> */}
    </Nav>
    </nav>
    </>
  );
}

export default Navbar;