import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import DateInput from "../DateInput/DateInput";
import styles from "./Header.module.css";

const Header = React.forwardRef((props, ref) => (
  <header ref={ref} className={styles.header}>
    <Link to={"/"}>
      <h1 className={styles.h1}>Space Images</h1>
    </Link>
    <div className={styles.container}>
      <Button onClick={props.onClickRandomButton}>Get random image</Button>
      <DateInput
        onChange={props.onChangeDateInput}
        imageDate={props.imageDate}
      />
    </div>
  </header>
));

export default Header;
