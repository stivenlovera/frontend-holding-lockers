import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { ActivatedRoute, RouterLink } from "@angular/router";

@Component({
  selector: 'app-list-department',
  standalone: true,
  imports: [MatIcon, RouterLink],
  templateUrl: './list-department.component.html',
  styleUrl: './list-department.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListDepartmentComponent {
  lockerId = parseInt(this._activateRoute.snapshot.paramMap.get('id')!);

  constructor(
    private _activateRoute: ActivatedRoute
  ) {

  }
}
