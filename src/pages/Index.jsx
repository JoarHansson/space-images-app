import styles from "./Index.module.css";
import { Link } from "react-router-dom";
import Button from "../components/Button/Button";

const Index = () => {
  return (
    <main className={styles.index}>
      <h1 className={styles.h1}>Space Images</h1>

      <Link to={"home"}>
        <Button>Lets go</Button>
      </Link>
    </main>
  );
};

export default Index;
