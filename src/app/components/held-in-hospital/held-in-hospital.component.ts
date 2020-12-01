import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CovidStats } from 'src/app/modals/covid-stats';
import { ApiService } from 'src/app/services/api.service';
import { API_DATE_FORMAT } from 'src/app/utils/globals';
import { sortCovidStatsByDate } from 'src/app/utils/sort-by-date';
import Chart from 'chart.js';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-held-in-hospital',
  templateUrl: './held-in-hospital.component.html',
  styleUrls: ['./held-in-hospital.component.scss'],
})
export class HeldInHospitalComponent implements OnInit, AfterViewInit {
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

      for (const item of data) {
        console.log(item.date, item.inHospital);
      }
      this.createChart(barLabels, barData);
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
      const inHospital = parseInt(item.inHospital as string) || 0;
      barData.push(inHospital);
    }
    return barData;
  }

  private createChart(labels, data: string[] | number[]) {
    setTimeout(() => {
      this.chart = null;
      this.ctx.nativeElement.height = 300;
      this.chart = new Chart(this.ctx.nativeElement, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'In hospital',
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
            text: 'Total in hosptal over time',
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
