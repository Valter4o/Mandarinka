import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './common/home/home.component';
import { BattleShipsComponent } from './games/battle-ships/battle-ships.component';
import { BonusGameComponent } from './games/bonus-game/bonus-game.component';
import { SudoKuComponent } from './games/sudo-ku/sudo-ku.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'bonus', component: BonusGameComponent },
  { path: 'battleships', component: BattleShipsComponent },
  { path: 'sudoku', component: SudoKuComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
