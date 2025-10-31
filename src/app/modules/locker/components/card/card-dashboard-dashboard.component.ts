import { ChangeDetectionStrategy, Component, EventEmitter, Input, input, Output } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from 'app/core/user/user.service';
import { Subject, takeUntil } from 'rxjs';
import { initialStateAuth, IUser } from 'app/core/user/user.types';
import { validateAdmin } from 'app/utils/util';
import { Locker } from '../../locker.types';
@Component({
  selector: 'card-dashboard',
  standalone: true,
  imports: [
    MatIconModule,
    MatMenuModule,
    MatButtonModule
  ],
  templateUrl: './card-dashboard.component.html',
  styleUrl: './card-dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardDashBoardComponent {

  @Input() locker: Locker;
  @Output() onDelete = new EventEmitter<number>();
  @Output() onEdit = new EventEmitter<number>();
  @Output() onNavigate = new EventEmitter<number>();

  user: IUser = initialStateAuth;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _userService: UserService
  ) {
    this._userService.user$
      .pipe((takeUntil(this._unsubscribeAll)))
      .subscribe((user: IUser) => {
        console.log(user)
        this.user = user;
      });
  }

  validateAdmin(): boolean {
    return validateAdmin(this.user.rol);
  }

  handlerNavigate(locker_id: number) {
    this.onNavigate.emit(locker_id)
  }

  handlerDelete(locker_id: number) {
    this.onDelete.emit(locker_id)
  }

  handlerEdit(locker_id: number) {
    this.onEdit.emit(locker_id)
  }
}
