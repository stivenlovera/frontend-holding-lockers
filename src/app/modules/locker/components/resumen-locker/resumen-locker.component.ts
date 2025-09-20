import { ChangeDetectionStrategy, Component, effect, input, OnInit, signal } from '@angular/core';
import { ILocker, initializeStateResumelocker, ResumelockerProp } from '../../locker.types';

@Component({
  selector: 'resumen-locker',
  standalone: true,
  imports: [],
  templateUrl: './resumen-locker.component.html',
  styleUrl: './resumen-locker.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumenLockerComponent implements OnInit {

  locker = input.required<ILocker>()
  resume = input.required<ResumelockerProp>()

  constructor() {
    effect(() => {
      console.log('resumen ',this.resume())
    })
  }

  ngOnInit(): void {

  }
}
