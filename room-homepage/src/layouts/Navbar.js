import React, { useState } from 'react'
import '../styles/navbar.scss'

const Navbar = () => {

  const [modal, setModal] = useState(false);


  function openModal() {
    setModal(true);
    console.log(modal)
  }

  function closeModal() {
    setModal(false);
    console.log(modal)
  }

  return (
    <nav className="flex">
      <div className="nav-burger button" onClick={openModal}>
        <img src={`${process.env.PUBLIC_URL}/assets/images/icon-hamburger.svg`} />
      </div>
      <div className="nav-brand">
        <h1><img src={`${process.env.PUBLIC_URL}/assets/images/logo.svg`} /></h1>
      </div>
      <div className="nav-link">
        <ul className="link">
          <li><a href="/">home</a></li>
          <li><a href="#">shop</a></li>
          <li><a href="#">about</a></li>
          <li><a href="#">contact</a></li>
        </ul>
      </div>
      {modal && (
        <div className="nav-modal">
          <div className="modal-box">
            <span className="button" onClick={closeModal}><img src={`${process.env.PUBLIC_URL}/assets/images/icon-close.svg`} /></span>
            <ul className="link">
              <li><a href="/">home</a></li>
              <li><a href="#">shop</a></li>
              <li><a href="#">about</a></li>
              <li><a href="#">contact</a></li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;