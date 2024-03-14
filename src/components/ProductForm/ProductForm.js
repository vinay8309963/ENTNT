import React, { useState } from "react";
import "./ProductForm.css";
import { useNavigate } from "react-router-dom";

const ProductForm = ({ onSubmit }) => {
  const initialProductString = localStorage.getItem('editProduct');
  const initialProduct = JSON.parse(initialProductString);
  const navigate = useNavigate();

  const [name, setName] = useState(initialProduct ? initialProduct.name : '');
  const [category, setCategory] = useState(initialProduct ? initialProduct.category : '');
  const [price, setPrice] = useState(initialProduct ? initialProduct.price : 0);
  const [stock, setStock] = useState(initialProduct ? initialProduct.stock : 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, category, price, stock });
    setName("");
    setCategory("");
    setPrice(0);
    setStock(0);
    navigate('/');
  };

  const handleClearFields = () => {
    setName("");
    setCategory("");
    setPrice(0);
    setStock(0);
  };

  return (
    <div className="product-form">
      <h2>Add New Products</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <label>
          Stock:
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </label>
        <button type="submit">Add Product</button>
        <button type="button" onClick={handleClearFields}>Clear Fields</button>
      </form>
    </div>
  );
};

export default ProductForm;
