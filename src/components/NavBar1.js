import React,{useState} from 'react';

const NavBar1 = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
  
    return (
      <header id="navbar">
        <div className="header_container">
          <nav className="navbar-container menu-container">
            <a href="/" className="home-link">
              Book Sphere
            </a>
            <button
              type="button"
              id="navbar-toggle"
              aria-controls="navbar-menu"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              onClick={toggleMenu}
            >
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <div
              id="navbar-menu"
              aria-labelledby="navbar-toggle"
              className={isMenuOpen ? 'show' : ''}
            >
              <ul className="navbar-links">
                <li className="navbar-item"><a className="navbar-link" href="/">Home</a></li>
                <li className="navbar-item"><a className="navbar-link" href="#about_section">About</a></li>
                <li className="navbar-item"><a className="navbar-link" href="#contact_section">Contact</a></li>
                <li className="navbar-item"><a className="navbar-link nav-link-login" href="/login">Login </a></li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    );
}

export default NavBar1