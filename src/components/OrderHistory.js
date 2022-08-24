const OrderHistory = ({ orders }) => {
  return (
    <>
      <h3>The order history</h3>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer ID</th>
            <th>Customer Name</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Reward Points</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index} className="order__row">
              <td>{order.orderId}</td>
              <td>{order.customerId}</td>
              <td>{order.customerName}</td>
              <td>{order.date}</td>
              <td>${order.amount}</td>
              <td>{order.reward}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default OrderHistory;
