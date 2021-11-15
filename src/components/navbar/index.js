import React, { useState } from "react";
import { navigate } from "gatsby";
import { Link } from "gatsby";
import { setPopup } from "../../redux/features/popup/popupSlice";
import { selectUser, signOut } from "../../redux/features/user/usersSlice";
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import "./navbar.scss";
import "@fontsource/space-mono/400-italic.css";
import { useDispatch, useSelector } from "react-redux";

function Navbar() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);
  const [navbarOpen, setNavbarOpen] = useState(false);

  const handleScroll = () => {
    setNavbarOpen(false);
  };
  const openForm = () => {
    dispatch(setPopup());
    setNavbarOpen(false);
  };
  const logout = () => {
    dispatch(signOut(navigate));
    setNavbarOpen(false);
  };
  return (
    <>
      <nav className="w-full relative flex flex-wrap justify-between px-2 py-3 text-gray-light lg:h-15 z-50 nav-fix bg-black">
        <div className="w-full lg:w-11/12 px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <span className="brand cursor-pointer text-3xl text-purple">
              Skill++
            </span>
            <button
              className="cursor-pointer text-lg leading-none px-3 py-1 border border-solid border-transparent rounded block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <FaBars size="1.5em" />
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow lg:items-center absolute top-0 right-0 lg:fixed lg:w-full lg:h-20 blur menu" +
              (navbarOpen ? " menu-active" : "")
            }
          >
            <ul className="pl-5 lg:pl-0 flex flex-col lg:flex-row list-none lg:ml-auto">
              <button
                className="mb-10 ml-auto cursor-pointer text-lg leading-none px-9 py-4 border border-solid border-transparent rounded block lg:hidden outline-none focus:outline-none"
                type="button"
                onClick={handleScroll}
              >
                <ImCross />
              </button>
              <li className="my-3 lg:my-1 flex items-center list">
                <Link
                  to="/"
                  className="px-3  lg:text-md leading-snug hover:text-purple"
                  onClick={handleScroll}
                >
                  <span className="ml-2">Home</span>
                </Link>
              </li>
              <li className="my-3 lg:my-1 flex items-center list">
                <Link
                  to="/profile"
                  className="px-3  lg:text-md leading-snug hover:text-purple"
                  onClick={handleScroll}
                >
                  <span className="ml-2">Profile</span>
                </Link>
              </li>
              <li className="my-3 lg:my-1 flex items-center list">
                <Link
                  to="/dashboard"
                  className="px-3  lg:text-md leading-snug hover:text-purple"
                  onClick={handleScroll}
                >
                  <span className="ml-2">Dashboard</span>
                </Link>
              </li>
              <li className="my-3 lg:my-1 flex items-center list">
                <button
                  className="px-3 lg:text-md ml-2 bg-purple-dark text-white p-2 hover:shadow-md px-8 rounded-3xl"
                  onClick={currentUser ? logout : openForm}
                >
                  {currentUser ? "Sign out" : "Sign in"}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="w-full relative flex flex-wrap justify-between px-2 py-3 text-gray-light h-20 z-0 mb-6"></div>
    </>
  );
}

export default Navbar;
