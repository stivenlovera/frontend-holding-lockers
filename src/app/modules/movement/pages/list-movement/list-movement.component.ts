import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { DatatableLockerComponent } from "app/modules/movement/components/datatable-movement/datatable-movement.component";
import { IDataTableMovement, initialStateDataTableMovement } from '../../movement.type';
import { LockerService } from '../../movement.service';
import { take } from 'rxjs';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { PaginateTraslate } from 'app/shared/paginator.traslate';
import { MatIcon } from "@angular/material/icon";
import { ActivatedRoute, RouterLink } from "@angular/router";

@Component({
  selector: 'app-list-movement',
  standalone: true,
  imports: [DatatableLockerComponent, MatIcon, RouterLink],
  templateUrl: './list-movement.component.html',
  styleUrl: './list-movement.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: MatPaginatorIntl, useClass: PaginateTraslate }]
})
export class ListMovementComponent implements OnInit {
  lockerId = parseInt(this._activateRoute.snapshot.paramMap.get('id')!);
  dataTableMovement = signal<IDataTableMovement>(initialStateDataTableMovement)

  constructor(
    private lockerService: LockerService,
    private _activateRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.handlerDataTableMovement(initialStateDataTableMovement)
  }

  handlerDataTableMovement(dataTableMovement: IDataTableMovement) {
    this.lockerService.getDataTableMovement(1, dataTableMovement.paginate, dataTableMovement.sort).pipe(take(1)).subscribe(
      res => {
        this.dataTableMovement.set(res.data)
      }
    )
  }
}
