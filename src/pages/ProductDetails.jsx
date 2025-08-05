// src/ProductDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) return <p>Loading product...</p>;

  return (
    <div className="product-detail">
      <img src={product.imgurl} alt={product.heading} />
      <h2>{product.heading}</h2>
      <p>{product.subheading}</p>
      <p><strong>Brand:</strong> {product.brand}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Type:</strong> {product.type}</p>
      <p><strong>Price:</strong> ₹{product.price}</p>
      <p><strong>Discount:</strong> {product.discount}%</p>
    </div>
  );
}

export default ProductDetail;
