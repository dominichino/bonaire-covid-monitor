import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-number-card',
  templateUrl: './number-card.component.html',
  styleUrls: ['./number-card.component.scss']
})
export class NumberCardComponent implements OnInit {

  private _item: any;
  @Input() set item(value: any) {
    this._item = value;
    this.cd.detectChanges()
  }
  get item() {
    return this._item;
  }

  get showDifference(): boolean {
    return this.item && typeof this.item.difference === 'number' && this.item.difference !== 0;
  }

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  isNegative(value: number): boolean {
    return value < 0
  }

  isPositive(value: number): boolean {
    return value > 0
  }
}
