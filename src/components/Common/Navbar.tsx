import React, { useState, useEffect } from 'react';
import './Navbar.css';

interface NavItem {
  label: string;
  href: string;
  subItems?: NavItem[];
}

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);

  const navItems: NavItem[] = [
    { label: 'Home', href: '/' },
    { 
      label: 'Solutions', 
      href: '#',
      subItems: [
        { label: 'Biometric Verification', href: '/biometric' },
        { label: 'Document Scanning', href: '/document' },
        { label: 'Facial Recognition', href: '/facial' }
      ]
    },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Developers', href: '/developers' },
    { label: 'About', href: '/about' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (!mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const toggleSubmenu = (index: number) => {
    setActiveSubmenu(activeSubmenu === index ? null : index);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-brand">
          <a href="/" aria-label="Identity Verification System">
            <span className="brand-icon">ID</span>
            <span className="brand-name">Identifi</span>
          </a>
        </div>

        <div className={`navbar-links ${mobileMenuOpen ? 'open' : ''}`}>
          <ul>
            {navItems.map((item, index) => (
              <li 
                key={index}
                className={`nav-item ${item.subItems ? 'has-submenu' : ''}`}
                onMouseEnter={() => item.subItems && setActiveSubmenu(index)}
                onMouseLeave={() => item.subItems && setActiveSubmenu(null)}
              >
                <a 
                  href={item.href}
                  onClick={(e) => {
                    if (item.subItems) {
                      e.preventDefault();
                      toggleSubmenu(index);
                    }
                  }}
                >
                  {item.label}
                  {item.subItems && <span className="dropdown-arrow">⌄</span>}
                </a>
                
                {item.subItems && (
                  <ul className={`submenu ${activeSubmenu === index ? 'active' : ''}`}>
                    {item.subItems.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <a href={subItem.href}>{subItem.label}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          <div className="navbar-actions">
            <a href="/login" className="login-btn">Log in</a>
            <a href="/demo" className="demo-btn">Request Demo</a>
          </div>
        </div>

        <button 
          className={`mobile-menu-btn ${mobileMenuOpen ? 'open' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;