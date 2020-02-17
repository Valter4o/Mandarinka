import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { IPlayerScore } from "./interfaces/PlayerScore";
import { ScoreService } from '../shared/score.service';

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

  ngDoCheck(): void {    
    this.dataSource = JSON.parse(localStorage.scores);
  }
}
