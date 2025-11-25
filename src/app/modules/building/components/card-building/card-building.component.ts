import { ChangeDetectionStrategy, Component, EventEmitter, input, Output, signal } from '@angular/core';
import { IBuilding } from '../../building.types';
import { MatMenu, MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { initialStateAuth, IUser } from 'app/core/user/user.types';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from 'app/core/user/user.service';
import { validateAdmin } from 'app/utils/util';

@Component({
  selector: 'card-building',
  standalone: true,
  imports: [
    MatMenuModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './card-building.component.html',
  styleUrl: './card-building.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardBuildingComponent {
  building = input.required<IBuilding>()
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
        this.user = user;
      });
  }

  handlerDelete(building_id: number) {
    this.onDelete.emit(building_id)
  }

  handlerEdit(building_id: number) {
    this.onEdit.emit(building_id)
  }

  handlerNavigate(building_id: number) {
    this.onNavigate.emit(building_id)
  }
  validateAdmin(): boolean {
    return validateAdmin(this.user.rol);
  }
}
