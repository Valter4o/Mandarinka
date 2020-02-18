import { Component, OnInit } from '@angular/core';
import { IPlayerScore } from "./interfaces/PlayerScore";
import { ScoreService } from '../shared/score.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  displayedColumns: string[] = ['username', 'sudoku', 'pacman', 'tetris', 'bonus', 'total'];
  dataSource: Observable<IPlayerScore[]>;

  constructor(
    private scoreService: ScoreService
  ) { }

  ngOnInit() {
    this.dataSource = this.scoreService.score.pipe(
      map((data) => {
        data.forEach((pScore: IPlayerScore) => {
          pScore.total = pScore.tetris + pScore.sudoku + pScore.pacman + pScore.bonus;
        });
        data.sort((a: IPlayerScore, b: IPlayerScore): any => a.username.localeCompare(b.username))
        return data;
      })
    );
  }

  sort(prop) {
    this.dataSource.pipe(
      map((data) => {
        data = data.sort((a: IPlayerScore, b: IPlayerScore): any => b[prop] - a[prop])
        return data;
      })
    )
  }
} 
