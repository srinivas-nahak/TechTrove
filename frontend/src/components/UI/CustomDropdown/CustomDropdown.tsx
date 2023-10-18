import { useEffect, useRef, useState } from "react";
import styles from "./CustomDropdown.module.css";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../../../store/apiSlices/userApiSlice";
import { authAction } from "../../../store/authSlice";
import { useLocation, useNavigate } from "react-router-dom";

type CustomDropDownType<T extends HTMLElement> = {
  elementRef: React.MutableRefObject<T | null>;
  closeDialog: () => void;
};

const CustomDropdown: React.FC<CustomDropDownType<HTMLElement>> = ({
  elementRef,
  closeDialog,
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();

  //Setting Dialog Position
  const customDropDownRef = useRef<HTMLDivElement | null>(null);
  const defaultDialogPosition = { top: 0, left: 0 };

  const [dialogPosition, setDialogPosition] = useState(defaultDialogPosition);

  const elementRect = elementRef.current?.getBoundingClientRect();

  const adjustDialogPosition = () => {
    dialogPosition.top = elementRect!.top + window.scrollY;

    const tempRight = window.innerWidth - elementRect!.right;

    dialogPosition.left = elementRect!.left - tempRight;

    setDialogPosition((_) => ({ ...defaultDialogPosition }));
  };

  const openOrdersHandler = () => {
    closeDialog();
    navigate("/orders");
  };

  //Closing the dialog if clicked on the outside area
  const handleOutsideClick = (event: MouseEvent) => {
    if (
      customDropDownRef.current &&
      !customDropDownRef.current.contains(event.target as Node)
    ) {
      //setShowLoginDialog(false);

      closeDialog();
    }
  };

  useEffect(() => {
    adjustDialogPosition();

    //Handling outside click
    document.addEventListener("mousedown", handleOutsideClick);

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  //Dropdown Click Handler
  const logoutHandler = async () => {
    try {
      await logout();
      dispatch(authAction.removeCredentials());
      closeDialog();

      //If current path is not home then navigating to home
      if (pathname !== "/") {
        navigate("/");
      }
    } catch (error) {}
  };

  return (
    <div
      className={styles["custom-dropdown"]}
      style={{
        top: dialogPosition.top,
        left: dialogPosition.left,
      }}
      ref={customDropDownRef}
    >
      <p>Profile</p>
      <p onClick={openOrdersHandler}>My Orders</p>
      <p onClick={logoutHandler}>Logout</p>
    </div>
  );
};

export default CustomDropdown;

{
  /* <p>
          <FaUser />
              Profile
            </p>
            <p>
              <FaShoppingBag />
              My Orders
            </p>
            <p>
              <FaPowerOff />
              Logout
            </p> */
}
