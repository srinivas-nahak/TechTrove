import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.Footer}>
      <ul className={styles["footer-content"]}>
        <li>About Us</li>
        <li>Store Locator</li>
        <li>Contact Us</li>
        <li>FAQs</li>
        <li>News</li>
        <li>Careers</li>
      </ul>
    </footer>
  );
};

export default Footer;
