import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IPlayerScore } from '../../leaderboard/interfaces/PlayerScore';
import { ScoreService } from '../../shared/score.service';

@Component({
  selector: 'app-leaders',
  templateUrl: './leaders.component.html',
  styleUrls: ['./leaders.component.css']
})
export class LeadersComponent implements OnInit {
  displayedColumns: string[] = ['username', 'sudoku', 'pacman', 'tetris', 'bonus'];
  dataSource: Observable<IPlayerScore[]>;

  constructor(
    private scoreService: ScoreService
  ) { }

  ngOnInit() {
    this.dataSource = this.scoreService.score;
  }
}
