import CustomButton from "../CustomButton/CustomButton";
import styles from "./BackButton.module.css";
import BackIcon from "../../../assets/back.svg?react";
import { useNavigate } from "react-router-dom";

const BackButton: React.FC<React.HTMLProps<HTMLButtonElement>> = ({
  className,
  onClick,
  type = "button",
  ...otherProps
}) => {
  const navigate = useNavigate();
  const backClickHandler = () => {
    navigate("..");
  };

  return (
    <CustomButton
      onClick={backClickHandler}
      className={`${className} ${styles["back-button"]}`}
      {...otherProps}
    >
      <BackIcon />
    </CustomButton>
  );
};

export default BackButton;
