import React from "react";
import Button from "../Button/Button";
import styles from "./Header.module.css";
import DateInput from "../DateInput/DateInput";

const Header = React.forwardRef((props, ref) => (
  <header ref={ref} className={styles.header}>
    <h1 className={styles.h1}>Space Images</h1>
    <div className={styles.container}>
      <Button onClick={props.onClickRandomButton}>Get random image</Button>
      <DateInput onChange={props.onChangeDateInput} />
    </div>
  </header>
));

export default Header;
