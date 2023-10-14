import { useSelector } from "react-redux";
import Loader from "../../Loader";
import styles from "./CustomButton.module.css";

import React from "react";
import { RootState } from "../../../store";

const CustomButton: React.FC<
  {
    type?: "button" | "submit" | "reset";
  } & React.HTMLProps<HTMLButtonElement>
> = ({ children, type = "button", className, ...otherProps }) => {
  const btnLoaderStyles = useSelector(
    (state: RootState) => state.buttonLoaderReducer
  );

  const loaderColor = btnLoaderStyles.loaderColor || "white";
  const loaderSize = btnLoaderStyles.loaderSize || "1.5rem";

  const loader = <Loader customColor={loaderColor} customSize={loaderSize} />;

  return (
    <button
      type={type}
      className={`${className} ${styles["custom-button"]}`}
      {...otherProps}
    >
      {btnLoaderStyles.showLoader ? loader : children}
    </button>
  );
};

export default CustomButton;
