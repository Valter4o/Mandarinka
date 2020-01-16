import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BonusGameComponent } from './bonus-game/bonus-game.component';
import { BattleShipsComponent } from './battle-ships/battle-ships.component';
import { SudoKuComponent } from './sudo-ku/sudo-ku.component';
import { BattleComponent } from './battle-ships/battle/battle.component';
import { Rules } from './sudo-ku/popups/rules/rules.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NotfinishedComponent } from './sudo-ku/popups/game/notfinished/notfinished.component';
import { WonComponent } from './sudo-ku/popups/game/finished/won/won.component';
import { LostComponent } from './sudo-ku/popups/game/finished/lost/lost.component';


@NgModule({
  declarations: [Rules, BonusGameComponent, BattleShipsComponent, SudoKuComponent, BattleComponent, NotfinishedComponent, WonComponent, LostComponent],
    
    imports: [CommonModule,MatDialogModule,MatButtonModule],
  entryComponents: [Rules,NotfinishedComponent,WonComponent,LostComponent],
  exports: [BonusGameComponent, BattleShipsComponent, SudoKuComponent, BattleComponent]
})
export class GamesModule { }
