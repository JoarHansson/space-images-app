import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";

const Header = React.forwardRef((props, ref) => {
  const location = useLocation();

  return (
    <header ref={ref} className={styles.header}>
      <Link to={"/"}>
        <h1 className={styles.h1}>Space Images</h1>
      </Link>
      <div className={styles.linkContainer}>
        <Link
          to={"/"}
          className={`${styles.link} ${
            location.pathname === "/" && styles.underlined
          }`}
        >
          start
        </Link>
        <Link
          to={"/explore"}
          className={`${styles.link} ${
            location.pathname === "/explore" && styles.underlined
          }`}
        >
          explore
        </Link>
        <Link
          to={"/likes"}
          className={`${styles.link} ${
            location.pathname === "/likes" && styles.underlined
          }`}
        >
          likes
        </Link>
      </div>
    </header>
  );
});

export default Header;
