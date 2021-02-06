import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { filter } from 'rxjs/internal/operators/filter';
import { map } from 'rxjs/internal/operators/map';
import { CovidStats } from 'src/app/modals/covid-stats';
import { ApiService } from '../../../app/services/api.service';

@Component({
  selector: 'app-totals',
  templateUrl: './totals.component.html',
  styleUrls: ['./totals.component.scss'],
})
export class TotalsComponent implements OnInit {
  current = new BehaviorSubject<CovidStats>(null);
  percentPositive;
  percentNegative;
  percentRecovered;
  percentDeaths;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getCurrent();
    this.calculate();
  }

  getCurrent() {
    this.api
      .getCurrent()
      .pipe(
        map((stats) => {
          return stats[0];
        })
      )
      .subscribe((data) => {
        this.current.next(data);
      });
  }

  calculate() {
    this.current.pipe(filter((data) => data !== null)).subscribe((data) => {
      this.percentPositive = (
        (+data.positive / +data.totalTested) *
        100
      ).toFixed(2);
      this.percentNegative = (
        (+data.negative / +data.totalTested) *
        100
      ).toFixed(2);

      this.percentRecovered = (
        (+data.recovered / +data.positive) *
        100
      ).toFixed(2);

      this.percentDeaths = ((+data.deaths / +data.positive) * 100).toFixed(2);
    });
  }
}
