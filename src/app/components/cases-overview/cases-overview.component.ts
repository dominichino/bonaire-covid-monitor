import { Component, OnInit, ɵExtraLocaleDataIndex } from '@angular/core';
import {
  MatDatepicker,
  MatDatepickerInputEvent,
} from '@angular/material/datepicker';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import * as dayjs from 'dayjs';
import { ApiService } from '../../services/api.service';
import { sortCovidStatsByDate } from '../..//utils/sort-by-date';
import { API_DATE_FORMAT, API_REQUEST_DATE_FORMAT } from '../../utils/globals';
import { CovidStats, covidStatsDefaultLatest } from '../../modals/covid-stats';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-cases-overview',
  templateUrl: './cases-overview.component.html',
  styleUrls: ['./cases-overview.component.scss'],
})
export class CasesOverviewComponent implements OnInit {
  current = new BehaviorSubject<Partial<CovidStats>>(covidStatsDefaultLatest);
  previous = new BehaviorSubject<Partial<CovidStats>>(covidStatsDefaultLatest);

  minDate = dayjs().year(2020).startOf('year').toDate();
  maxDate = dayjs().endOf('day').toDate();
  date = new FormControl(this.maxDate);

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getNumbers(this.date.value);
  }

  // TODO: debounce
  dateChanged(event: MatDatepickerInputEvent<Date>) {
    if (typeof event.value === 'object') {
      this.date.setValue(event.value);
      this.getNumbers(event.value);
    }
  }

  nextDate() {
    const nextDate = dayjs(this.date.value).add(1, 'day');
    if (nextDate.isBefore(this.maxDate)) {
      this.date.setValue(nextDate.toDate());
      this.getNumbers(nextDate.toDate());
    }
  }

  previousDate(picker: MatDatepicker<Date>) {
    const previousDate = dayjs(this.date.value).subtract(1, 'day');
    if (previousDate.isAfter(this.minDate)) {
      this.date.setValue(previousDate.toDate());
      this.getNumbers(previousDate.toDate());
    }
  }

  private getNumbers(date: Date) {
    // const currentDate = dayjs(date).format(API_REQUEST_DATE_FORMAT);
    // const previousDate = dayjs(date)
    //   .subtract(1, 'day')
    //   .format(API_REQUEST_DATE_FORMAT);

    // this.api
    //   .getByDate(currentDate)
    //   .pipe(filter((data) => data.hasOwnProperty('date')))
    //   .subscribe((date1: CovidStats) => {
    //     this.api.getByDate(previousDate).subscribe((date2: CovidStats) => {
    //       const data = sortCovidStatsByDate(
    //         [date1, date2],
    //         API_DATE_FORMAT,
    //         'date'
    //       );
    //       this.current.next(data[0]);
    //       this.previous.next(data[1]);
    //     });
    //   });
    this.api
      .getCurrent()
      // .pipe(filter((data) => data.hasOwnProperty('date')))
      .pipe(
        map((data) => {
          const stats = [];
          for (const item of data) {
            let filtered = {
              active: item.active,
              quarantined: item.quarantined,
              inHospital: item.inHospital,
              deaths: item.deaths,
            };
            stats.push(filtered);
          }
          return stats;
        })
      )
      .subscribe((data: CovidStats[]) => {
        this.current.next(data[0]);
        this.previous.next(data[1]);
      });
  }
}
