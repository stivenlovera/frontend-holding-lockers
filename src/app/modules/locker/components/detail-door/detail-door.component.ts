import { ChangeDetectionStrategy, Component, effect, input, output } from '@angular/core';
import { IDoor, colorDoor, ILocker, initialStateSelected, SelectedProp } from '../../locker.types';

@Component({
  selector: 'detail-door',
  standalone: true,
  imports: [],
  templateUrl: './detail-door.component.html',
  styleUrl: './detail-door.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailDoorComponent {

  locker = input.required<ILocker>()
  selected = input.required<SelectedProp>()

  ColorAvailable = colorDoor.available
  ColorNoAvailable = colorDoor.notAvailable
  constructor() {
    effect(() => {
      console.log(this.selected())
    })
  }
  getStatus(state: number): string {
    if (state === 1) {
      return 'Libre '
    } else {
      return 'Ocupado'
    }
  }
}
