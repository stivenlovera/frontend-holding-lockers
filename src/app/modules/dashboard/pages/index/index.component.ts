import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabGroup, MatTab, MatTabsModule } from "@angular/material/tabs";
import { DashboardService } from '../../dashboard.service';
import { take } from 'rxjs';
import { CardLockerProps, inizializeStateCardLockerProps } from '../../dashboard.types';
import { CardDashBoardComponent } from "../../components/card/card-dashboard-dashboard.component";


@Component({
  selector: 'app-index',
  standalone: true,
  imports: [MatTabGroup, MatTab, MatTabsModule, MatMenuModule, CardDashBoardComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexComponent implements OnInit {

  cardList = signal<CardLockerProps>(inizializeStateCardLockerProps)

  constructor(
    private _dashboardService: DashboardService
  ) {

  }
  ngOnInit(): void {
    this._dashboardService.getDashboardInfo().pipe(take(1)).subscribe(
      res => {
        console.log(res.data)
        this.cardList.set(res.data)
      }
    )
  }
}
