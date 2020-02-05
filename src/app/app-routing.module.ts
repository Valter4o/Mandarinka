import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BonusGameComponent } from './games/bonus-game/bonus-game.component';
import { SudoKuComponent } from './games/sudo-ku/sudo-ku.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';
import { PacmanComponent } from './games/pacman/pacman.component';
import { TetrisComponent } from './games/tetris/tetris.component';
import { AuthGuard } from './auth/auth.guard';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'bonus', canActivate: [AuthGuard], component: BonusGameComponent },
  { path: 'sudoku', canActivate: [AuthGuard], component: SudoKuComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'pacman', canActivate: [AuthGuard], component: PacmanComponent },
  { path: 'tetris', canActivate: [AuthGuard], component: TetrisComponent },
  { path: 'leaderboard', canActivate: [AuthGuard], component: LeaderboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
