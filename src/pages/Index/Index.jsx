// components:
import Button from "../../components/Button/Button";
import TransitionAnimation from "../../components/TransitionAnimation/TransitionAnimation";
// css:
import styles from "./Index.module.css";

const Index = () => {
  return (
    <main className={styles.index}>
      <h1 className={styles.h1}>Space Images</h1>

      <div className={styles.flexContainer}>
        <Button isLink={true} linkTo={"home"}>
          Explore images
        </Button>

        <Button isLink={true} linkTo={"likes"}>
          Liked images
        </Button>
      </div>

      <TransitionAnimation />
    </main>
  );
};

export default Index;
