import { Link } from "react-router-dom";
import styles from "./Button.module.css";

const Button = ({ onClick, children, isLink = false, linkTo }) => {
  return isLink ? (
    <Link className={styles.button} onClick={onClick} to={linkTo}>
      {children}
    </Link>
  ) : (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
