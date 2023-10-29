import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles["footer-container"]}>
      <ul className={styles["footer-content"]}>
        <li>About Us</li>
        <li>Store Locator</li>
        <li>Contact Us</li>
        <li>FAQs</li>
        <li>News</li>
        <li>Careers</li>
      </ul>
    </div>
  );
};

export default Footer;
