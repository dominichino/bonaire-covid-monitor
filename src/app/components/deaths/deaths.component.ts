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

@Component({
  selector: 'app-deaths',
  templateUrl: './deaths.component.html',
  styleUrls: ['./deaths.component.scss'],
})
export class DeathsComponent implements OnInit, AfterViewInit {
  private allCovidStats = new BehaviorSubject<CovidStats[]>([]);

  public barChartOptions: ChartOptions = {
    title: {
      display: true,
      text: 'Total deaths over time',
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
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [];

  constructor(
    private api: ApiService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.api.getAll().subscribe((data: CovidStats[]) => {
      this.allCovidStats.next(data);
    });
  }

  ngAfterViewInit(): void {
    // total cases
    this.allCovidStats.subscribe((data) => {
      data = sortCovidStatsByDate(data, API_DATE_FORMAT, 'date', 'ascending');
      this.barChartLabels = this.getBarLabels(data);
      this.barChartData = [this.getBarTotals(data)];
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

  private getBarTotals(data: CovidStats[]): ChartDataSets {
    const barData = [];
    for (const item of data) {
      const deaths = parseInt(item.deaths as string) || 0;
      barData.push(deaths);
    }
    return {
      data: barData,
      label: 'Total deaths',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    };
  }
}
