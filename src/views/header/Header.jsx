import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import userIcon from "../../assets/icons/user.svg";
import closeIcon from "../../assets/icons/close.svg";
import hamBurgerIcon from "../../assets/icons/hamburger.svg";
import notificationIcon from "../../assets/icons/notification.svg";
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
      <header className="sticky top-0 bg-[linear-gradient(90deg,#7b2334,#9f3247)] text-primary z-[1000]">
        <div className="mx-auto flex justify-between items-center relative p-4">
          {/* Left Section: Logo & Navigation */}
          <div className="flex items-center gap-[30px]">
            <h1 className="text-[1.8rem] font-bold flex items-center justify-center">
              BidMaster
            </h1>
            <nav
              className={`flex items-center ${
                menuOpen
                  ? "absolute top-0 left-0 w-1/2 h-screen bg-[linear-gradient(to_bottom,#752030,#9f3247)] p-[15px] flex-col text-center pt-[20%]"
                  : "max-md:hidden"
              }`}
            >
              {menuOpen && (
                <h1 className="text-[1.8rem] font-bold flex items-center justify-center">
                  BidMaster
                </h1>
              )}
              <ul
                className={`list-none flex gap-5 ${
                  menuOpen
                    ? "flex-col items-center justify-center w-full gap-[15px] -ml-10"
                    : ""
                }`}
              >
                {navLinks.map((item, index) => (
                  <li key={index} className={menuOpen ? "w-full" : ""}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `no-underline text-white text-base transition-colors duration-300 ${
                          menuOpen
                            ? `block p-[10px] text-center text-[1.2rem] hover:bg-white/20 hover:rounded-[10px] ${
                                isActive ? "bg-white/20 rounded-[10px]" : ""
                              }`
                            : isActive
                            ? "font-bold border-b-2 border-white"
                            : ""
                        }`
                      }
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
          <div className="flex items-center gap-[15px]">
            {isUserLogin && (
              <>
                <img
                  src={notificationIcon}
                  alt="notification"
                  className="h-6 cursor-pointer transition-colors duration-300"
                />
                <img
                  src={userIcon}
                  alt="user login"
                  className="h-6 cursor-pointer transition-colors duration-300"
                  onClick={handleUserIconClick}
                />
              </>
            )}
            {!isUserLogin && (
              <button
                className="bg-link-bg text-white border-none py-2 px-4 rounded-[5px] cursor-pointer transition-colors duration-300 hover:bg-[#8c2a3d]"
                onClick={() => navigate(routeConstants.SIGN_IN)}
              >
                Sign In
              </button>
            )}
            {[USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN].includes(
              loginUserDetails?.role_id
            ) && (
              <button
                className="bg-link-bg text-white border-none py-2 px-4 rounded-[5px] cursor-pointer transition-colors duration-300 hover:bg-[#8c2a3d] d-flex justify-content-center align-items-center gap-1"
                onClick={() => {
                  window.open(routeConstants.ADMIN_AUCTION_LIST);
                }}
              >
                Admin Panel <MdArrowOutward />
              </button>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              className="block md:hidden text-[1.8rem] bg-transparent border-none text-white cursor-pointer transition-colors duration-300"
              onClick={toggleMenu}
            >
              <img
                src={menuOpen ? closeIcon : hamBurgerIcon}
                alt="notification"
                className="h-6 cursor-pointer transition-colors duration-300"
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
