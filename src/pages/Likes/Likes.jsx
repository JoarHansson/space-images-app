import { useState } from "react";
// components:
import TransitionAnimation from "../../components/TransitionAnimation/TransitionAnimation";
import ImageCardWithFrame from "../../components/ImageCardWithFrame/ImageCardWithFrame";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
// services:
import {
  clearFavorites,
  getFavoritesFromLocalStorage,
  removeFromFavorites,
} from "../../services/utils";
// css:
import styles from "./Likes.module.css";

const Likes = () => {
  const [favorites, setFavorites] = useState(
    getFavoritesFromLocalStorage() || []
  );

  const handleRemove = (favorite) => {
    removeFromFavorites(favorite);
    setFavorites(getFavoritesFromLocalStorage() || []);
  };

  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear all likes?")) {
      clearFavorites();
      setFavorites(getFavoritesFromLocalStorage() || []);
    }
  };

  return (
    <main className={styles.likes}>
      <Header />

      <div className={styles.container}>
        {favorites.length ? (
          favorites.map((favorite) => {
            return (
              <div key={favorite.url}>
                <ImageCardWithFrame
                  imageData={favorite}
                  imgLiked={true}
                  imgLoaded={true}
                  onClick={() => handleRemove(favorite)}
                />
              </div>
            );
          })
        ) : (
          <p className={styles.noLikes}>
            You haven&apos;t liked any images yet...
          </p>
        )}
      </div>

      {favorites.length > 0 && (
        <Button onClick={handleClear}>Clear Likes</Button>
      )}

      <TransitionAnimation />
    </main>
  );
};

export default Likes;
