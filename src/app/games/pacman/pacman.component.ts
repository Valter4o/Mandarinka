import { Component, OnInit, HostListener } from '@angular/core';
import { PacmanService } from './services/pacman.service';
import { MatDialog } from '@angular/material/dialog';
import { StartGameComponent } from './popups/start-game/start-game.component';
import { PacmanDieComponent } from './popups/pacman-die/pacman-die.component';
import { IGhost } from './interfaces/ghost';
import { IPacman } from './interfaces/pacman';
import { PacmanWinComponent } from './popups/pacman-win/pacman-win.component';


@Component({
  selector: 'app-pacman',
  templateUrl: './pacman.component.html',
  styleUrls: ['./pacman.component.css']
})
export class PacmanComponent implements OnInit {
  gameFinished: boolean = false;
  ghostEatableTimer: number;

  gameMap: Array<number[]>;
  initialMap: Array<number[]>;

  readonly WALL: number = 0;
  readonly PACMAN: number = 5;
  readonly ROAD: number = 2;
  readonly COIN: number = 1;
  readonly BIG_COIN: number = 4;
  readonly EAT_TIMER: number = 2000;

  totalScore: number = 0;
  interval: any;
  coinsCount: number = 0;
  bigCoinsCount: number = 0;

  //Pacman
  public pacman: IPacman = {
    dir: 'left',
    marker: 5,
  }

  //Ghosts properties
  ghostOrange: IGhost = {
    marker: 6,
    color: 'orange',
    prevBlock: this.ROAD,
    eatable: false,
  }

  ghostPink: IGhost = {
    marker: 7,
    color: 'pink',
    prevBlock: this.ROAD,
    eatable: false,
  }

  ghostGreen: IGhost = {
    marker: 8,
    color: 'green',
    prevBlock: this.ROAD,
    eatable: false,
  }

  ghostBlue: IGhost = {
    marker: 9,
    color: 'blue',
    prevBlock: this.ROAD,
    eatable: false,
  }

  markerObj = {
    'orange': 6,
    'pink': 7,
    'green': 8,
    'blue': 9,
  }

  get ghostArr(): Array<IGhost> {
    const arr = [];
    arr.push(this.ghostPink);
    arr.push(this.ghostOrange);
    arr.push(this.ghostBlue);
    arr.push(this.ghostGreen);
    return arr;
  }

  constructor(
    public dialog: MatDialog,
    private services: PacmanService
  ) { }

  ngOnInit(): void {
    this.newGame();
  }

  loop(): void {
    let g = this.checkPositions(this.pacman, this.ghostArr);
    if (g === null) {
      this.ghostRun(this.ghostBlue);
      this.pacmanRun(this.pacman);
      this.ghostRun(this.ghostOrange);
      this.ghostRun(this.ghostPink);
      this.ghostRun(this.ghostGreen);
    } else {
      if (this.ghostBlue.eatable) {
        this.pacmanEatsGhost(g);
      } else {
        this.ghostEatsPacman();
      }
    }
    if (this.ghostEatableTimer) {
      this.ghostEatableTimer--;
      if (this.ghostEatableTimer === 0) {
        this.changeEatable(this.ghostArr, false);
      }
    }
  }

