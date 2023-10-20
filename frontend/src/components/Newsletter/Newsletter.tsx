import CustomInputGroup from "../CustomInputGroup/CustomInputGroup";
import CustomButton from "../UI/CustomButton/CustomButton";
import styles from "./Newsletter.module.css";

const Newsletter = () => {
  return (
    <div className={styles["newsletter-container"]}>
      <h2>Newsletter</h2>
      <form>
        <CustomInputGroup
          id="newsletter-input"
          name="newsletter-input"
          type="text"
          placeholder="your@email.com"
        />
        <CustomButton>Subscribe</CustomButton>
      </form>
    </div>
  );
};

export default Newsletter;
