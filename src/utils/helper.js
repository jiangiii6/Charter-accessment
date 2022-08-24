// A customer receives 2 points for every dollar spent over $100 in each transaction, plus 1 point
// for every dollar spent over $50 in each transaction
// (e.g. a $120 purchase = 2x$20 + 1x$50 = 90 points).
// Given a record of every transaction during a three month period, calculate the reward points
// earned for each customer per month and total.
// 1. Use React JS (do not use TypeScript)
// 2. Simulate an asynchronous API call to fetch data
// 3. Make up a data set to best demonstrate your solution
// 4. Check solution into GitHub

// calculate the reward points
const calculateReward = (amount) => {
  if (amount < 50) {
    return 0;
  } else if (amount > 50 && amount < 100) {
    return amount - 50;
  } else {
    return 50 + 2 * (amount - 100);
  }
};

const getMonthlyandTotalRewards = (ordersWithRewards) => {
  let year, month;
  let monthlyData = [];
  let customerIDs = [],
    customerData = [];

  const monthObj = {},
    monthArr = [];

  ordersWithRewards.forEach((order) => {
    let itemDate = new Date(order.date);
    year = itemDate.getFullYear();
    month = itemDate.getMonth() + 1;
    let dateName = year + "-" + month;

    // categorize transactions by month
    if (!monthObj[dateName]) {
      monthObj[dateName] = true;
      monthArr.push(dateName);
      monthlyData.push({
        date: dateName, 
        ids: [], //all consumers with order records in the same month
        orders: [],
      });
    }

    // handle the three-months table
    // find all consumerIds by month,
    // put their corresponding transaction into the monthlyData array
    // structure: { date: "2022-9", ids: ["601","602","603"], orders: [[[{orderId: "3", 
    // customerId: "601", customerName: "Alice", date: "2022-09", ...},],],...]}
    let index1 = monthArr.indexOf(dateName);
    if (index1 !== -1) {
      let monthItem = monthlyData[index1];
      let index2 = monthItem.ids.indexOf(order.customerId);
      if (index2 === -1) {
        monthItem.ids.push(order.customerId);
        let index3 = monthItem.ids.indexOf(order.customerId);
        monthItem.orders[index3] = [order];
      } else {
        let tempMonthly = monthItem.orders[index2];
        tempMonthly.push(order);
        monthItem.orders[index2] = tempMonthly;
      }
    }

    // handle the total table
    // find all consumer ids, 
    // put the id, name, amount and reward of each consumer 
    // into the customerData array,
    // update the total amount and total rewards of each consumer through calculation
    // structure: {customerId: '601', customerName: 'Alice', totalAmount: 742, totalReward: 904}
    let i = customerIDs.indexOf(order.customerId);
    if (i === -1) {
      customerIDs.push(order.customerId);
      customerData.push({
        customerId: order.customerId,
        customerName: order.customerName,
        totalAmount: order.amount,
        totalReward: order.reward,
      });
      
    } else {
      // calculate total amount and total reward points for each customer
      let tempTotal = customerData[i];
      tempTotal.totalReward += order.reward;
      tempTotal.totalAmount += order.amount;
      customerData[i] = tempTotal;
    }
  });

  let result = {
    monthlyData: monthlyData, 
    totalData: {
      allCustomers: customerIDs,
      totalRewards: customerData,
    },
  };
  return result;
};

// add the reward property to every transaction 
const parseDataRewardPoints = (orderData) => {
  let dataWithReward = orderData.map((order) => {
    order.reward = calculateReward(order.amount);
    return order;
  });
  return dataWithReward;
};

export { calculateReward, getMonthlyandTotalRewards, parseDataRewardPoints };
