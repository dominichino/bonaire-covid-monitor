import { Component, Input, OnInit } from '@angular/core';
import { CovidStats, getCovidStatDisplayName } from '../../modals/covid-stats';
import { NumberCard } from '../../modals/number-card';

@Component({
  selector: 'app-number-cards',
  templateUrl: './number-cards.component.html',
  styleUrls: ['./number-cards.component.scss'],
})
export class NumberCardsComponent implements OnInit {
  @Input() current!: CovidStats;
  @Input() previous!: CovidStats;

  private items: NumberCard[] = [];

  constructor() {}

  ngOnInit(): void {
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
        title: getCovidStatDisplayName(key).toUpperCase(),
        count: count,
        difference: difference,
      });
    }
  }
}
