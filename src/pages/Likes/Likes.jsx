import { useState } from "react";
// components:
import TransitionAnimation from "../../components/TransitionAnimation/TransitionAnimation";
import ImageCard from "../../components/ImageCard/ImageCard";
import Header from "../../components/Header/Header";
// services:
import {
  getFavoritesFromLocalStorage,
  checkIfInLocalStorage,
  removeFromFavorites,
} from "../../services/utils";
// css:
import styles from "./Likes.module.css";

const Likes = () => {
  const [favorites, setFavorites] = useState(getFavoritesFromLocalStorage());

  const handleRemove = (favorite) => {
    removeFromFavorites(favorite);
    setFavorites(getFavoritesFromLocalStorage());
  };

  return (
    <main className={styles.likes}>
      <Header />

      <div className={styles.container}>
        {favorites.map((favorite) => {
          return (
            <div key={favorite.url}>
              <ImageCard
                imageData={favorite}
                imgLiked={true}
                imgLoaded={true}
                onClick={() => handleRemove(favorite)}
              />
              <button onClick={() => checkIfInLocalStorage(favorite)}>
                test
              </button>
            </div>
          );
        })}
      </div>

      <TransitionAnimation />
    </main>
  );
};

export default Likes;
