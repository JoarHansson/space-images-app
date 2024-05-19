import React from "react";
import Button from "../Button/Button";
import DateInput from "../DateInput/DateInput";
import styles from "./Footer.module.css";

const Footer = React.forwardRef((props, ref) => {
  return (
    <footer ref={ref} className={styles.footer}>
      <a
        href="https://github.com/JoarHansson/space-images-app"
        className={styles.githubLink}
        target="”_blank”"
      >
        Github
      </a>
      <div className={styles.container}>
        <Button onClick={props.onClickRandomButton}>Get random image</Button>
        <DateInput
          onChange={props.onChangeDateInput}
          imageDate={props.imageDate}
        />
      </div>
    </footer>
  );
});

export default Footer;
