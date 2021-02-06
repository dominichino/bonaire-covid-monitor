import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CovidStats } from 'src/app/modals/covid-stats';
import { ApiService } from 'src/app/services/api.service';
import { API_DATE_FORMAT } from 'src/app/utils/globals';
import { sortCovidStatsByDate } from 'src/app/utils/sort-by-date';
import * as dayjs from 'dayjs';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { isPlatformBrowser } from '@angular/common';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'new-positive-cases',
  templateUrl: './new-positive-cases.component.html',
})
export class NewPositiveCasesComponent implements OnInit, AfterViewInit {
  private allCovidStats = new BehaviorSubject<CovidStats[]>([]);

  public barChartOptions: ChartOptions = {
    title: {
      display: true,
      text: 'Daily new positive cases',
      fontSize: 24,
      fontFamily: 'Roboto, "Helvetica Neue", sans-serif',
      fontStyle: 'normal',
      fontColor: '#000',
      lineHeight: 1.6,
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            autoSkip: true,
            maxTicksLimit: 15,
          },
        },
      ],
    },
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'line';
  public barChartLegend = false;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [];

  constructor(
    private api: ApiService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.api
      .getAll()
      .pipe(
        map((data) => {
          let seen = new Set();
          const newData = data.filter((item) => {
            const aWeekAgo = dayjs().subtract(14, 'day');
            return dayjs(item.date).isAfter(aWeekAgo)
              ? seen.add(item.date)
              : false;
          });
          return newData;
        })
      )
      .subscribe((data: CovidStats[]) => {
        this.allCovidStats.next(data);
      });
  }

  ngAfterViewInit(): void {
    // total cases
    this.allCovidStats.subscribe((data) => {
      data = sortCovidStatsByDate(data, API_DATE_FORMAT, 'date', 'ascending');
      this.barChartLabels = this.getBarLabels(data);
      this.barChartData = [this.getBarNewPositiveCases(data)];
    });
  }

  get isBrowser() {
    return isPlatformBrowser(this.platformId);
  }

  private getBarLabels(data: CovidStats[]): string[] {
    const barLabels = [];
    for (const item of data) {
      barLabels.push(dayjs(item.date, API_DATE_FORMAT).format('DD-MM-YYYY'));
    }
    return barLabels;
  }

  private getBarNewPositiveCases(data: CovidStats[]): ChartDataSets {
    const barData = [];
    let previousPositiveCases = 0;

    for (const item of data) {
      const positiveCases = parseInt(item.positive as string) || 0;
      if (barData.length == 0) {
        // unknown previous date
        barData.push(0);
      } else {
        barData.push(positiveCases - previousPositiveCases);
      }
      previousPositiveCases = positiveCases;
    }
    return {
      data: barData,
      label: 'New positive cases',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    };
  }
}
