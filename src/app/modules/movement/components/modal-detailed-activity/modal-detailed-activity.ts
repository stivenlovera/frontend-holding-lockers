import { ChangeDetectionStrategy, Component, Inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from '@angular/material/input';
import { MovementService } from '../../movement.service';
import { IDetailedActivity, initialStateDetailedActivity } from '../../movement.type';

@Component({
  selector: 'modal-detailed-activity',
  standalone: true,
  imports: [
    MatDialogActions,
    MatIconModule,
    MatDialogContent,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './modal-detailed-activity.html',
  styleUrl: './modal-detailed-activity.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalDetailedActivity {
  
  detailedActivity = signal<IDetailedActivity>(initialStateDetailedActivity)

  constructor(
    private movementService: MovementService,
    @Inject(MAT_DIALOG_DATA) public id_ref: string,
    private _matDialogRef: MatDialogRef<ModalDetailedActivity>,
  ) {
    this.movementService.getDetailedActivity(id_ref).subscribe(
      (res) => {
        this.detailedActivity.set(res.data)
      }
    )
  }

}
