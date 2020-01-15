import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BonusGameComponent } from './bonus-game/bonus-game.component';
import { BattleShipsComponent } from './battle-ships/battle-ships.component';
import { SudoKuComponent } from './sudo-ku/sudo-ku.component';
import { BattleComponent } from './battle-ships/battle/battle.component';
import { Rules } from './sudo-ku/popups/rules/rules-component';


@NgModule({
  declarations: [Rules,BonusGameComponent, BattleShipsComponent, SudoKuComponent, BattleComponent],
  imports: [CommonModule],
    
    exports: [Rules,BonusGameComponent,BattleShipsComponent,SudoKuComponent,BattleComponent]
})
export class GamesModule { }
