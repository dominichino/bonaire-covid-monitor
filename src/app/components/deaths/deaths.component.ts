import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import Chart from 'chart.js';
import { BehaviorSubject } from 'rxjs';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { filter, map } from 'rxjs/operators';
import { CovidStats, covidStatsDefault } from 'src/app/modals/covid-stats';
import { ApiService } from 'src/app/services/api.service';
import {
  API_DATE_FORMAT,
  API_LAST_UPDATED_DATE_FORMAT,
} from 'src/app/utils/globals';
import { sortCovidStatsByDate } from 'src/app/utils/sort-by-date';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-deaths',
  templateUrl: './deaths.component.html',
  styleUrls: ['./deaths.component.scss'],
})
export class DeathsComponent implements OnInit, AfterViewInit {
  @ViewChild('chart') private ctx: ElementRef<HTMLCanvasElement>;

  allCovidStats = new BehaviorSubject<CovidStats[]>([]);

  private chart: Chart;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getAll().subscribe((data: CovidStats[]) => {
      this.allCovidStats.next(data);
    });
  }

  ngAfterViewInit(): void {
    // total cases
    this.allCovidStats.subscribe((data) => {
      data = sortCovidStatsByDate(data, API_DATE_FORMAT, 'date', 'ascending');
      const barLabels = this.getBarLabels(data);
      const barData = this.getBarTotals(data);
      this.createChartTotal(barLabels, barData);
    });
  }

  private getBarLabels(data: CovidStats[]): string[] {
    const barLabels = [];
    for (const item of data) {
      barLabels.push(dayjs(item.date, API_DATE_FORMAT).format('DD-MM-YYYY'));
    }
    return barLabels;
  }

  private getBarTotals(data: CovidStats[]): string[] | number[] {
    const barData = [];
    for (const item of data) {
      const deaths = parseInt(item.deaths as string) || 0;
      barData.push(deaths);
    }
    return barData;
  }

  private createChartTotal(labels, data: string[] | number[]) {
    setTimeout(() => {
      this.chart = null;
      this.ctx.nativeElement.height = 300;
      this.chart = new Chart(this.ctx.nativeElement, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Total cases',
              data: data,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          title: {
            display: true,
            text: 'Total cases over time',
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
        },
      });
    }, 0);
  }
}
