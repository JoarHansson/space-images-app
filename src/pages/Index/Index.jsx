// packages:
import { Link } from "react-router-dom";
// components:
import Button from "../../components/Button/Button";
import TransitionAnimation from "../../components/TransitionAnimation/TransitionAnimation";
// css:
import styles from "./Index.module.css";

const Index = () => {
  return (
    <main className={styles.index}>
      <h1 className={styles.h1}>Space Images</h1>

      <Link to={"home"}>
        <Button>Lets go</Button>
      </Link>

      <Link to={"likes"}>
        <Button>Likes</Button>
      </Link>

      <TransitionAnimation />
    </main>
  );
};

export default Index;