  newGame() {
    this.dialog.closeAll();
    this.gameMap = JSON.parse(JSON.stringify(this.services.map));
    let map = this.gameMap;

    const dialogRef = this.dialog.open(StartGameComponent, {});
    dialogRef.componentInstance.onClose.subscribe((res) => {
      for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
          if (map[i][j] === this.pacman.marker) {
            this.pacman.x = i;
            this.pacman.startX = i;
            this.pacman.y = j;
            this.pacman.startY = j;
          }
        }
      }

      for (let i = 0; i < this.gameMap.length; i++) {
        for (let j = 0; j < this.gameMap[i].length; j++) {
          if (this.gameMap[i][j] === 6) {
            this.ghostOrange.x = i;
            this.ghostOrange.startX = i;
            this.ghostOrange.y = j;
            this.ghostOrange.startY = j;
          } else if (this.gameMap[i][j] === 7) {
            this.ghostPink.x = i;
            this.ghostPink.startX = i;
            this.ghostPink.y = j;
            this.ghostPink.startY = j;
          } else if (this.gameMap[i][j] === 8) {
            this.ghostGreen.x = i;
            this.ghostGreen.startX = i;
            this.ghostGreen.y = j;
            this.ghostGreen.startY = j;
          } else if (this.gameMap[i][j] === 9) {
            this.ghostBlue.x = i;
            this.ghostBlue.startX = i;
            this.ghostBlue.y = j;
            this.ghostBlue.startY = j;
          } else if (this.gameMap[i][j] === 1) {
            this.coinsCount++;
          } else if (this.gameMap[i][j] === 4) {
            this.bigCoinsCount++;
          }
        }
      }
      this.dialog.closeAll();
      this.interval = setInterval(this.loop.bind(this), 250);
      //TODO: Replace interval with Observable
    })
  }
  //! Pacman moves;

  @HostListener('window:keydown', ['$event'])
  controlKeyboardEvent(event): void {
    const code = Number(event.keyCode);
    const validCodes = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down',
    }
    const dir = validCodes[code];

    if (dir) {
      event.preventDefault();
    }


    if (dir && dir !== this.pacman.dir) {

      let copyPac: IPacman = JSON.parse(JSON.stringify(this.pacman));
      copyPac.dir = dir;
      copyPac.next = this.findNext(copyPac);
      this.checkNextBox(copyPac);

      if (!copyPac.wall) {
        this.pacman.dir = dir;
      }
    }
  }

  pacmanRun(pac): string | void {
    //Calculate next box
    pac.next = this.findNext(pac);

    //Validate nextBox
    this.checkNextBox(pac);

    if (!pac.wall) {
      //Move Pacman
      this.movePacman(pac);
    }
  }

  findNext(pac): IPacman['next'] {
    let x = pac.dir === 'up'
      ? pac.x - 1
      : pac.dir === 'down'
        ? pac.x + 1
        : pac.x;
    let y = pac.dir === 'left'
      ? pac.y - 1
      : pac.dir === 'right'
        ? pac.y + 1
        : pac.y;

    //Validating for extremes

    const xLength: number = this.gameMap.length;
    const yLength: number = this.gameMap[0].length;

    if (pac.dir === 'left'
      && y === -1) {
      y = yLength - 1;
    } else if (pac.dir === 'right'
      && y === yLength) {
      y = 0;
    } else if (pac.dir === 'up'
      && x === -1) {
      x = xLength - 1;
    } else if (pac.dir === 'down'
      && x === xLength) {
      x = 0;
    }

    return {
      x,
      y,
      value: this.gameMap[x][y],
    }
  }

  checkNextBox(pac): void {
    const val = pac.next.value;
    //Going in wall
    if (val === this.WALL) {
      pac.wall = true;
      return;
    }

    pac.wall = false;

    const ghostMerkersArr: number[] = [6, 7, 8, 9]
    //Going in ghost(eatable)
    if (val === 10) {
      this.totalScore += 50;
      this.pacmanEatsGhost(
        //Finding which ghost we eat
        this.ghostArr.find((ghost) => {
          return ghost.x === pac.next.x
            && ghost.y === pac.next.y
        })
      );
      return;
    }
    //Going in ghost(uneatable)
    if (ghostMerkersArr.includes(val)) {
      this.ghostEatsPacman()
      return;
    }

    //Going in normal coin
    if (val === this.COIN) {
      this.totalScore += this.COIN;
      this.coinsCount--;
    }
    //Going in BIG coin
    if (val === this.BIG_COIN) {
      this.totalScore += this.BIG_COIN;
      this.ghostEatableTimer = this.EAT_TIMER;
      this.changeEatable(this.ghostArr, true);
      this.bigCoinsCount--;
    }
    //Check if no coins left
    if (this.coinsCount === 0 && this.bigCoinsCount === 0) {
      this.winGame();
    }
  }

  movePacman(pac) {
    //Placing road behind pacman
    this.gameMap[pac.x][pac.y] = this.ROAD;

    //Changing cordinates in the obj and removing next
    pac.x = pac.next.x;
    pac.y = pac.next.y;
    delete pac.next;

    //Moving Pacman
    this.gameMap[pac.x][pac.y] = pac.marker;
    //Replacing the copy of the map with road;
    // this.initialMap[pac.x][pac.y] = this.ROAD;
  }

  //! Methods for both

  changeEatable(ghostArr: Array<IGhost>, eat: boolean): void {
    for (let ghost of ghostArr) {
      if (eat) {
        ghost.eatable = true;
        ghost.marker = 10;
      } else {
        ghost.eatable = false;
        ghost.marker = this.markerObj[ghost.color];
      }
    }
  }

  pacmanEatsGhost(g: IGhost): void {
    this.totalScore += 50;
    g.x = g.startX;
    g.y = g.startY;
    g.eatable = false;
    g.marker = this.markerObj[g.color];
  }

  ghostEatsPacman(): void {
    clearInterval(this.interval);
    const ref = this.dialog.open(PacmanDieComponent, {});
    ref.componentInstance.onClose.subscribe((_) => {
      this.newGame();
    })
  }

  checkPositions(p: IPacman, gArr: IGhost[]): IGhost | null {
    for (let i = 0; i < gArr.length - 1; i++) {
      const g = gArr[i];
      if (g.x === p.x && g.y === p.y) {
        return g;
      }
    }
    return null;
  }

  winGame() {
    //Todo:Update high Score
    const dialogRef = this.dialog.open(PacmanWinComponent, {});
    dialogRef.componentInstance.onClose.subscribe((_) => {
      this.newGame();
    })
  }

  //! Ghost moves;

  ghostRun(g: IGhost): void {

    let moves: string[] = this.findOpenPath(g);

    let moveId = this.generateRandomNumber(0, moves.length);
    let move = moves[moveId];
    let oposite = this.findOpposite(move);

    moves = this.filterMoves(moves, g, move);

    if (move === g.last) {
      moves = moves.filter((el) => el !== move);
      moveId = this.generateRandomNumber(0, moves.length);
      move = moves[moveId];
      oposite = this.findOpposite(move);
    }

    this.ghostMovement(move, g);
    g.last = oposite;
  }

  filterMoves(moves: string[], g: IGhost, currMove): string[] {
    if ((g.x < this.pacman.x) && (g.y < this.pacman.y)) {
      // When pacman is down-right of ghost
      if (moves.includes('down') || moves.includes('right') && (currMove !== g.last)) {
        //If ghost chases pacman
        if (!g.eatable) {
          moves = moves.filter((el) => el === 'down' || el === 'right');
        } else {
          //If pacman chases ghost
          moves = moves.filter((el) => el === 'up' || el === 'left');
        }
      }
    } else if ((g.x <= this.pacman.x) && (g.y >= this.pacman.y)) {
      //When pacman located down-left on map respect to ghost's current position
      if (moves.includes('left') || moves.includes('down') && (currMove !== g.last)) {
        //If ghost chases pacman
        if (!g.eatable) {
          moves = moves.filter((el) => el === 'down' || el === 'left');
        } else {
          //If pacman chases ghost
          moves = moves.filter((el) => el === 'up' || el === 'right');
        }
      }
    } else if ((g.x >= this.pacman.x) && (g.y <= this.pacman.y)) {
      //When pacman located up-right on map respect to ghost's current position
      if (moves.includes('up') || moves.includes('right') && (currMove !== g.last)) {
        //If ghost chases pacman
        if (!g.eatable) {
          moves = moves.filter((el) => el === 'up' || el === 'right');
        } else {
          //If pacman chases ghost
          moves = moves.filter((el) => el === 'down' || el === 'left');
        }
      }
    } else if ((g.x >= this.pacman.x) && (g.y >= this.pacman.y)) {
      //When pacman located up-left on map respect to ghost's current position
      if (moves.includes('left') || moves.includes('up') && (currMove !== g.last)) {
        //If ghost chases pacman
        if (!g.eatable) {
          moves = moves.filter((el) => el === 'up' || el === 'left');
        } else {
          //If pacman chases ghost
          moves = moves.filter((el) => el === 'down' || el === 'right');
        }
      }
    }
    return moves
  }

  findOpenPath(g: IGhost): string[] {
    //Todo: Make it smaller
    const freeDirArr = [];

    const nextUp = this.gameMap[g.x - 1] ? this.gameMap[g.x - 1][g.y] : null;
    const nextRight = this.gameMap[g.x][g.y + 1];
    const nextDown = this.gameMap[g.x + 1] ? this.gameMap[g.x + 1][g.y] : null;
    const nextLeft = this.gameMap[g.x][g.y - 1];
    if (nextUp === this.ROAD
      || nextUp === this.COIN
      || nextUp === this.BIG_COIN
      || nextUp === this.PACMAN
      && nextUp) {
      freeDirArr.push('up');
    }
    if (nextRight === this.ROAD
      || nextRight === this.COIN
      || nextRight === this.BIG_COIN
      || nextRight === this.PACMAN
      && nextRight) {
      freeDirArr.push('right');
    }
    if (nextDown === this.ROAD
      || nextDown === this.COIN
      || nextDown === this.BIG_COIN
      || nextDown === this.PACMAN
      && nextDown) {
      freeDirArr.push('down');
    }
    if (nextLeft === this.ROAD
      || nextLeft === this.COIN
      || nextLeft === this.BIG_COIN
      || nextLeft === this.PACMAN
      && nextLeft) {
      freeDirArr.push('left');
    }

    return freeDirArr;
  }

  findOpposite(move): string {
    if (move === 'up') {
      return 'down'
    } else if (move === 'right') {
      return 'left'
    } else if (move === 'down') {
      return 'up'
    } else if (move === 'left') {
      return 'right';
    }
  }

  ghostMovement(move, g): void {
    if (move === 'up') {
      //move up
      this.moveUp(g);
    } else if (move === 'right') {
      //move right
      this.moveRight(g);
    } else if (move === 'down') {
      //move down
      this.moveDown(g);
    } else if (move === 'left') {
      //move left
      this.moveLeft(g);
    }
  }

  generateRandomNumber(min, max): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  ghostPlaceRoad(g: IGhost): void {
    this.gameMap[g.x][g.y] = g.prevBlock;
  }

  moveUp(g: IGhost): void {
    let nextUp = this.gameMap[g.x - 1][g.y];
    this.ghostPlaceRoad(g);
    if (nextUp === this.ROAD) {
      g.prevBlock = this.ROAD
    } else if (nextUp === this.COIN) {
      g.prevBlock = this.COIN;
    } else if (nextUp === this.BIG_COIN) {
      g.prevBlock = this.BIG_COIN;
    }
    this.newPositionGhost(g.x - 1, g.y, g);
  }
  moveRight(g: IGhost): void {
    let nextUp = this.gameMap[g.x][g.y + 1];
    this.ghostPlaceRoad(g);
    if (nextUp === this.ROAD) {
      g.prevBlock = this.ROAD
    } else if (nextUp === this.COIN) {
      g.prevBlock = this.COIN;
    } else if (nextUp === this.BIG_COIN) {
      g.prevBlock = this.BIG_COIN;
    }
    this.newPositionGhost(g.x, g.y + 1, g);
  }
  moveDown(g: IGhost): void {
    let nextUp = this.gameMap[g.x + 1][g.y];
    this.ghostPlaceRoad(g);
    if (nextUp === this.ROAD) {
      g.prevBlock = this.ROAD
    } else if (nextUp === this.COIN) {
      g.prevBlock = this.COIN;
    } else if (nextUp === this.BIG_COIN) {
      g.prevBlock = this.BIG_COIN;
    }
    this.newPositionGhost(g.x + 1, g.y, g);
  }
  moveLeft(g: IGhost): void {
    let nextUp = this.gameMap[g.x][g.y - 1];
    this.ghostPlaceRoad(g);
    if (nextUp === this.ROAD) {
      g.prevBlock = this.ROAD
    } else if (nextUp === this.COIN) {
      g.prevBlock = this.COIN;
    } else if (nextUp === this.BIG_COIN) {
      g.prevBlock = this.BIG_COIN;
    }
    this.newPositionGhost(g.x, g.y - 1, g);
  }

  newPositionGhost(newX: number, newY: number, g: IGhost): void {
    this.checkColapseWithPacman(g);
    g.x = newX;
    g.y = newY;
    this.checkColapseWithPacman(g);
    this.gameMap[newX][newY] = g.marker;
  }

  checkColapseWithPacman(g): void {
    if (g.x === this.pacman.x && g.y === this.pacman.y) {
      if (g.eatable) {
        //Pacman eats ghost
        this.pacmanEatsGhost(g);
      } else {
        //Ghost eats pacman
        this.ghostEatsPacman();
      }
    }
  }
}
