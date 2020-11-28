import { Component, OnInit } from '@angular/core';
import { data } from '../../../assets/testdata';
import * as dayjs from "dayjs";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  readonly keys = [
    'active',
    'inHospital',
    'positive',
    'recovered',
    'totaltested',
    'negative',
    'quarantined',
    'deaths'
  ];
  private previous: any = data[3];
  private current: any = data[0];
  
  items: any[] = [];

  now = dayjs().format('DD MMMM YYYY');

  constructor() { }

  ngOnInit(): void {
    for (const key of this.keys) {
      let count: any = '-';
      let difference: any = '-';
      
      if (typeof this.current[key] === 'string' || typeof this.current[key] === 'number') {
        count = parseInt(this.current[key])
        if (typeof this.previous[key] === 'string' || typeof this.previous[key] === 'number') {
          difference = parseInt(this.current[key]) - parseInt(this.previous[key])
        }
      }

      const temp = {
        title: key.toUpperCase(),
        count: count,
        difference: difference
      }
      this.items.push(temp)
    }
  }

}
