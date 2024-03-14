import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import ProductList from './components/ProductList/ProductList';
import ProductForm from './components/ProductForm/ProductForm';
import OrderList from './components/OrderList/OrderList';

const initialProducts = [
  { id: 1, name: 'Product A', category: 'Electronics', price: 1000, stock: 50 },
  { id: 2, name: 'Product B', category: 'Electronics', price: 10, stock: 20 },
  { id: 3, name: 'Product C', category: 'Electronics', price: 200, stock: 5 },
  { id: 4, name: 'Product D', category: 'Electronics', price: 100, stock: 10 },
  { id: 5, name: 'Product E', category: 'Electronics', price: 30, stock: 450 },
  { id: 6, name: 'Product F', category: 'Electronics', price: 230, stock: 60 },
  { id: 7, name: 'Product G', category: 'Electronics', price: 1030, stock: 30 },
  { id: 8, name: 'Product H', category: 'Electronics', price: 50, stock: 230 },
];

const initialOrders = [
  { id: 1, customerName: 'John Doe', date: '2024-03-10', status: 'Pending' },
  { id: 2, customerName: 'Vinay Prasad', date: '2024-03-20', status: 'Pending' },
  { id: 3, customerName: 'Yashwanth', date: '2023-06-10', status: 'Success' },
  { id: 4, customerName: 'Saketh', date: '2021-01-10', status: 'Pending' },
  { id: 5, customerName: 'Akhil', date: '2024-02-10', status: 'Pending' },
  { id: 6, customerName: 'Bilvesh', date: '2024-03-4', status: 'Failed' },
  { id: 7, customerName: 'Praveen', date: '2024-03-4', status: 'Pending' },
  { id: 8, customerName: 'Surender', date: '2024-03-5', status: 'Pending' },
  { id: 9, customerName: 'Sathya', date: '2024-03-5', status: 'Pending' },
];

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState(initialOrders);

  const onDeleteSelectedOrders = (updatedOrders) => {
    setOrders(updatedOrders);
  };

  const handleAddProduct = (newProduct) => {
    const id = Math.max(...products.map(product => product.id), 0) + 1;
    const updatedProducts = [...products, { ...newProduct, id }];
    setProducts(updatedProducts);
  };

  const handleDeleteProduct = (productId) => {
    const updatedProducts = products.filter(product => product.id !== productId);
    setProducts(updatedProducts);
  };

  const handleAddProductToOrders = (newOrder) => {
    const id = Math.max(...orders.map(order => order.id),0)+1;
    const status = 'Pending';
    const updatedOrders = [...orders, {...newOrder, id, status}];
    console.log(updatedOrders);
    setOrders(updatedOrders);
  }

  const handleConfirmOrder = (orderId, status) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status: status } : order
    );
    setOrders(updatedOrders);
  };
  
  const handleCancelOrder = (orderId, status) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status: status } : order
    );
    setOrders(updatedOrders);
  };

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Dashboard products={products} orders={orders} />} />
          <Route path="/products">
            <Route 
              index element={<ProductList products={products} 
              onAddToOrders={handleAddProductToOrders} 
              onDelete={handleDeleteProduct}  />} />
          </Route>
          <Route path="/orders" 
            element={<OrderList 
            orders={orders} 
            onConfirm={handleConfirmOrder} 
            onCancel={handleCancelOrder} 
            onDeleteSelectedOrders={onDeleteSelectedOrders}
            />} />
          <Route path="/add-products" 
            element={<ProductForm onSubmit={handleAddProduct} 
          />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
