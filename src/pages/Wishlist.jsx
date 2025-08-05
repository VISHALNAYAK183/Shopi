// src/Wishlist.jsx
import React from 'react';
import { useWishlist } from "../context/WishlistContextTemp";


function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();

  if (wishlist.length === 0) return <p>No items in wishlist.</p>;

  return (
    <div className="wishlist-container">
      <h2>Your Wishlist</h2>
      {wishlist.map(product => (
        <div key={product.id} className="wishlist-item">
          <img src={product.imgurl} alt={product.heading} />
          <div>
            <h3>{product.heading}</h3>
            <p>₹{product.price}</p>
            <button onClick={() => removeFromWishlist(product.id)}>Remove</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Wishlist;
