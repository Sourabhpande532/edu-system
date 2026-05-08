import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky-top">
      <nav className='navbar navbar-expand-lg py-3'>
        <div className='container'>
          <Link to='/' className='navbar-brand d-flex align-items-center gap-2'>
            <i className="bi bi-mortarboard-fill text-primary fs-3"></i>
            <span>Student Management</span>
          </Link>
          <button
            className='navbar-toggler border-0 shadow-none'
            type="button"
            data-bs-target='#supportNavbar'
            data-bs-toggle='collapse'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='supportNavbar'>
            <ul className='navbar-nav ms-auto mb-2 mb-lg-0 gap-2'>
              <li className='nav-item'>
                <Link to='/' className='nav-link px-3 rounded'>
                  Students
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/class' className='nav-link px-3 rounded'>
                  Classes
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/school' className='nav-link px-3 rounded'>
                  School
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/teacher' className='nav-link px-3 rounded'>
                  Teachers
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
