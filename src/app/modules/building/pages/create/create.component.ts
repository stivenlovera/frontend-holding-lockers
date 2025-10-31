import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from "@angular/router";
import { FormBuildingComponent } from "../../components/form-building/form-building.component";
import { IBuilding, initialStateBuilding } from '../../building.types';
import { BuildingService } from '../../building.service';
import { SnackBar } from 'app/utils/snack-bar';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    RouterLink,
    MatIconModule,
    FormBuildingComponent
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SnackBar]
})
export class CreateComponent implements OnInit {

  building = signal<IBuilding>(initialStateBuilding)
  isLoading = signal<boolean>(false)
    
  constructor(
    private _building: BuildingService,
    private _snackBar: SnackBar,
    private _router: Router
  ) {

  }

  ngOnInit(): void {
    console.log('ngOnInit')
  }

  onSubmit(building: IBuilding) {
    this._building.buildingStore(building).subscribe((res) => {
      if (res.meta.code === 200) {
        this._snackBar.openSnackBar(res.meta.message)
        this._router.navigate(['building'])
      }
    })
    throw new Error('Method not implemented.');
  }
}
