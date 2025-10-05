import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { DiagramLockerComponent } from "../../components/diagram-locker/diagram-locker.component";
import { DetailDoorComponent } from "../../components/detail-door/detail-door.component";
import { colorDoor,  initializeStateResumelocker, initialStateSelected, inizializeStateLocker, inizializeStateStatusInfoProp, ResumelockerProp, SelectedProp, StatusInfoProp } from '../../locker.types';
import { LockerService } from '../../locker.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { take } from 'rxjs';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'status-locker',
  standalone: true,
  imports: [DiagramLockerComponent, RouterLink, DetailDoorComponent, MatIcon],
  templateUrl: './status-locker.component.html',
  styleUrl: './status-locker.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusLockerComponent implements OnInit {
  lockerId = parseInt(this._route.snapshot.paramMap.get('id')!);
  colorDoor = colorDoor
  statusInfo = signal<StatusInfoProp>(inizializeStateStatusInfoProp)
  selected = signal<SelectedProp>(initialStateSelected)
  resume = signal<ResumelockerProp>(initializeStateResumelocker)

  constructor(
    private _lockerService: LockerService,
    private _route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this._lockerService.getLockerStatus(this.lockerId).pipe(take(1)).subscribe(
      (res) => {
        this.statusInfo.set(res.data)
        this.getResumenLocker()
      }
    )
  }

  handlerSeleted(event: SelectedProp) {
    this.selected.set(event)
  }

  getResumenLocker() {
    const available = this.statusInfo().locker.doors.filter(door => door.state === 1).length
    const noAvailable = this.statusInfo().locker.doors.filter(door => door.state === 0).length
    const total = this.statusInfo().locker.doors.length
    this.resume.set({
      available: available,
      NoAvailable: noAvailable,
      total: total
    })
  }
}
