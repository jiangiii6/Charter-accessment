const MonthlyRewards = ({ monthlyRewards }) => {
  console.log(monthlyRewards)
  return (
    <>
      <h3>Rewards statistics for last 3 months</h3>
      {monthlyRewards.map((element) => {
        return (
          <div key={element.date}>
            <p className="monthly">{element.date}</p>
            {element.orders.map((customer, i) => (
              <div key={i}>
                <p>Customer ID: {element.ids[i]}</p>
                <table>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Reward Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customer.map((row, i) => (
                      <tr key={i} className="monthly__row">
                        <td>{row.orderId}</td>
                        <td>{row.date}</td>
                        <td>${row.amount}</td>
                        <td>{row.reward}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        );
      })}
    </>
  );
};

export default MonthlyRewards;
