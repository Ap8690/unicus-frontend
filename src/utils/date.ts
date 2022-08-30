import moment from 'moment'

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export const getDate = (newDate:any) => {
  return (
      new Date(newDate).getDate() +
      " " +
      monthNames[new Date(newDate).getMonth()]
  );
};
export const getDay = (newDate:any) => {
  return (new Date(newDate)).getDate();
};
export const getMonth = (newDate:any) => {
  return (new Date(newDate)).getMonth();
};
export const getYear = (newDate:any) => {
  return (new Date(newDate)).getFullYear();
};

export const getCompleteDate = (newDate: any) => {
  return moment(new Date(newDate.substr(0, 16))).format('llll');
};