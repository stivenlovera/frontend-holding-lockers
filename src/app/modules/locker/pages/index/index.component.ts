import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabGroup, MatTab, MatTabsModule } from "@angular/material/tabs";

import { Subject, take, takeUntil } from 'rxjs';
import { CardDashBoardComponent } from "../../components/card/card-dashboard-dashboard.component";
import { MatIcon } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { UserService } from 'app/core/user/user.service';
import { initialStateAuth, IUser, User } from 'app/core/user/user.types';
import { validateAdmin } from 'app/utils/util';
import { CardLockerProps, inizializeStateCardLockerProps } from '../../locker.types';
import { LockerService } from '../../locker.service';


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
  user: IUser = initialStateAuth;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  building_id: number | undefined = this._activatedRoute.snapshot.params['building'];

  constructor(
    private _lockerService: LockerService,
    private _router: Router,
    private _userService: UserService,
    private _activatedRoute: ActivatedRoute
  ) {
    
    this._userService.user$
      .pipe((takeUntil(this._unsubscribeAll)))
      .subscribe((user: IUser) => {
        this.user = user;
      });

  }
  ngOnInit(): void {
    this._lockerService.getDashboardInfo(this.building_id).pipe(take(1)).subscribe(
      res => {
        this.cardData.set(res.data)
      }
    )
  }

  handlerCreatelocker() {
    this._router.navigate(['locker/building-lockers/' + this.building_id + '/create'])
  }

  validateAdmin(): boolean {
    return validateAdmin(this.user.rol);
  }

  onNavigate(locker_id: number) {
    this._router.navigate(['locker/status/' + locker_id])
  }

  onEdit(locker_id: number) {
    this._router.navigate(['locker/building-lockers/' + this.building_id + '/edit/' + locker_id])
  }

  onDelete(locker_id: number) {
    console.log('onDelete', locker_id)
  }
}
