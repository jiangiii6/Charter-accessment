import { render } from "@testing-library/react";
import OrderHistory from "./OrderHistory";
import MonthlyRewards from "./MonthlyRewards";
import TotalRewards from "./TotalRewards";
import { calculateReward, getMonthlyandTotalRewards } from "../utils/helper";

describe("Test calculateReward Method", () => {
  let orderData = [
    {
      orderId: "101",
      customerId: "601",
      customerName: "Alice",
      date: "2022-06-22",
      purchase: 200,
    },
    {
      orderId: "102",
      customerId: "601",
      customerName: "Alice",
      date: "2022-07-30",
      purchase: 196,
    },
    {
      orderId: "103",
      customerId: "601",
      customerName: "Alice",
      date: "2022-08-10",
      purchase: 266,
    },
    {
      orderId: "104",
      customerId: "601",
      customerName: "Alice",
      date: "2022-08-16",
      purchase: 80,
    },
    {
      orderId: "105",
      customerId: "602",
      customerName: "Ben",
      date: "2022-06-14",
      purchase: 120,
    },
    {
      orderId: "106",
      customerId: "602",
      customerName: "Ben",
      date: "2022-06-20",
      purchase: 163,
    },
    {
      orderId: "107",
      customerId: "602",
      customerName: "Ben",
      date: "2022-06-26",
      purchase: 60,
    },
    {
      orderId: "108",
      customerId: "602",
      customerName: "Ben",
      date: "2022-07-12",
      purchase: 196,
    },
    {
      orderId: "109",
      customerId: "602",
      customerName: "Ben",
      date: "2022-07-22",
      purchase: 130,
    },
    {
      orderId: "110",
      customerId: "602",
      customerName: "Ben",
      date: "2022-08-20",
      purchase: 266,
    },
    {
      orderId: "111",
      customerId: "603",
      customerName: "Crystal",
      date: "2022-06-24",
      purchase: 150,
    },
    {
      orderId: "112",
      customerId: "603",
      customerName: "Crystal",
      date: "2022-07-12",
      purchase: 26,
    },
    {
      orderId: "113",
      customerId: "603",
      customerName: "Crystal",
      date: "2022-07-29",
      purchase: 99,
    },
    {
      orderId: "114",
      customerId: "603",
      customerName: "Crystal",
      date: "2022-08-19",
      purchase: 110,
    },
    {
      orderId: "115",
      customerId: "603",
      customerName: "Crystal",
      date: "2022-08-22",
      purchase: 186,
    },
    {
      orderId: "116",
      customerId: "603",
      customerName: "Crystal",
      date: "2022-08-29",
      purchase: 210,
    },
  ];

  it("Test calculateReward Method", () => {
    // Get the order list and calculate reward of each order
    let temp = orderData.map((order) => {
      order.reward = calculateReward(order.amount);
      return order;
    });
    expect(temp.length).toBe(16);
    expect(temp[0].reward).not.toBe(undefined);
  });

  it("Test monthly reward data", () => {
    let temp = orderData.map((order) => {
      order.reward = calculateReward(order.amount);
      return order;
    });
    // calculate the reward points of each month,
    let result = getMonthlyandTotalRewards(temp);
    expect(result.monthlyData.length).toBe(3);
    expect(result.totalData).not.toBe(undefined);
  });
});

describe("Test the rendering elements", () => {
  it("Order table should be rendered", () => {
    const MockData = [
      {
        orderId: "120",
        customerId: "111",
        customerName: "Ben",
        date: "2022-06-22",
        amount: 200,
        reward: 250,
      },

      {
        orderId: "115",
        customerId: "603",
        customerName: "Ben",
        date: "2022-06-22",
        amount: 200,
        reward: 90,
      },
    ];
    const { getByText } = render(<OrderHistory orders={MockData} />);
    const result = getByText("90");
    expect(result).not.toBe(null);
  });

  it("Monthly table should be rendered", () => {
    const MockData = [
      {
        date: "2022-09",
        ids: ["601"],
        orders: [
          [
            [
              {
                orderId: "3",
                customerId: "601",
                customerName: "Alice",
                date: "2022-09",
                purchase: 200,
                reward: 250,
              },
            ],
          ],
          [],
          [],
        ],
      },
    ];

    const { findAllByText } = render(
      <MonthlyRewards monthlyRewards={MockData} />
    );
    const result1 = findAllByText("2022-09");
    const result2 = findAllByText("Customer ID: 601");
    expect(result1).not.toBe(null);
    expect(result2).not.toBe(null);
  });

  it("TotalRewards table should be rendered", () => {
    const MockData = [
      {
        orderId: "112",
        customerId: "333",
        customerName: "Ann",
        totalAmount: 742,
        totalReward: 904,
      },

      {
        orderId: "114",
        customerId: "603",
        customerName: "Ann",
        totalAmount: 700,
        totalReward: 1960,
      },
    ];

    const { findAllByText } = render(<TotalRewards total={MockData} />);
    const result1 = findAllByText("Ann");
    const result2 = findAllByText("1960");
    expect(result1).not.toBe(null);
    expect(result2).not.toBe(null);
  });
});
