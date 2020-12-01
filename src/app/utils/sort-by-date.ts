import * as dayjs from 'dayjs';
import { CovidStats } from '../modals/covid-stats';

export function sortCovidStatsByDate(
  array: CovidStats[],
  dateFormat: string,
  dateKey: string,
  order: 'ascending' | 'descending' = 'descending'
) {
  const newArray = array.slice().sort((a, b) => {
    const aDate = dayjs(a[dateKey], dateFormat).toDate();
    const bDate = dayjs(b[dateKey], dateFormat).toDate();

    if (order === 'ascending') {
      return aDate.valueOf() - bDate.valueOf();
    }

    return bDate.valueOf() - aDate.valueOf();
  });

  return newArray;
}
