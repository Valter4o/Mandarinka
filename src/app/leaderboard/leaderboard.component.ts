import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { IPlayerScore } from "./interfaces/PlayerScore";
import { ScoreService } from '../games/shared/score.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  displayedColumns: string[] = ['username', 'sudoku', 'pacman', 'tetris', 'bonus'];
  dataSource: Observable<IPlayerScore[]>;

  constructor(
    private scoreService: ScoreService
  ) { }

  ngOnInit() {
    this.dataSource = this.scoreService.score;
  }
}
