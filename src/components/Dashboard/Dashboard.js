import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css'; 

const Dashboard = ({ products, orders }) => {
  const totalProducts = products.length;
  const totalOrders = orders.length;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">ERP Dashboard</h1>
        <p>Welcome to your ERP system!</p>
      </div>
      <div className="metrics">
        <div className="metric">
          <h2>Total Products</h2>
          <p>{totalProducts}</p>
        </div>
        <div className="metric">
          <h2>Total Orders</h2>
          <p>{totalOrders}</p>
        </div>
      </div>
      <div className="navigation">
        <Link to="/products" className="nav-link">
          <i className="fas fa-cubes"></i> Manage Products
        </Link>
        <Link to="/orders" className="nav-link">
          <i className="fas fa-clipboard-list"></i> Manage Orders
        </Link>
        <Link to="/add-products" className="nav-link">
          <i className="fas fa-plus-circle"></i> Add Product
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
