import * as dayjs from 'dayjs';
import { CovidStats } from '../modals/covid-stats';

export function sortCovidStatsByDate(array: CovidStats[], dateFormat: string) {
  const newArray = array.slice().sort((a, b) => {
    a.date = dayjs(a.date, dateFormat).toDate();
    b.date = dayjs(b.date, dateFormat).toDate();

    return b.date.valueOf() - a.date.valueOf();
  });

  return newArray;
}
