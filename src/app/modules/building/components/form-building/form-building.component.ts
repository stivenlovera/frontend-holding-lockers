import { ChangeDetectionStrategy, Component, effect, EventEmitter, input, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { IBuilding } from '../../building.types';
import { MatDivider } from "@angular/material/divider";

@Component({
  selector: 'form-building',
  standalone: true,
  imports: [
    MatSelectModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule
  ],
  templateUrl: './form-building.component.html',
  styleUrl: './form-building.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormBuildingComponent {

  building = input.required<IBuilding>()
  isLoading = input.required<boolean>()

  @Output() onSubmit = new EventEmitter<IBuilding>();

  formBuilding = new FormGroup({
    building_id: new FormControl(null, []),
    company_id: new FormControl(null, [Validators.required]),
    name: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    manager: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    code: new FormControl('', [Validators.required])
  })

  constructor(

  ) {
    effect(() => {
      if (this.isLoading()) {
        this.formBuilding.disable()
      } else {
        this.formBuilding.enable()
      }
      this.formBuilding.setValue(this.building())
    })
  }
  handlerSubmit() {

    if (this.formBuilding.valid) {
      console.log(this.formBuilding.value)
      const value = this.formBuilding.value as IBuilding;
      this.onSubmit.emit(value)
    }
    else {
      this.formBuilding.markAllAsTouched()
    }
  }
}
