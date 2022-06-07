const getDays = (delta) => {
  return Math.floor(delta / 86400);
};

const getHours = (delta) => {
  return Math.floor(delta / 3600) % 24;
};

const getMinutes = (delta) => {
  return Math.floor(delta / 60) % 60;
};
const getTime = (time1, time2) => {
  // Take UTC Time and return the days, hours and minutes
  const delta = Math.abs(time1 - time2) / 1000;
  return {
    days: getDays(delta),
    hours: getHours(delta),
    minutes: getMinutes(delta),
  };
};

export default getTime;
