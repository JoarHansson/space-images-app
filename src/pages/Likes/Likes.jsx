// packages:
import { Link } from "react-router-dom";
// components:
import HeartButton from "../../components/HeartButton/HeartButton";
import TransitionAnimation from "../../components/TransitionAnimation/TransitionAnimation";
import ImageCard from "../../components/ImageCard/ImageCard";
import Header from "../../components/Header/Header";
// css:
import styles from "./Likes.module.css";

const Likes = () => {
  const imgLiked = true;

  // todo:
  // break out this these functions for more DRY code (copied from Home.jsx)
  const getFavoritesFromLocalStorage = () => {
    let favorites = [];
    try {
      favorites = JSON.parse(localStorage.getItem("favorites"));
    } catch (error) {
      console.error(
        "Invalid JSON in localStorage for 'favorites'. Resetting to empty array."
      );
      favorites = [];
    }
    return favorites;
  };

  let favorites = getFavoritesFromLocalStorage();
  console.log(favorites);

  return (
    <main className={styles.likes}>
      <Link to={"/"}>home</Link>

      <div className={styles.container}>
        {favorites.map((favorite) => {
          return (
            <ImageCard
              imageData={favorite}
              key={favorite.url}
              imgLiked={true}
              imgLoaded={true}
            />
          );
        })}
      </div>

      <TransitionAnimation />
    </main>
  );
};

export default Likes;
