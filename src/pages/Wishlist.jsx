import React from 'react';
import { useWishlist } from "../context/WishlistContextTemp";
import './Wishlist.css'; // Import the custom CSS

function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();

  if (wishlist.length === 0) return <p className="empty-text">No items in wishlist.</p>;

  return (
    <div className="wishlist-container">
      <h2>Your Wishlist</h2>
      <div className="wishlist-grid"  >
        {wishlist.map(product => (
          <div key={product.id} className="wishlist-card">
            <img src={product.imgurl} alt={product.heading} className="wishlist-image" />
            <div className="wishlist-details">
              <h3>{product.heading}</h3>
              <p>₹{product.price}</p>
              <button onClick={() => removeFromWishlist(product.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
