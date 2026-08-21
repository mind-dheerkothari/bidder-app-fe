import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import userIcon from "../../assets/icons/user.svg";
import closeIcon from "../../assets/icons/close.svg";
import hamBurgerIcon from "../../assets/icons/hamburger.svg";
import notificationIcon from "../../assets/icons/notification.svg";
import "./header.scss";
import { routeConstants } from "../../utils/routeConstant";
import { useDispatch, useSelector } from "react-redux";
import ConfirmModal from "../../sharedComponents/confirmModal/ConfirmModal";
import { logout } from "../../redux/slices/authSlice";
import { USER_ROLE } from "../../utils/propertyResolver";
import { MdArrowOutward } from "react-icons/md";
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isUserLogin } = useSelector((state) => state.auth);
  const { loginUserDetails } = useSelector((state) => state.user);
  const navLinks = [
    {
      id: 1,
      path: routeConstants.HOME_PAGE,
      label: "Home",
      exact: true,
    },
    {
      id: 2,
      path: routeConstants.AUCTION_LIST,
      label: "Auctions",
    },
    {
      id: 3,
      path: "/about",
      label: "About",
    },
    {
      id: 4,
      path: "/contact",
      label: "Contact",
    },
  ];
  // Toggle mobile menu
  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const toggleModal = () => setModalOpen((prev) => !prev);

  const handleConfirm = () => {
    dispatch(logout());
    toggleModal();
    navigate(routeConstants.HOME_PAGE);
  };

  const handleUserIconClick = () => {
    navigate(routeConstants.USER_PROFILE);
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          {/* Left Section: Logo & Navigation */}
          <div className="left-section">
            <h1 className="logo">BidMaster</h1>
            <nav className={`nav ${menuOpen ? "open" : ""}`}>
              {menuOpen && <h1 className="logo">BidMaster</h1>}
              <ul className="nav-links">
                {navLinks.map((item, index) => (
                  <li key={index}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => (isActive ? "active" : "")}
                      onClick={() => setMenuOpen(false)}
                      end={item.exact}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Right Section: Icons & Login */}
          <div className="right-section">
            {isUserLogin && (
              <>
                <img
                  src={notificationIcon}
                  alt="notification"
                  className="icon"
                />
                <img
                  src={userIcon}
                  alt="user login"
                  className="icon"
                  onClick={handleUserIconClick}
                />
              </>
            )}
            {!isUserLogin && (
              <button
                className="btn-primary"
                onClick={() => navigate(routeConstants.SIGN_IN)}
              >
                Sign In
              </button>
            )}
            {[USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN].includes(
              loginUserDetails?.role_id
            ) && (
              <button
                className="btn-primary d-flex justify-content-center align-items-center gap-1"
                onClick={() => {
                  window.open(routeConstants.ADMIN_AUCTION_LIST);
                }}
              >
                Admin Panel <MdArrowOutward />
              </button>
            )}

            {/* Mobile Menu Toggle Button */}
            <button className="menu-toggle" onClick={toggleMenu}>
              <img
                src={menuOpen ? closeIcon : hamBurgerIcon}
                alt="notification"
                className="icon"
              />
            </button>
          </div>
        </div>
      </header>
      {modalOpen && (
        <ConfirmModal
          isOpen={modalOpen}
          toggle={toggleModal}
          title="Logout Confirmation"
          message="Are you sure want to logout?"
          confirmText="Yes"
          cancelText="Cancel"
          isWarningIconShow={true}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}
