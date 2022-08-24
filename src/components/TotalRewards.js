const MonthlyRewards = ({ total }) => {
  return (
    <>
      <h3>Total points for each customer</h3>
      <table>
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Customer Name</th>
            <th>Total Amount</th>
            <th>Reward Points</th>
          </tr>
        </thead>
        <tbody>
          {total.map((row) => {
            return (
              <tr key={row.customerId} className="customer__row">
                <td>{row.customerId}</td>
                <td>{row.customerName}</td>
                <td>{row.totalAmount}</td>
                <td>{row.totalReward}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default MonthlyRewards;
