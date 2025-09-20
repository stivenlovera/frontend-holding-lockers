import { ChangeDetectionStrategy, Component, Input, input } from '@angular/core';
import { Locker } from '../../dashboard.types';
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { Router } from '@angular/router';

@Component({
  selector: 'card-dashboard',
  standalone: true,
  imports: [MatIconModule, MatMenuModule],
  templateUrl: './card-dashboard.component.html',
  styleUrl: './card-dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardDashBoardComponent {

  //locker = input.required<Locker>()
  @Input() locker: Locker;

  constructor(
    private _router: Router
  ) {

  }

  handlerNavigate(locker_id: number) {
    console.log('handlerNavigate')
    this._router.navigate([`/locker/${locker_id}`])
  }
}
