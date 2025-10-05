import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabGroup, MatTab, MatTabsModule } from "@angular/material/tabs";
import { DashboardService } from '../../dashboard.service';
import { Subject, take, takeUntil } from 'rxjs';
import { CardLockerProps, inizializeStateCardLockerProps } from '../../dashboard.types';
import { CardDashBoardComponent } from "../../components/card/card-dashboard-dashboard.component";
import { MatIcon } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { UserService } from 'app/core/user/user.service';
import { IUser, User } from 'app/core/user/user.types';
import { validateAdmin } from 'app/utils/util';


@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    MatTabGroup,
    MatTab,
    MatTabsModule,
    MatMenuModule,
    CardDashBoardComponent,
    MatIcon,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexComponent implements OnInit {

  cardData = signal<CardLockerProps>(inizializeStateCardLockerProps)
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
    private _dashboardService: DashboardService,
    private _router: Router,
    private _userService: UserService
  ) {
    this._userService.user$
      .pipe((takeUntil(this._unsubscribeAll)))
      .subscribe((user: IUser) => {
        this.user = user;
      });
  }
  ngOnInit(): void {
    this._dashboardService.getDashboardInfo().pipe(take(1)).subscribe(
      res => {
        this.cardData.set(res.data)
      }
    )
  }

  handlerCreatelocker() {
    this._router.navigate(['locker/create'])
  }

  handlerUser() {
    this._router.navigate(['user'])
  }

  validateAdmin(): boolean {
    return validateAdmin(this.user.rol);
  }
}
