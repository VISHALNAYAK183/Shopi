// src/context/WishlistContext.js
import React, { createContext, useContext, useState } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

const addToWishlist = (product) => {
  let added = false;
  setWishlist(prev => {
    if (prev.find(item => item.id === product.id)) return prev;
    added = true;
    return [...prev, product];
  });
  return added;
};


  const removeFromWishlist = (productId) => {
    setWishlist(prev => prev.filter(item => item.id !== productId));
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
