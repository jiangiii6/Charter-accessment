import { useEffect, useState } from "react";
import { getMonthlyandTotalRewards, parseDataRewardPoints } from "../utils/helper";
import fetchRecord from "../server";
import OrderHistory from "./OrderHistory";
import MonthlyRewards from "./MonthlyRewards";
import TotalRewards from "./TotalRewards";
import "./RewardPoints.css";

const RewardPoints = () => {
  const [orders, setOrders] = useState([]);
  const [monthlyRewards, setRewards] = useState([]);
  const [total, setTotal] = useState([]);

  useEffect(() => {
    fetchRecord().then((orderData) => {
      const temp = parseDataRewardPoints(orderData);
      let result = getMonthlyandTotalRewards(temp);

      setOrders(orderData);
      setRewards(result.monthlyData);
      setTotal(result.totalData.totalRewards);
    });
  }, []);

  return (
    <div className="container">
      <OrderHistory orders={orders} />
      <MonthlyRewards monthlyRewards={monthlyRewards} />
      <TotalRewards total={total} />
    </div>
  );
};

export default RewardPoints;
