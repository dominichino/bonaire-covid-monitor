import { Component, Input } from '@angular/core';
import { NumberCard, numberCardDefault } from 'src/app/modals/number-card';

@Component({
  selector: 'app-number-card',
  templateUrl: './number-card.component.html',
  styleUrls: ['./number-card.component.scss'],
})
export class NumberCardComponent {
  @Input() item: NumberCard = numberCardDefault;

  get showDifference(): boolean {
    return (
      this.item &&
      typeof this.item.difference === 'number' &&
      this.item.difference !== 0
    );
  }

  get isNegative(): boolean {
    switch (this.item.id) {
      case 'active':
      case 'inHospital':
      case 'positive':
      case 'quarantined':
      case 'deaths':
        return (
          typeof this.item.difference === 'number' && this.item.difference > 0
        );
      case 'recovered':
      case 'negative':
      case 'totalTested':
        return (
          typeof this.item.difference === 'number' && this.item.difference < 0
        );

      default:
        return false;
    }
  }

  get isPositive(): boolean {
    switch (this.item.id) {
      case 'active':
      case 'positive':
      case 'inHospital':
      case 'quarantined':
      case 'deaths':
        return (
          typeof this.item.difference === 'number' && this.item.difference < 0
        );
      case 'recovered':
      case 'negative':
      case 'totalTested':
        return (
          typeof this.item.difference === 'number' && this.item.difference > 0
        );

      default:
        return false;
    }
  }
}
