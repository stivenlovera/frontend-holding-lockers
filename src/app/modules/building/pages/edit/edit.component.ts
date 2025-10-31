import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { Router, RouterLink } from "@angular/router";
import { IBuilding, IDataTableApiIntegration, initialStateBuilding, initialStateDataTableApiIntegration } from '../../building.types';
import { BuildingService } from '../../building.service';
import { SnackBar } from 'app/utils/snack-bar';
import { lastValueFrom } from 'rxjs';
import { FormBuildingComponent } from "../../components/form-building/form-building.component";
import { DataTableApiIntegrateComponent } from "../../components/data-table-api-integrate/data-table-api-integrate.component";

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [MatIcon, RouterLink, FormBuildingComponent, DataTableApiIntegrateComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SnackBar]
})
export class EditComponent implements OnInit {

  building = signal<IBuilding>(initialStateBuilding)
  isLoading = signal<boolean>(true)
  dataTableApiIntegration = signal<IDataTableApiIntegration>(initialStateDataTableApiIntegration)

  constructor(
    private _building: BuildingService,
    private _snackBar: SnackBar,
    private _router: Router
  ) {

  }

  async ngOnInit(): Promise<void> {
    const data = await lastValueFrom(this._building.buildingEdit(1))
    this.isLoading.set(false)
    this.building.set(data.data)
    const dataTableApiIntegration = await lastValueFrom(this._building.getDataTableApiIntegration(
      1,
      this.dataTableApiIntegration().paginate,
      this.dataTableApiIntegration().sort
    ))
    this.dataTableApiIntegration.set(dataTableApiIntegration.data)
  }

  onSubmit(building: IBuilding) {
    this._building.buildingUpdate(building).subscribe((res) => {
      if (res.meta.code === 200) {
        this._snackBar.openSnackBar(res.meta.message)
        this._router.navigate(['building'])
      }
    })
  }
}
