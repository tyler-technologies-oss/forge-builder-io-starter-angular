import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ForgeIconModule, ForgeInlineMessageModule } from '@tylertech/forge-angular';
import { IconRegistry } from '@tylertech/forge';
import '@tylertech/forge-extended/structured-card';
import { tylIconInfo } from '@tylertech/tyler-icons';

@Component({
  selector: 'app-dashboard',
  imports: [ForgeIconModule, ForgeInlineMessageModule],
  templateUrl: './dashboard.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardComponent {
  static {
    IconRegistry.define([tylIconInfo]);
  }
}
