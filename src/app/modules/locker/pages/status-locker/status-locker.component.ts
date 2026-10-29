import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnInit, signal } from '@angular/core';
import { DiagramLockerComponent } from "../../components/diagram-locker/diagram-locker.component";
import { DetailDoorComponent } from "../../components/detail-door/detail-door.component";
import { colorDoor, IDoor, initializeStateResumelocker, initialStateSelected, inizializeStateLocker, inizializeStateStatusInfoProp, ResumelockerProp, SelectedProp, StatusInfoProp } from '../../locker.types';
import { LockerService } from '../../locker.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { interval, take } from 'rxjs';
import { MatIcon } from "@angular/material/icon";
import { SnackBar } from 'app/utils/snack-bar';
import { Confirmation } from 'app/utils/confirmate';
import { MatDialog } from '@angular/material/dialog';
import { ModalOpenDoor } from '../../components/modal-open-door/modal-open-door';

@Component({
  selector: 'status-locker',
  standalone: true,
  imports: [DiagramLockerComponent, RouterLink, DetailDoorComponent, MatIcon],
  templateUrl: './status-locker.component.html',
  styleUrl: './status-locker.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [Confirmation, SnackBar]
})
export class StatusLockerComponent implements OnInit {

  lockerId = parseInt(this._route.snapshot.paramMap.get('id')!);
  colorDoor = colorDoor
  statusInfo = signal<StatusInfoProp>(inizializeStateStatusInfoProp)
  selected = signal<SelectedProp>(initialStateSelected)
  resume = signal<ResumelockerProp>(initializeStateResumelocker)

  constructor(
    private _lockerService: LockerService,
    private _route: ActivatedRoute,
    private _snackBar: SnackBar,
    private _dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.loadStatus()
    /* interval(5000).pipe().subscribe(
      (res) => {
        this._lockerService.getLockerStatus(this.lockerId).pipe(take(1)).subscribe(
          (res) => {
            this.statusInfo.set(res.data)
            this.getResumenLocker()
          }
        )
      }
    ) */
  }

  loadStatus() {
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

  handlerOpenDoor(door: IDoor) {
    // Toda apertura desde el panel pide tipo y motivo y queda registrada en door_event.
    this._dialog.open(ModalOpenDoor, { data: door, width: '560px' })
      .afterClosed().subscribe((abierto) => {
        if (abierto) {
          this.loadStatus()
        }
      })
  }
}
