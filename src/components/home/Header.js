import React from 'react';


function Header() {
  const isAuthenticated = false; // Replace with real auth state (e.g., from context or Redux)

  return (
    <header id="header" className="header d-flex align-items-center fixed-top">
      <div className="container-fluid position-relative d-flex align-items-center justify-content-between">

        <a href="/" className="logo d-flex align-items-center me-auto me-xl-0">
          <img src="/assets/logo.png" alt="Logo" />
          <h1 className="sitename">TAMO</h1><span>.</span>
        </a>

        <nav id="navmenu" className="navmenu">
          <ul>
            <li><a href="/" className="active">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
        </nav>

        <div className="auth-buttons d-flex">
          {isAuthenticated ? (
            <a href="/dashboard" className="btn-getstarted">Dashboard</a>
          ) : (
            <>
              <a className="btn-getstarted me-2" href="/login">Log in</a>
              <a className="btn-getstarted" href="/register">Register</a>
            </>
          )}
        </div>

        <a className="btn-getstarted ms-3" href="#about">Get Started</a>
      </div>
    </header>
  );
}

export default Header;
