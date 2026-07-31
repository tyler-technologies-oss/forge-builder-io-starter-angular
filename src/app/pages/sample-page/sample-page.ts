import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, computed, signal } from '@angular/core';
import { ForgeCardModule, ForgeIconModule, ForgeTableModule, ForgeToolbarModule } from '@tylertech/forge-angular';
import type { IColumnConfiguration } from '@tylertech/forge';
import { IconRegistry } from '@tylertech/forge';
import '@tylertech/forge-extended/count-card';
import { tylIconBusiness, tylIconCalendar, tylIconDevices, tylIconGames } from '@tylertech/tyler-icons';

interface VideoGame {
  rank: number;
  title: string;
  platform: string;
  year: number;
  genre: string;
  publisher: string;
}

@Component({
  selector: 'app-sample-page',
  imports: [ForgeCardModule, ForgeIconModule, ForgeTableModule, ForgeToolbarModule],
  templateUrl: './sample-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SamplePageComponent {
  protected readonly columns: IColumnConfiguration[] = [
    { property: 'rank', header: 'Rank' },
    { property: 'title', header: 'Title' },
    { property: 'platform', header: 'Platform' },
    { property: 'year', header: 'Year' },
    { property: 'genre', header: 'Genre' },
    { property: 'publisher', header: 'Publisher' },
  ];

  protected readonly games = signal<VideoGame[]>([
    { rank: 1, title: 'The Legend of Zelda: Breath of the Wild', platform: 'Switch', year: 2017, genre: 'Action-adventure', publisher: 'Nintendo' },
    { rank: 2, title: 'Super Mario Bros.', platform: 'NES', year: 1985, genre: 'Platformer', publisher: 'Nintendo' },
    { rank: 3, title: 'Tetris', platform: 'Game Boy', year: 1989, genre: 'Puzzle', publisher: 'Nintendo' },
    { rank: 4, title: 'The Legend of Zelda: Ocarina of Time', platform: 'N64', year: 1998, genre: 'Action-adventure', publisher: 'Nintendo' },
    { rank: 5, title: 'Grand Theft Auto V', platform: 'Multi-platform', year: 2013, genre: 'Action', publisher: 'Rockstar Games' },
    { rank: 6, title: 'Minecraft', platform: 'Multi-platform', year: 2011, genre: 'Sandbox', publisher: 'Mojang' },
    { rank: 7, title: 'The Witcher 3: Wild Hunt', platform: 'Multi-platform', year: 2015, genre: 'RPG', publisher: 'CD Projekt' },
    { rank: 8, title: 'Red Dead Redemption 2', platform: 'Multi-platform', year: 2018, genre: 'Action-adventure', publisher: 'Rockstar Games' },
    { rank: 9, title: 'Half-Life 2', platform: 'PC', year: 2004, genre: 'FPS', publisher: 'Valve' },
    { rank: 10, title: 'Super Mario 64', platform: 'N64', year: 1996, genre: 'Platformer', publisher: 'Nintendo' },
    { rank: 11, title: 'Portal 2', platform: 'Multi-platform', year: 2011, genre: 'Puzzle', publisher: 'Valve' },
    { rank: 12, title: 'Chrono Trigger', platform: 'SNES', year: 1995, genre: 'RPG', publisher: 'Square' },
    { rank: 13, title: 'Dark Souls', platform: 'Multi-platform', year: 2011, genre: 'Action RPG', publisher: 'FromSoftware' },
    { rank: 14, title: 'Doom', platform: 'PC', year: 1993, genre: 'FPS', publisher: 'id Software' },
    { rank: 15, title: 'Final Fantasy VII', platform: 'PS1', year: 1997, genre: 'RPG', publisher: 'Square' },
    { rank: 16, title: 'The Elder Scrolls V: Skyrim', platform: 'Multi-platform', year: 2011, genre: 'RPG', publisher: 'Bethesda' },
    { rank: 17, title: 'Super Metroid', platform: 'SNES', year: 1994, genre: 'Action-adventure', publisher: 'Nintendo' },
    { rank: 18, title: 'The Legend of Zelda: A Link to the Past', platform: 'SNES', year: 1991, genre: 'Action-adventure', publisher: 'Nintendo' },
    { rank: 19, title: 'Metal Gear Solid', platform: 'PS1', year: 1998, genre: 'Stealth', publisher: 'Konami' },
    { rank: 20, title: 'Street Fighter II', platform: 'Arcade', year: 1991, genre: 'Fighting', publisher: 'Capcom' },
    { rank: 21, title: 'Pac-Man', platform: 'Arcade', year: 1980, genre: 'Arcade', publisher: 'Namco' },
    { rank: 22, title: 'Halo: Combat Evolved', platform: 'Xbox', year: 2001, genre: 'FPS', publisher: 'Microsoft' },
    { rank: 23, title: 'World of Warcraft', platform: 'PC', year: 2004, genre: 'MMORPG', publisher: 'Blizzard' },
    { rank: 24, title: 'Sonic the Hedgehog 2', platform: 'Genesis', year: 1992, genre: 'Platformer', publisher: 'Sega' },
    { rank: 25, title: 'Resident Evil 4', platform: 'GameCube', year: 2005, genre: 'Survival horror', publisher: 'Capcom' },
    { rank: 26, title: 'Bloodborne', platform: 'PS4', year: 2015, genre: 'Action RPG', publisher: 'Sony' },
    { rank: 27, title: 'Elden Ring', platform: 'Multi-platform', year: 2022, genre: 'Action RPG', publisher: 'Bandai Namco' },
    { rank: 28, title: 'Mass Effect 2', platform: 'Multi-platform', year: 2010, genre: 'Action RPG', publisher: 'Electronic Arts' },
    { rank: 29, title: 'BioShock', platform: 'Multi-platform', year: 2007, genre: 'FPS', publisher: '2K Games' },
    { rank: 30, title: 'Super Smash Bros. Melee', platform: 'GameCube', year: 2001, genre: 'Fighting', publisher: 'Nintendo' },
  ]);

  protected readonly totalGames = computed(() => this.games().length);
  protected readonly uniquePublishers = computed(() => new Set(this.games().map((g) => g.publisher)).size);
  protected readonly uniquePlatforms = computed(() => new Set(this.games().map((g) => g.platform)).size);
  protected readonly yearRange = computed(() => {
    const years = this.games().map((g) => g.year);
    return `${Math.min(...years)}–${Math.max(...years)}`;
  });

  static {
    IconRegistry.define([tylIconBusiness, tylIconCalendar, tylIconDevices, tylIconGames]);
  }
}
