import { ChangeDetectionStrategy, Component, effect, EventEmitter, input, Output } from '@angular/core';
import { colorDoor, ILocker, SelectedProp, sizeDoor } from '../../locker.types';
import { MatTooltip, MatTooltipModule } from "@angular/material/tooltip";

@Component({
  selector: 'diagram-locker',
  standalone: true,
  imports: [
    MatTooltipModule
  ],
  templateUrl: './diagram-locker.component.html',
  styleUrl: './diagram-locker.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiagramLockerComponent {

  locker = input.required<ILocker>()
  @Output() onSelected = new EventEmitter<SelectedProp>();
  constructor() {
    effect(() => {
      console.log(this.locker())
    })
  }

  getSize(door_size_id: number): string {
    if (door_size_id === 1) {
      return sizeDoor.small.toString()
    }
    if (door_size_id === 2) {
      return sizeDoor.medium.toString()
    }
    if (door_size_id === 3) {
      return sizeDoor.large.toString()
    }
    return sizeDoor.small.toString()
  }

  handlerSelected(index: number) {
    this.locker().doors.map((door, i) => {
      if (i !== index) {
        door.selected = false
      }
    })
    this.locker().doors[index].selected = !this.locker().doors[index].selected;
    this.onSelected.emit({
      index: index,
      selected: this.locker().doors[index].selected
    })
  }

  getColor(state: number) {
    if (state === 1) {
      return colorDoor.available
    }
    if (state === 0) {
      return colorDoor.notAvailable
    }
    return colorDoor.notAvailable
  }
}
