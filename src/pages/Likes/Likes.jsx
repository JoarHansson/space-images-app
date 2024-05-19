import { useState } from "react";
// components:
import TransitionAnimation from "../../components/TransitionAnimation/TransitionAnimation";
import ImageCard from "../../components/ImageCard/ImageCard";
import Header from "../../components/Header/Header";
// services:
import {
  getFavoritesFromLocalStorage,
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
        {favorites ? (
          favorites.map((favorite) => {
            return (
              <div key={favorite.url}>
                <ImageCard
                  imageData={favorite}
                  imgLiked={true}
                  imgLoaded={true}
                  onClick={() => handleRemove(favorite)}
                />
              </div>
            );
          })
        ) : (
          <p className={styles.noLikes}>You haven't liked any images yet...</p>
        )}
      </div>

      <TransitionAnimation />
    </main>
  );
};

export default Likes;
