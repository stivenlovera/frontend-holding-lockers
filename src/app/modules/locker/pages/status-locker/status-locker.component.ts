import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { DiagramLockerComponent } from "../../components/diagram-locker/diagram-locker.component";
import { DetailLockerComponent } from "../../components/detail-locker/detail-locker.component";
import { ResumenLockerComponent } from "../../components/resumen-locker/resumen-locker.component";
import { DetailDoorComponent } from "../../components/detail-door/detail-door.component";
import { ILocker, initializeStateResumelocker, initialStateSelected, inizializeStateLocker, ResumelockerProp, SelectedProp } from '../../locker.types';
import { LockerService } from '../../locker.service';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'status-locker',
  standalone: true,
  imports: [DiagramLockerComponent, DetailLockerComponent, ResumenLockerComponent, DetailDoorComponent],
  templateUrl: './status-locker.component.html',
  styleUrl: './status-locker.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusLockerComponent implements OnInit {
  locker = signal<ILocker>(inizializeStateLocker)
  selected = signal<SelectedProp>(initialStateSelected)
  resume = signal<ResumelockerProp>(initializeStateResumelocker)
  lockerId: number | null = null;

  constructor(
    private _lockerService: LockerService,
    private _route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    console.log('init')
    this.lockerId = parseInt(this._route.snapshot.paramMap.get('id')!);
    this._lockerService.getLockerStatus(this.lockerId).pipe(take(1)).subscribe(
      (res) => {
        console.log(res.data)
        this.locker.set(res.data)
        this.getResumenLocker()
      }
    )
  }

  handlerSeleted(event: SelectedProp) {
    this.selected.set(event)
  }

  getResumenLocker() {
    const available = this.locker().doors.filter(door => door.state === 1).length
    const noAvailable = this.locker().doors.filter(door => door.state === 0).length
    const total = this.locker().doors.length
    this.resume.set({
      available: available,
      NoAvailable: noAvailable,
      total: total
    })
  }
}
