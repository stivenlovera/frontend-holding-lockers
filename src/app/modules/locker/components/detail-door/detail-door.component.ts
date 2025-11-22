import { ChangeDetectionStrategy, Component, effect, EventEmitter, input, Output } from '@angular/core';
import { IDoor, colorDoor, ILockerProps, initialStateSelected, SelectedProp } from '../../locker.types';
import { MatIcon } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'detail-door',
  standalone: true,
  imports: [
    MatIcon,
    MatButtonModule
  ],
  templateUrl: './detail-door.component.html',
  styleUrl: './detail-door.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailDoorComponent {

  locker = input.required<ILockerProps>()
  selected = input.required<SelectedProp>()
  ColorAvailable = colorDoor.available
  ColorNoAvailable = colorDoor.notAvailable

  @Output() onOpen = new EventEmitter<IDoor>();

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

  handlerClick(door: IDoor) {
    this.onOpen.emit(door);
  }
}
