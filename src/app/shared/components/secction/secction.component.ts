import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'secction',
  standalone: true,
  imports: [],
  templateUrl: './secction.component.html',
  styleUrl: './secction.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecctionComponent {

  descripcion = input.required<string>()
}
