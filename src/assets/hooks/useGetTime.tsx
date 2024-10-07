import moment from "moment";
export const getDifTime = (dateStart: string) => {
  return moment(dateStart, "MMMM Do YYYY, h:mm:ss a").fromNow();
};

export const getCurrentDateTime = () => {
  return moment().format("MMMM Do YYYY, h:mm:ss a");
};
