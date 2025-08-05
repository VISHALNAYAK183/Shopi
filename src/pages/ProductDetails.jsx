// src/ProductDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.css'; // Import CSS for styling
import { useWishlist } from '../context/WishlistContextTemp';
import swal from 'sweetalert';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToWishlist } = useWishlist();

 
const handleAddToWishlist = () => {
  const added = addToWishlist(product);
  if (added) {
    swal("Added to Wishlist", `"${product.heading}" has been added to your wishlist.`, "success");
  } else {
    swal("Already in Wishlist", `"${product.heading}" is already in your wishlist.`, "info");
  }
};

  useEffect(() => {
    fetch(`http://localhost:8080/api/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) return <p>Loading product...</p>;

  return (
    <div className="product-detail-container">
      <div className="product-image-section">
        <img src={product.imgurl} alt={product.heading} className="product-image" />
      </div>

      <div className="product-info-section">
        <h2 className="product-title">{product.heading}</h2>
        <p className="product-subheading">{product.subheading}</p>

        <div className="product-meta">
          <p><strong>Brand:</strong> {product.brand}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Type:</strong> {product.type}</p>
        </div>

        <div className="product-price-section">
          <p className="price"><strong>Price:</strong> ₹{product.price}</p>
          <p className="discount"><strong>Discount:</strong> {product.discount}% OFF</p>
        </div>

        <div className="product-actions">
          <button className="add-to-cart-btn">Add to Cart</button>
           <button className="wishlist-btn" onClick={handleAddToWishlist}>
      Add to Wishlist 
    </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
