import React, { useState } from 'react';
import './ProductList.css';
import { useNavigate } from 'react-router-dom';

const ProductList = ({ products, onDelete, onAddToOrders }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [name, setName] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const navigate = useNavigate();

  const handleAddToOrders = () => {
    if (name.trim() === '' || selectedDate.trim() === '') {
      alert('Please enter your name and select a date.');
      return;
    }
    onAddToOrders({ customerName: name, date: selectedDate });
    setShowDialog(false);
    setName('');
    setSelectedDate('');
    navigate('/orders');
  };

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      onDelete(productId);
    }
  };

  const handleEdit = (product) => {
    localStorage.setItem('editProduct', JSON.stringify(product));
    navigate('/add-products')
  }

  return (
    <div className='product-list'>
      <h2>Products List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td>
                <button onClick={() => setShowDialog(true)}>Add</button>
                <button onClick={() => handleEdit(product)}>Edit</button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showDialog && (
        <div className="dialog">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <button onClick={handleAddToOrders}>Add to Orders</button>
          <button onClick={() => setShowDialog(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
