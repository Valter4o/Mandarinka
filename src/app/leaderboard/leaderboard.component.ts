import { Component, OnInit } from '@angular/core';
import { IPlayerScore } from "./interfaces/PlayerScore";
import { ScoreService } from '../games/shared/score.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  displayedColumns: string[] = ['username', 'sudoku', 'pacman', 'tetris', 'bonus'];
  dataSource: IPlayerScore[];
  constructor(
    private scoreService: ScoreService
  ) { }

  ngOnInit() {
    this.scoreService.getScores();
  }

  ngDoCheck() {
    this.dataSource = JSON.parse(localStorage.leaderboard);
  }
}
