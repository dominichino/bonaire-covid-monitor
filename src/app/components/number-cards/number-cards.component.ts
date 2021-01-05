import { Component, Input, OnChanges } from '@angular/core';
import {
  CovidStats,
  covidStatsDefault,
  getCovidStatDisplayName,
} from '../../modals/covid-stats';
import * as dayjs from 'dayjs';
import { NumberCard } from '../../modals/number-card';
import { API_DATE_FORMAT, DISPLAY_DATE_FORMAT } from '../../utils/globals';

@Component({
  selector: 'app-number-cards',
  templateUrl: './number-cards.component.html',
  styleUrls: ['./number-cards.component.scss'],
})
export class NumberCardsComponent implements OnChanges {
  @Input() current: CovidStats = covidStatsDefault;
  @Input() previous: CovidStats = covidStatsDefault;

  items: NumberCard[] = [];

  constructor() {}

  ngOnChanges(): void {
    if (this.current) {
      this.current.date = dayjs(this.current.date, API_DATE_FORMAT).format(DISPLAY_DATE_FORMAT)
      this.items = [];

      for (const [key, value] of Object.entries(this.current)) {
        // not including these keys for display
        if (['lastUpdated', 'date'].includes(key)) {
          continue;
        }

        let previousValue;
        if (this.previous.hasOwnProperty(key)) {
          previousValue = this.previous[key];
        }

        let count: string | number = '-';
        let difference: string | number = '-';

        if (typeof value === 'string' || typeof value === 'number') {
          count = parseInt(value as string);
          if (
            typeof previousValue === 'string' ||
            typeof previousValue === 'number'
          ) {
            difference =
              parseInt(value as string) - parseInt(previousValue as string);
          }
        }

        this.items.push({
          id: key,
          title: getCovidStatDisplayName(key).toUpperCase(),
          count: count,
          difference: difference,
        });
      }
    }
  }
}
