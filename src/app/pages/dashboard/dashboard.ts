import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ForgeCardModule } from '@tylertech/forge-angular';

@Component({
  selector: 'app-dashboard',
  imports: [ForgeCardModule],
  templateUrl: './dashboard.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {}
