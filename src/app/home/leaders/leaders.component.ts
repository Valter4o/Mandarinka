import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IPlayerScore } from '../../leaderboard/interfaces/PlayerScore';
import { ScoreService } from '../../shared/score.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-leaders',
  templateUrl: './leaders.component.html',
  styleUrls: ['./leaders.component.css']
})
export class LeadersComponent implements OnInit {
  displayedColumns: string[] = ['username', 'sudoku', 'pacman', 'tetris', 'bonus', 'total'];
  dataSource: Observable<IPlayerScore[]>;

  constructor(
    private scoreService: ScoreService
  ) { }

  ngOnInit() {
    this.dataSource = this.scoreService.score.pipe(
      map((data: Array<IPlayerScore>): Array<IPlayerScore> => {
        data = data.sort((a, b): any => {
          b.total = b.pacman + b.bonus + b.sudoku + b.tetris;
          a.total = a.pacman + a.bonus + a.sudoku + a.tetris;
          return b.total - a.total
        });
        data = data.slice(0, 3);
        return data;
      })
    );
  }
}
