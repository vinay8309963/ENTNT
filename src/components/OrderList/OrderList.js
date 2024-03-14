import React, { useState } from 'react';
import './OrderList.css';

const OrderList = ({ orders, onConfirm, onCancel, onDeleteSelectedOrders }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedOrders, setSelectedOrders] = useState([]);

  const handleChange = (e) => {
    const selectedDate = e.target.value;
    setSelectedDate(selectedDate);
  };

  const handleConfirm = (orderId) => {
    onConfirm(orderId, 'Success');
  };

  const handleCancel = (orderId) => {
    onCancel(orderId, 'Failed');
  };

  const generateRandomDeliveryDate = (dateString) => {
    const today = new Date(dateString); 
    const randomDays = Math.floor(Math.random() * 7); 
    const deliveryDate = new Date(today.getTime() + randomDays * 24 * 60 * 60 * 1000); // Add random days to today
    return deliveryDate.toDateString();
  };

  const toggleOrderSelection = (orderId) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter(id => id !== orderId));
    } else {
      setSelectedOrders([...selectedOrders, orderId]);
    }
  };

  const handleDeleteSelectedOrders = () => {
    const updatedOrders = orders.filter(order => !selectedOrders.includes(order.id));
    setSelectedOrders([]);
    onDeleteSelectedOrders(updatedOrders);
  };

  const filteredOrders = orders.filter((order) => {
    if (!selectedDate) {
      return true; 
    }

    const orderDate = new Date(order.date).toISOString().slice(0, 10);
    return (
      orderDate === selectedDate
    );
  });

  return (
    <div className='order-list'>
      <h2>List of Orders</h2>
      <input type="date" value={selectedDate} onChange={handleChange} />
      <h2>Orders</h2>
      <button className='delete-selected' onClick={handleDeleteSelectedOrders}>Delete Selected Orders</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Status</th>
            <th>Delivery Date</th>
            <th>Actions</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customerName}</td>
              <td>{order.date}</td>
              <td>{order.status}</td>
              <td>{generateRandomDeliveryDate(order.date)}</td>
              <td>
                {(order.status !== 'Success' && order.status !== 'Failed') && (
                  <>
                    <button onClick={() => handleConfirm(order.id)}>Confirm</button>
                    <button onClick={() => handleCancel(order.id)}>Remove</button>
                  </>
                )}
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={selectedOrders.includes(order.id)}
                  onChange={() => toggleOrderSelection(order.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
