import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  computed,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { IconRegistry } from '@tylertech/forge';
import {
  ForgeAppBarModule,
  ForgeButtonModule,
  ForgeCardModule,
  ForgeDividerModule,
  ForgeIconButtonModule,
  ForgeIconModule,
  ForgeListModule,
  ForgeToolbarModule,
} from '@tylertech/forge-angular';
import '@tylertech/forge-extended/app-layout';
import '@tylertech/forge-extended/user-profile';
import {
  tylIconAccount,
  tylIconDashboard,
  tylIconHome,
  tylIconNotifications,
  tylIconSettings,
  tylIconTable,
} from '@tylertech/tyler-icons';

const ROUTE_TITLES: Record<string, string> = {
  dashboard: 'Dashboard',
  'sample-page': 'Sample page',
};

@Component({
  selector: 'app-root',
  imports: [
    RouterLink,
    RouterOutlet,
    ForgeAppBarModule,
    ForgeButtonModule,
    ForgeCardModule,
    ForgeDividerModule,
    ForgeIconButtonModule,
    ForgeIconModule,
    ForgeListModule,
    ForgeToolbarModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class App {
  private readonly router = inject(Router);

  protected readonly title = signal('Forge + Angular');

  protected readonly activeRoute = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => (event as NavigationEnd).urlAfterRedirects.split('?')[0].replace(/^\//, '')),
      startWith(this.router.url.split('?')[0].replace(/^\//, '')),
    ),
    { initialValue: '' },
  );

  protected readonly pageTitle = computed(() => ROUTE_TITLES[this.activeRoute()] ?? 'Dashboard');

  static {
    IconRegistry.define([
      tylIconAccount,
      tylIconDashboard,
      tylIconHome,
      tylIconNotifications,
      tylIconSettings,
      tylIconTable,
    ]);
  }
}
