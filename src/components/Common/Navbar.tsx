import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext"; // adjust import
import "./Navbar.css";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);

  const {
    isAuthenticated,
    organization = { name: "User" } as { name: string } | unknown,
    logout,
  } = useAuth();

  const navItems = [
    { label: "Home", href: "/" },
    {
      label: "Solutions",
      href: "#",
      subItems: [
        { label: "Biometric Verification", href: "/biometric" },
        { label: "Document Scanning", href: "/document" },
        { label: "Facial Recognition", href: "/facial" },
      ],
    },
    { label: "Pricing", href: "/pricing" },
    { label: "Developers", href: "/developers" },
    { label: "About", href: "/about" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    document.body.style.overflow = mobileMenuOpen ? "" : "hidden";
  };

  const toggleSubmenu = (index: number) => {
    setActiveSubmenu(activeSubmenu === index ? null : index);
  };

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <div className="navbar-brand">
          <a href="/">
            <span className="brand-icon">ID</span>
            <span className="brand-name">IDFace</span>
          </a>
        </div>

        <div className={`navbar-links ${mobileMenuOpen ? "open" : ""}`}>
          <ul>
            {navItems.map((item, index) => (
              <li
                key={index}
                className={`nav-item ${item.subItems ? "has-submenu" : ""}`}
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
                  <ul
                    className={`submenu ${
                      activeSubmenu === index ? "active" : ""
                    }`}
                  >
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
            {!isAuthenticated ? (
              <a href="/login" className="login-btn">
                Log in
              </a>
            ) : (
              <div className="user-dropdown">
                <span className="user-name">
                  {typeof organization === "object" &&
                  organization !== null &&
                  "name" in organization &&
                  typeof (organization as { name: string }).name === "string"
                    ? String((organization as { name: string }).name)
                    : "User"}{" "}
                  ⌄
                </span>
                <ul className="dropdown-menu">
                  <li>
                    <a href="/dashboard">Dashboard</a>
                  </li>
                  <li>
                    <button onClick={logout}>Log out</button>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <a href="/demo" className="demo-btn">
            Request Demo
          </a>
        </div>

        <button
          className={`mobile-menu-btn ${mobileMenuOpen ? "open" : ""}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
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
