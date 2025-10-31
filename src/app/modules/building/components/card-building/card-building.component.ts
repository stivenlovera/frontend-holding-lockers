import { ChangeDetectionStrategy, Component, EventEmitter, input, Output, signal } from '@angular/core';
import { IBuilding } from '../../building.types';
import { MatMenu, MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

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

  handlerDelete(building_id: number) {
    this.onDelete.emit(building_id)
  }

  handlerEdit(building_id: number) {
    this.onEdit.emit(building_id)
  }

  handlerNavigate(building_id: number) {
    this.onNavigate.emit(building_id)
  }

}
