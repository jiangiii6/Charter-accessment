import data from "./services/data.json";

const fetchRecord = () =>
  new Promise((res, rej) => {
    setTimeout(() => {
      res(data);
    }, 2000);
  });

export default fetchRecord;
