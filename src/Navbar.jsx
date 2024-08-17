/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ isLogin, logOut }) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-transpert">
        <div className="container-fluid">
          <Link className="navbar-brand" to="home">
            Filma
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {isLogin ? (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="home"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link " to="movies">
                      Movies
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="People">
                      People
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="tv">
                      Tv
                    </Link>
                  </li>
                </>
              ) : (
                ""
              )}
            </ul>
            <ul className="navbar-nav d-flex  mb-2 mb-lg-0">
              {!isLogin ? (
                <>
                  <li className="nav-item order-lg-last order-first">
                    <Link className="nav-link" to="login">
                      LogIn
                    </Link>
                  </li>
                  <li className="nav-item order-lg-last order-first">
                    <Link className="nav-link" to="Signup">
                      SignUp
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item order-lg-last order-first ">
                    <span onClick={logOut} className="nav-link">
                      LogOut
                    </span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
