import ReactDOM from "react-dom";
import Card from "../UI/Card/Card";
import styles from "./CustomModalDialog.module.css";
import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import lottie from "lottie-web";
import tickAnimation from "../../assets/tickAnimation.json";
import deleteAnimation from "../../assets/deleteAnimation.json";
import CustomButton from "../UI/CustomButton/CustomButton";

const CustomModalDialog: React.FC<{
  message: string;
  btnText?: string;
  clickHandler?: () => void;
  dialogType?: "success" | "failure" | "choice";
  btnAnimationEndHandler?: () => void;
}> = ({
  message,
  clickHandler,
  btnText = "Okay",
  dialogType = "success",
  btnAnimationEndHandler,
}) => {
  const dispatch = useDispatch();
  const animationContainer = useRef<HTMLDivElement | null>(null);
  const [btnAnimationProgress, setBtnAnimationProgress] = useState(100);
  const requestIdRef = useRef(0);

  const getButtons = () => {
    if (dialogType === "choice") {
      return (
        <div className={styles["modal-dialog__choice-btn-container"]}>
          <CustomButton
            onClick={clickHandler}
            className={styles["modal-dialog__choice-positive"]}
          >
            Cancel
          </CustomButton>
          <CustomButton
            onClick={clickHandler}
            className={styles["modal-dialog__choice-negative"]}
          >
            Delete
          </CustomButton>
        </div>
      );
    }

    return (
      <CustomButton
        onClick={clickHandler}
        className={styles["modal-dialog__btn-container"]}
        style={{
          background: `linear-gradient(to right, #36ba3c 0%, #36ba3c ${btnAnimationProgress}%, #99ed9d 0%, #99ed9d 100%)`,
        }}
        disabled={btnAnimationProgress === 0}
      >
        {btnText ? btnText : "Okay"}
      </CustomButton>
    );
  };

  const handleBtnAnimationStart = () => {
    if (!requestIdRef.current) {
      startButtonAnimation();
    }
  };

  const startButtonAnimation = () => {
    setBtnAnimationProgress((currentProgress) =>
      Math.max(currentProgress - 0.8, 0)
    );

    if (btnAnimationProgress > 0) {
      requestIdRef.current = requestAnimationFrame(startButtonAnimation);
    }
  };

  useEffect(() => {
    const animationInstance = lottie.loadAnimation({
      container: animationContainer.current!, // the dom element that will contain the animation
      renderer: "svg",
      loop: true,

      autoplay: true,
      animationData: dialogType === "choice" ? deleteAnimation : tickAnimation,
    });

    //Showing the delete animation twice
    if (dialogType === "choice") {
      let repetitions = 0;

      animationInstance.addEventListener("loopComplete", () => {
        repetitions++;
        if (repetitions === 2) {
          animationInstance.stop();
        }
      });
    }

    handleBtnAnimationStart();

    return () => animationInstance.destroy();
  }, []);

  useEffect(() => {
    if (btnAnimationEndHandler && btnAnimationProgress === 0) {
      btnAnimationEndHandler();
    }
  }, [btnAnimationProgress]);

  const backdrop = <div className={styles["modal-dialog-backdrop"]}></div>;
  const customModal = (
    <Card className={styles["modal-dialog-container"]}>
      <div
        className={styles["modal-dialog__animation-container"]}
        ref={animationContainer}
        style={
          dialogType === "choice"
            ? { width: "6rem", marginBottom: "1.2rem", opacity: "0.9" }
            : {}
        }
      ></div>
      <p>{message}</p>

      {getButtons()}
    </Card>
  );

  return (
    <>
      {ReactDOM.createPortal(
        customModal,
        document.getElementById("overlay-root")!
      )}
      {ReactDOM.createPortal(
        backdrop,
        document.getElementById("backdrop-root")!
      )}
    </>
  );
};

export default CustomModalDialog;
