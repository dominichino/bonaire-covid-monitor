import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-number-card',
  templateUrl: './number-card.component.html',
  styleUrls: ['./number-card.component.scss'],
})
export class NumberCardComponent implements OnInit {
  @Input() item: any;

  get showDifference(): boolean {
    return (
      this.item &&
      typeof this.item.difference === 'number' &&
      this.item.difference !== 0
    );
  }

  constructor() {}

  ngOnInit(): void {}

  isNegative(value: number): boolean {
    return value < 0;
  }

  isPositive(value: number): boolean {
    return value > 0;
  }
}
