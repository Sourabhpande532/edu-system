import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <nav className='navbar navbar-expand-lg bg-body-tertiary'>
        <div className='container'>
          <Link className='navbar-brand'>Student Management System</Link>
          <button
            className='navbar-toggler'
            data-bs-target='#supportNavbar'
            data-bs-toggle='collapse'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='supportNavbar'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                <Link to='/' className='nav-link active'>
                  Students
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/class' className='nav-link'>
                  Classes
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/school' className='nav-link'>
                  School
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
