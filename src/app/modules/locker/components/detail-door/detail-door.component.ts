import { ChangeDetectionStrategy, Component, effect, EventEmitter, input, Output } from '@angular/core';
import { IDoor, colorDoor, ILockerProps, initialStateSelected, SelectedProp } from '../../locker.types';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'detail-door',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './detail-door.component.html',
  styleUrl: './detail-door.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailDoorComponent {

  locker = input.required<ILockerProps>()
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
