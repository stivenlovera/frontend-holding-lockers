import { ChangeDetectionStrategy, Component, Input, input } from '@angular/core';
import { Locker } from '../../dashboard.types';
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from 'app/core/user/user.service';
import { Subject, takeUntil } from 'rxjs';
import { IUser } from 'app/core/user/user.types';
import { validateAdmin } from 'app/utils/util';
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

  //locker = input.required<Locker>()
  @Input() locker: Locker;
  user: IUser = {
    auth: {
      id: 0,
      name: '',
      email: '',
      email_verified_at: undefined,
      created_at: undefined,
      updated_at: undefined
    },
    rol: []
  };
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _router: Router,
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
    this._router.navigate([`/locker/${locker_id}`])
  }

  handlerDelete() {
    console.log('handlerDelete')
  }

  handlerEdit(locker_id: number) {
    this._router.navigate([`/locker/edit/${locker_id}`])
  }
}
