import React from "react";
import styles from "./Footer.module.css";

const Footer = React.forwardRef((props, ref) => (
  <footer ref={ref} className={styles.footer}>
    <a
      href="https://github.com/JoarHansson/space-images-app"
      className={styles.githubLink}
      target="”_blank”"
    >
      Github
    </a>
    <button className={styles.infoButton} onClick={props.onClickImageInfo}>
      Image Info
    </button>
  </footer>
));

export default Footer;
