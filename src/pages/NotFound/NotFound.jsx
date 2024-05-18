// components:
import Button from "../../components/Button/Button";
import TransitionAnimation from "../../components/TransitionAnimation/TransitionAnimation";
// css:
import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <main className={styles.notFound}>
      <h1 className={styles.h1}>404</h1>

      <Button isLink={true} linkTo={"/"}>
        go home
      </Button>

      <TransitionAnimation />
    </main>
  );
};

export default NotFound;
