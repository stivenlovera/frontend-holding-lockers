import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'seccion-data-table',
  standalone: true,
  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './seccion-data-table.component.html',
  styleUrl: './seccion-data-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeccionDataTableComponent {
  description = input.required<string>()
  filter = input.required<boolean>()
}
