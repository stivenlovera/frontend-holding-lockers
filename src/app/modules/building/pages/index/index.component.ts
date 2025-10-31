import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { MatTabGroup, MatTab, MatTabsModule } from "@angular/material/tabs";
import { MatIconModule } from "@angular/material/icon";
import { CardBuildingComponent } from "../../components/card-building/card-building.component";
import { IBuilding } from '../../building.types';
import { Router, RouterLink } from '@angular/router';
import { BuildingService } from '../../building.service';
import { Subject, take, takeUntil } from 'rxjs';
import { Confirmation } from 'app/utils/confirmate';
import { SnackBar } from 'app/utils/snack-bar';
import { initialStateAuth, IUser, User } from 'app/core/user/user.types';
import { UserService } from 'app/core/user/user.service';
import { validateAdmin } from 'app/utils/util';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [MatTabGroup, MatTabsModule, MatIconModule, CardBuildingComponent, RouterLink],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [Confirmation, SnackBar]
})
export class IndexComponent implements OnInit {

  cardBuildings = signal<IBuilding[]>([])
  users = signal<User[]>([])
  user: IUser = initialStateAuth;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _buildingService: BuildingService,
    private _router: Router,
    private _confirmation: Confirmation,
    private _snackBar: SnackBar,
    private _userService: UserService
  ) {
    this._userService.user$
      .pipe((takeUntil(this._unsubscribeAll)))
      .subscribe((user: IUser) => {
        this.user = user;
      });
  }

  ngOnInit(): void {
    this.loadCard()
  }

  loadCard() {
    this._buildingService.listBuilding().pipe(take(1)).subscribe((res) => {
      this.cardBuildings.set(res.data.buildings)
      this.users.set(res.data.users)
    })
  }

  handlerCreatelocker() {
    this._router.navigate(['building/create'])
  }

  onEdit(building_id: number) {
    this._router.navigate(['building/edit/' + building_id])
  }

  onDelete(building_id: number) {
    this._confirmation.confirmation({
      title: 'Eliminar',
      message: 'Esta seguro de eliminar este registro?',
      icon: {
        show: true,
        name: "heroicons_outline:exclamation-triangle",
        color: "success"
      },
      actions: {
        confirm: {
          show: true,
          label: "Si",
          color: "warn"
        },
        cancel: {
          show: true,
          label: "Cancelar"
        }
      },
      dismissible: true
    })
      .afterClosed().subscribe((result) => {
        if (result == 'confirmed') {
          this._buildingService.buildingDelete(building_id).pipe(take(1)).subscribe((res) => {
            if (res.meta.code === 200) {
              this._snackBar.openSnackBar(res.meta.message)
              this._router.navigate(['building'])
              this.loadCard()
            }
          })
        }
      });
  }

  onNavigate(building_id: number) {
    this._router.navigate(['locker/building-lockers/' + building_id])
  }

  validateAdmin(): boolean {
    return validateAdmin(this.user.rol);
  }

  handlerUser() {
    this._router.navigate(['user'])
  }
}
