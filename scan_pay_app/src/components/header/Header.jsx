import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaBars } from "react-icons/fa";
import { links } from "../../data/navData";
import "./header.css";
import { Link } from "react-router-dom";
import { logout } from "../../redux/actions/userActions";

const Navbar = () => {
  const dispatch = useDispatch();
  const [showLinks, setShowLinks] = useState(false);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);
  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    if (showLinks) {
      linksContainerRef.current.style.height = `${linksHeight}px`;
    } else {
      linksContainerRef.current.style.height = "0px";
    }
  }, [showLinks]);

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <nav>
      <div className="nav-center">
        <div className="nav-header">
          <h4 className="logo">
            <Link to="/">ScanPay</Link>
          </h4>
          <button className="nav-toggle" onClick={toggleLinks}>
            <FaBars />
          </button>
        </div>
        <div className="links-container" ref={linksContainerRef}>
          <ul className="links" ref={linksRef}>
            {links.map((link) => {
              const { id, url, text } = link;
              return (
                <li key={id}>
                  <Link to={url}>{text}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <ul>
          <li>
            <Link to="/cart">Cart ({cartItems?.length})</Link>
          </li>
        </ul>
        <div className="dropdown">
          <a
            className="btn btn-secondary dropdown-toggle"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Account
          </a>
          {userInfo ? (
            <ul className="dropdown-menu">
              <li className="dropdown-item">Hi, {userInfo?.username}</li>
              <li>
                <Link className="dropdown-item" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="dropdown-menu">
              <li>
                <Link to="/register" className="dropdown-item">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/login" className="dropdown-item">
                  Login
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
