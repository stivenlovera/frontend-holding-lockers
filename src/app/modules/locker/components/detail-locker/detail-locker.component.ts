import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { colorDoor, ILockerProps } from '../../locker.types';

@Component({
  selector: 'detail-locker',
  standalone: true,
  imports: [],
  templateUrl: './detail-locker.component.html',
  styleUrl: './detail-locker.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailLockerComponent {

  ColorAvailable = colorDoor.available
  ColorNoAvailable = colorDoor.notAvailable

  locker = input.required<ILockerProps>()
}
