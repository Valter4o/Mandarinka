import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BonusGameComponent } from './bonus-game/bonus-game.component';
import { BattleShipsComponent } from './battle-ships/battle-ships.component';
import { SudoKuComponent } from './sudo-ku/sudo-ku.component';
import { BattleComponent } from './battle-ships/battle/battle.component';


@NgModule({
  declarations: [BonusGameComponent, BattleShipsComponent, SudoKuComponent, BattleComponent],
  imports: [CommonModule],
    
    exports: [BonusGameComponent,BattleShipsComponent,SudoKuComponent,BattleComponent]
})
export class GamesModule { }
