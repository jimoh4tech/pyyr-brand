import moment from "moment";

export const getDaysBetweenDates = (
  startDate: string,
  endDate: string
): number => {
  // Parse the dates using moment
  const start = moment(startDate);
  const end = moment(endDate);

  // Calculate the difference in days
  const differenceInDays = end.diff(start, "days");

  return differenceInDays;
};
