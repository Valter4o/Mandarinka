import { Component, OnInit, HostListener } from '@angular/core';
import { PacmanService } from './services/pacman.service';
import { MatDialog } from '@angular/material/dialog';
import { StartGameComponent } from './popups/start-game/start-game.component';
import { PacmanDieComponent } from './popups/pacman-die/pacman-die.component';
import { IGhost } from './interfaces/ghost';
import { IPacman } from './interfaces/pacman';


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
  readonly EAT_TIMER: number = 20;

  totalScore: number = 0;
  lives = 3;


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

  get ghostArr(): Array<IGhost> {
    const arr = [];
    arr.push(this.ghostPink);
    arr.push(this.ghostOrange);
    arr.push(this.ghostBlue);
    arr.push(this.ghostGreen);
    return arr;
  }

  // timer: NodeJS.Timer;

  constructor(
    public dialog: MatDialog,
    private services: PacmanService
  ) {
    this.initialMap = services.map;
    this.gameMap = services.map;
  }

  ngOnInit(): void {
    let map = this.gameMap;
    //Initial pacman coordinate (20,8)

    const dialogRef = this.dialog.open(StartGameComponent, {});
    dialogRef.componentInstance.onClose.subscribe((res) => {
      for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
          if (map[i][j] === this.pacman.marker) {
            this.pacman.x = i;
            this.pacman.y = j;
          }
        }
      }

      for (let i = 0; i < this.gameMap.length; i++) {
        for (let j = 0; j < this.gameMap[i].length; j++) {
          if (this.gameMap[i][j] === 6) {
            this.ghostOrange.x = i;
            this.ghostOrange.y = j;
          } else if (this.gameMap[i][j] === 7) {
            this.ghostPink.x = i;
            this.ghostPink.y = j;
          } else if (this.gameMap[i][j] === 8) {
            this.ghostGreen.x = i;
            this.ghostGreen.y = j;
          } else if (this.gameMap[i][j] === 9) {
            this.ghostBlue.x = i;
            this.ghostBlue.y = j;
          }
        }
      }
      this.dialog.closeAll();
      // this.loop();
      // this.timer = 
      setInterval(this.loop.bind(this), 250);
      //TODO: Replace interval with Observable
    })
  }

  loop(): void {
    this.pacmanRun(this.pacman);
    this.ghostRun(this.ghostBlue);
    // this.ghostRun(this.ghostOrange);
    // this.ghostRun(this.ghostPink);
    // this.ghostRun(this.ghostGreen);
    if (this.ghostEatableTimer) {
      this.ghostEatableTimer--;
      if (this.ghostEatableTimer === 0) {
        this.changeEatable(this.ghostArr, false);
      }
    }
  }

  //! Pacman moves;

  @HostListener('window:keydown', ['$event'])
  controlKeyboardEvent(event): void {
    event.preventDefault();
    const code = Number(event.keyCode);
    const validCodes = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down',
    }

    const dir = validCodes[code];

    if (dir && dir !== this.pacman.dir) {
      this.pacman.dir = dir;
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
    const x = pac.dir === 'up'
      ? pac.x - 1
      : pac.dir === 'down'
        ? pac.x + 1
        : pac.x;
    const y = pac.dir === 'left'
      ? pac.y - 1
      : pac.dir === 'right'
        ? pac.y + 1
        : pac.y;

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
    }
    //Going in BIG coin
    if (val === this.BIG_COIN) {
      this.totalScore += this.BIG_COIN;
      this.ghostEatableTimer = this.EAT_TIMER;
      this.changeEatable(this.ghostArr, true);
    }
  }

  movePacman(pac) {
    //Placing road behind pacman
    this.gameMap[pac.x][pac.y] = this.ROAD;

    //Validating for extremes

    const xLength: number = this.gameMap.length;
    const yLength: number = this.gameMap[pac.x].length;

    if (pac.dir === 'left'
      && pac.next.y === -1) {
      pac.next.y = yLength - 1;
    } else if (pac.dir === 'right'
      && pac.next.y === yLength) {
      pac.next.y = 0;
    } else if (pac.dir === 'up'
      && pac.next.x === -1) {
      pac.next.x = xLength - 1;
    } else if (pac.dir === 'down'
      && pac.next.x === xLength) {
      pac.next.x = 0;
    }

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
        const markerObj = {
          'orange': 6,
          'pink': 7,
          'green': 8,
          'blue': 9,
        }
        ghost.eatable = false;
        ghost.marker = markerObj[ghost.color];
      }
    }
  }

  pacmanEatsGhost(g): void {
    //Todo : Eat ghost
  }

  ghostEatsPacman(): void {
    //Todo: Eat Pacman

    this.lives--;
    if (this.lives === 0) {
      // clearInterval(this.timer);
      this.dialog.open(PacmanDieComponent, {});
    }
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
    if (this.gameMap[g.x - 1][g.y] === this.ROAD
      || this.gameMap[g.x - 1][g.y] === this.COIN
      || this.gameMap[g.x - 1][g.y] === this.BIG_COIN
      || this.gameMap[g.x - 1][g.y] === this.PACMAN) {
      freeDirArr.push('up');
    }
    if (this.gameMap[g.x][g.y + 1] === this.ROAD
      || this.gameMap[g.x][g.y + 1] === this.COIN
      || this.gameMap[g.x][g.y + 1] === this.BIG_COIN
      || this.gameMap[g.x][g.y + 1] === this.PACMAN) {
      freeDirArr.push('right');
    }
    if (this.gameMap[g.x + 1][g.y] === this.ROAD
      || this.gameMap[g.x + 1][g.y] === this.COIN
      || this.gameMap[g.x + 1][g.y] === this.BIG_COIN
      || this.gameMap[g.x + 1][g.y] === this.PACMAN) {
      freeDirArr.push('down');
    }
    if (this.gameMap[g.x][g.y - 1] === this.ROAD
      || this.gameMap[g.x][g.y - 1] === this.COIN
      || this.gameMap[g.x][g.y - 1] === this.BIG_COIN
      || this.gameMap[g.x][g.y - 1] === this.PACMAN) {
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
    if (g.x === 0) {
      g.last = 'up';
      this.moveDown(g);
    } else {
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
  }
  moveRight(g: IGhost): void {
    if (g.y === this.gameMap[g.x].length - 1) {
      g.last = 'right';
      this.moveLeft(g);
    } else {
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
  }
  moveDown(g: IGhost): void {
    if (g.x === this.gameMap.length - 1) {
      g.last = 'down';
      this.moveUp(g);
    } else {
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
  }
  moveLeft(g: IGhost): void {
    if (g.y === 0) {
      g.last = 'left';
      this.moveRight(g);
    } else {
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
