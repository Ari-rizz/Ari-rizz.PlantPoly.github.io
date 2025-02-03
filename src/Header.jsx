import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const navigateToHomeAndScroll = (id) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const section = document.getElementById(id);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); 
    } else {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header id="header" className={isVisible ? 'visible' : ''}>
      <div className="logo">
        <Link to="/"><img src="/src/assets/logo.png" alt="PlantPoly logo" /></Link>
      </div>
      <nav>
        <ul>
          <li><a href="#" onClick={(e) => { e.preventDefault(); navigateToHomeAndScroll('problem'); }}>Problem</a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); navigateToHomeAndScroll('solution'); }}>Solution</a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); navigateToHomeAndScroll('contact'); }}>Contact</a></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
