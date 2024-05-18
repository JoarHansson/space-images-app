export const getFavoritesFromLocalStorage = () => {
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

export const checkIfInLocalStorage = (itemToCheck) => {
  let favorites = getFavoritesFromLocalStorage();

  // check for matches, one or many, in local storage
  favorites = favorites.filter((favorite) => {
    return JSON.stringify(favorite) === JSON.stringify(itemToCheck);
  });

  if (favorites.length > 0) {
    console.log(true, favorites);
  } else {
    console.log(false, favorites);
  }

  return favorites.length > 0 ? true : false;
};

export const addToFavorites = (itemToAdd) => {
  let favorites = getFavoritesFromLocalStorage();

  if (Array.isArray(favorites)) {
    localStorage.setItem(
      "favorites",
      JSON.stringify([...favorites, itemToAdd])
    );
  } else {
    localStorage.setItem("favorites", JSON.stringify([itemToAdd]));
  }
};

export const removeFromFavorites = (itemToRemove) => {
  let favorites = getFavoritesFromLocalStorage();

  // remove if the selected one matches one (or many) in local storage
  favorites = favorites.filter((favorite) => {
    return JSON.stringify(favorite) !== JSON.stringify(itemToRemove);
  });

  localStorage.setItem("favorites", JSON.stringify(favorites));
};
