import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { BonusGameComponent } from './bonus-game/bonus-game.component';

import { SudoKuComponent } from './sudo-ku/sudo-ku.component';
import { PacmanComponent } from './pacman/pacman.component';
import { TetrisComponent } from './tetris/tetris.component';

// Material stuff
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

// Popups
import { Rules } from './sudo-ku/popups/rules/rules.component';
import { NotfinishedComponent } from './sudo-ku/popups/game/notfinished/notfinished.component';
import { WonComponent } from './sudo-ku/popups/game/finished/won/won.component';
import { LostComponent } from './sudo-ku/popups/game/finished/lost/lost.component';
import { RulesComponent } from './bonus-game/popups/rules/rules.component';
import { LostBonusComponent } from './bonus-game/popups/lost-bonus/lost-bonus.component';
import { WonBonusComponent } from './bonus-game/popups/won-bonus/won-bonus.component';
//CDK module
import { DragDropModule } from "@angular/cdk/drag-drop";
import { StartGameComponent } from './pacman/popups/start-game/start-game.component';
import { PacmanDieComponent } from './pacman/popups/pacman-die/pacman-die.component';
import { PacmanWinComponent } from './pacman/popups/pacman-win/pacman-win.component';


@NgModule({
  declarations: [
    Rules,
    BonusGameComponent,
    SudoKuComponent,
    NotfinishedComponent,
    WonComponent,
    LostComponent,
    RulesComponent,
    LostBonusComponent,
    WonBonusComponent,
    PacmanComponent,
    TetrisComponent,
    StartGameComponent,
    PacmanDieComponent,
    PacmanWinComponent
  ],

  imports: [CommonModule, MatDialogModule, MatButtonModule, DragDropModule],
  entryComponents: [
    StartGameComponent,
    PacmanDieComponent,
    PacmanWinComponent,
    LostComponent,
    RulesComponent,
    Rules,
    NotfinishedComponent,
    WonComponent,
    LostComponent,
    LostBonusComponent,
    WonBonusComponent
  ],
  exports: [BonusGameComponent, SudoKuComponent, TetrisComponent]
})
export class GamesModule { }
