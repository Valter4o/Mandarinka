import { Component, OnInit, HostListener } from '@angular/core';
import { PacmanService } from './services/pacman.service';
import { MatDialog } from '@angular/material/dialog';
import { StartGameComponent } from './popups/start-game/start-game.component';
<<<<<<< Updated upstream
=======
import { PacmanDieComponent } from './popups/pacman-die/pacman-die.component';
import { IGhost } from './interfaces/ghost';
import { IPacman } from './interfaces/pacman';
import { PacmanWinComponent } from './popups/pacman-win/pacman-win.component';
>>>>>>> Stashed changes


export interface IFrameData {
  frameStartTime: number;
  deltaTime: number;
}

@Component({
  selector: 'app-pacman',
  templateUrl: './pacman.component.html',
  styleUrls: ['./pacman.component.css']
})
export class PacmanComponent implements OnInit {
  title = 'Pacman Game';
  gameFinished: boolean = false;
  gameMap: Array<number[]>;
  initPacmanX: number; initPacmanY: number;

  readonly WALL: number = 0;
  readonly PACMAN: number = 5;
  readonly ROAD: number = 2;
<<<<<<< Updated upstream
=======
  readonly COIN: number = 1;
  readonly BIG_COIN: number = 4;
  readonly EAT_TIMER: number = 20;

  totalScore: number = 0;
  highScore: number;
  lives = 3;
  interval: any;
  coins: number = 0;
  bigCoins: number = 0;

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
>>>>>>> Stashed changes

  readonly EAT_COIN: number = 1;
  readonly EAT_BIG_COIN: number = 4;
  readonly GHOST: number = 3;

  totalScore: number = 0;
  readonly eatCoin: number = 2;
  readonly eatBigCoin = 4;

  pacmanMove: number = 2; // 1 ==> up, 2==>right, 3==>down, 4==>left
  ghostMeetWall: boolean = false;

  //Ghost properties
  ghostY: number; ghostX: number;
  ghostCrashed: boolean = false;
  ghostLast: string;

  private movingDir: number = 38;
  faceWall: boolean = false;

  constructor(
    public dialog: MatDialog,
    private pacService: PacmanService
  ) {
<<<<<<< Updated upstream
    document.title = this.title;
    this.gameMap = services.map;
  }

  ngOnInit() {
    let map = this.gameMap;
    //Initial pacman coordinate (20,8)

    const dialogRef = this.dialog.open(StartGameComponent, {});
    dialogRef.componentInstance.onClose.subscribe((res) => {
      for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i]['length']; j++) {
          if (map[i][j] === 5) {
            this.initPacmanX = i;
            this.initPacmanY = j;
          }
        }
      }

      for (let i = 0; i < this.gameMap.length; i++) {
        for (let j = 0; j < this.gameMap[i]['length']; j++) {
          if (this.gameMap[i][j] == 3) {
            this.ghostX = i;
            this.ghostY = j;
          }
        }
      }
      this.dialog.closeAll();
      setInterval(this.loop.bind(this), 250);
      //TODO: Replace interval with Observable
    })

  }

  loop() {
    this.moveDir(this.movingDir);
    this.ghostRun(this.ghostX, this.ghostY);
=======
    this.initialMap = pacService.map;
    this.gameMap = pacService.map;
  }

  ngOnInit(): void {
    this.newGame();
  }

  loop(): void {
    this.pacmanRun(this.pacman);
    this.ghostRun(this.ghostBlue);
    this.ghostRun(this.ghostOrange);
    this.ghostRun(this.ghostPink);
    this.ghostRun(this.ghostGreen);
    if (this.ghostEatableTimer) {
      this.ghostEatableTimer--;
      if (this.ghostEatableTimer === 0) {
        this.changeEatable(this.ghostArr, false);
      }
    }
>>>>>>> Stashed changes
  }

  //! Pacman moves;
  //Returns 'wall'if the direction given is towards wall
  moveDir(code): string | void {
    const dirObj = {
      '37': {
        nextBlock: this.initPacmanY - 1,
        nextFace: 4,
        move: () => this.initPacmanY -= 1
      },
      '38': {
        nextBlock: this.initPacmanX - 1,
        nextFace: 1,
        move: () => this.initPacmanX -= 1
      },
      '39': {
        nextBlock: this.initPacmanY + 1,
        nextFace: 2,
        move: () => this.initPacmanY += 1
      },
      '40': {
        nextBlock: this.initPacmanX + 1,
        nextFace: 3,
        move: () => this.initPacmanX += 1
      },
    }

<<<<<<< Updated upstream
    let nextDirId = dirObj[code].nextBlock;
=======
    const dir = validCodes[code];

    if (dir && dir !== this.pacman.dir) {
      const pacCopy = { ...this.pacman }
      pacCopy.dir = dir;
      this.pacmanRun(pacCopy);
      if (!pacCopy.wall) {
        this.pacman.dir = dir;
      }
    }
  }

  pacmanRun(pac): string | void {
    //Calculate next box
    pac.next = this.findNext(pac);
>>>>>>> Stashed changes

    const nextBox = code === 38 || code === 40 ?
      this.gameMap[nextDirId][this.initPacmanY] :
      this.gameMap[this.initPacmanX][nextDirId]

<<<<<<< Updated upstream
=======
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
    const yLength: number = this.gameMap[pac.x].length;

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
>>>>>>> Stashed changes

    if (nextBox === this.WALL) {
      return 'wall';
    } else {
      //Change face 
      this.scoreUpdate(nextBox);//For updating score
      this.pacmanMove = dirObj[code].nextFace;//Setting pacman's face towards the dir he is going
      this.pacmanMoved(this.initPacmanX, this.initPacmanY); //Replacing pacman box with nothing

      if (nextDirId === -1) {
        if (code === 38) {
          this.initPacmanX = this.gameMap.length - 1;
        } else if (code === 37) {
          this.initPacmanY = this.gameMap[this.initPacmanY]['length'] - 1;//Setting pacman's new position to right end of map
        }

<<<<<<< Updated upstream
      } else if (nextDirId === this.gameMap.length) {
        //Reached down end
        this.initPacmanX = 0;
      } else if (nextDirId === this.gameMap[0].length && code === 39) {
        //Reached right end
        this.initPacmanY = 0;
      } else {
        dirObj[code].move();
      }

      if (!this.gameFinished) {
        this.gameMap[this.initPacmanX][this.initPacmanY] = this.PACMAN;
      }
    }
  }

  @HostListener('window:keydown', ['$event'])
  controlKeyboardEvent(event) {
    event.preventDefault();
    const code = event.keyCode;

    if (code === 37 || code === 38 || code === 39 || code === 40) {
      if (code !== this.movingDir) {
        if (this.moveDir(code) !== 'wall') {
          this.movingDir = code;
=======
    //Going in normal coin
    if (val === this.COIN) {
      this.coins--;
      this.totalScore += this.COIN;
      console.log(this.coins)
      if (this.coins === 0 && this.bigCoins === 0) {
        this.winGame();
      }
    }
    //Going in BIG coin
    if (val === this.BIG_COIN) {
      this.bigCoins--;
      this.totalScore += this.BIG_COIN;
      this.ghostEatableTimer = this.EAT_TIMER;
      this.changeEatable(this.ghostArr, true);
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

  //! Game methods

  changeEatable(ghostArr: Array<IGhost>, eat: boolean): void {
    for (let ghost of ghostArr) {
      if (eat) {
        ghost.eatable = true;
        ghost.marker = 20;
      } else {
        const markerObj = {
          'orange': 6,
          'pink': 7,
          'green': 8,
          'blue': 9,
>>>>>>> Stashed changes
        }
      }
    }
    return
  }

  pacmanMoved(x, y) {
    this.gameMap[x][y] = this.ROAD; //Replacing the pacman with black block
  }

<<<<<<< Updated upstream
  scoreUpdate(step) {
    if (step == this.EAT_COIN) {
      this.totalScore = this.totalScore + this.eatCoin;
    } else if (step == this.EAT_BIG_COIN) {
      //Todo big coin makes ghost eatable
      this.totalScore = this.totalScore + this.eatBigCoin;
=======
  ghostEatsPacman(): void {
    this.lives--;
    if (this.lives === 0) {
      clearInterval(this.interval);
      const dialogRef = this.dialog.open(PacmanDieComponent, {});
      dialogRef.componentInstance.onClose.subscribe((_) => {
        this.newGame();
      })
      this.resetPacman();
>>>>>>> Stashed changes
    }

  }

  winGame():void {
    clearInterval(this.interval);
    const winDialog = this.dialog.open(PacmanWinComponent, {})
    winDialog.componentInstance.onClose.subscribe((_) => {
      this.newGame();
    })
  }

  stopGame():void {
    //Todo:stop the interval

  }

  resetPacman():void {
    //When pacman dies once 

  }

  newGame():void {
    this.dialog.closeAll();
    delete this.gameMap;
    this.gameMap = this.pacService.map;
    let map = this.gameMap;

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
          } else if (this.gameMap[i][j] === 1) {
            this.coins++;
          } else if (this.gameMap[i][j] === 4) {
            this.bigCoins++;
          }
        }
      }
      this.dialog.closeAll();
      this.interval = setInterval(this.loop.bind(this), 200);
    })
  }

  //! Ghost moves;

  timeInterVal;
  ghostRun(gx, gy) {
    console.log('Ghost started run!');

    let moves: string[] = this.findOpenPath(gx, gy);

    let moveId = this.generateRandomNumber(0, moves.length);
    let move = moves[moveId];
    let oposite = this.findOpposite(move);

    if ((gx < this.initPacmanX) && (gy < this.initPacmanY)) {
      console.log('Pacman is now down-right of ghost');
      if (moves.includes('down') || moves.includes('right') && (move !== this.ghostLast)) {
        moves = moves.filter((el) => el === 'down' || el === 'right');
      }
    } else if ((gx <= this.initPacmanX) && (gy >= this.initPacmanY)) {
      //When pacman located down-left on map respect to ghost's current position
      if (moves.includes('left') || moves.includes('down') && (move !== this.ghostLast)) {
        moves = moves.filter((el) => el === 'down' || el === 'left');
      }
    } else if ((gx >= this.initPacmanX) && (gy <= this.initPacmanY)) {
      //When pacman located up-right on map respect to ghost's current position
      if (moves.includes('up') || moves.includes('right') && (move !== this.ghostLast)) {
        moves = moves.filter((el) => el === 'up' || el === 'right');
      }
    } else if ((gx >= this.initPacmanX) && (gy >= this.initPacmanY)) {
      //When pacman located up-left on map respect to ghost's current position
      if (moves.includes('left') || moves.includes('up') && (move !== this.ghostLast)) {
        moves = moves.filter((el) => el === 'up' || el === 'left');
      }
    }

    if (move === this.ghostLast) {
      moves = moves.filter((el) => el !== move);
      moveId = this.generateRandomNumber(0, moves.length);
      move = moves[moveId];
      oposite = this.findOpposite(move);
    }

    this.ghostMovement(move);
    this.ghostLast = oposite;
  }

  findOpenPath(gx, gy): string[] {
    const freeDirArr = [];
    if (this.gameMap[gx - 1][gy] !== this.WALL) {
      freeDirArr.push('up');
    }
    if (this.gameMap[gx][gy + 1] !== this.WALL) {
      freeDirArr.push('right');
    }
    if (this.gameMap[gx + 1][gy] !== this.WALL) {
      freeDirArr.push('down');
    }
    if (this.gameMap[gx][gy - 1] !== this.WALL) {
      freeDirArr.push('left');
    }

    return freeDirArr;
  }

  findOpposite(move) {
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

  ghostMovement(move) {
    if (move === 'up') {
      //move up
      this.moveUp();
    } else if (move === 'right') {
      //move right
      this.moveRight();
    } else if (move === 'down') {
      //move down
      this.moveDown();
    } else if (move === 'left') {
      //move left
      this.moveLeft();
    }
  }

  generateRandomNumber(min, max): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  prevCoin;
  ghostMoved(x, y) {
    this.gameMap[x][y] = this.prevCoin;
  }

  ghostMoveAction(dir, ghost) {
    const moveObj = {
      'up': {

      },
      'down': {

      },
      'right': {

      },
      'left': {

      }
    };
    const ghostsObj = {

    };
  }

  moveUp() {
    console.log('moveUp');
    if (this.ghostX == 0) {
      console.log('Ghost reach extreme up of map');
      this.moveDown();
    } else {

      let nextUp = this.gameMap[this.ghostX - 1][this.ghostY];
      if (nextUp == this.WALL) {
        this.ghostMeetWall = true;
      } else {
        this.ghostMoved(this.ghostX, this.ghostY);
        if (nextUp == this.EAT_COIN) {
          this.prevCoin = this.EAT_COIN;
        } else if (nextUp == this.EAT_BIG_COIN) {
          this.prevCoin = this.EAT_BIG_COIN;
        } else if (nextUp == this.PACMAN) {
          this.gameFinished = true;
          clearInterval(this.timeInterVal);
        } else {
          this.prevCoin = this.ROAD;
        }
        this.newPositionGhost(this.ghostX - 1, this.ghostY);

        this.ghostX--;
        this.ghostMeetWall = false;
      }
    }
  }

  moveRight() {
    console.log('moveRight');
    if (this.ghostY == this.gameMap[this.ghostY]['length'] - 1) {
      console.log('Ghost reach extreme right of map');
      this.moveLeft();
    } else {
      let nextUp = this.gameMap[this.ghostX][this.ghostY + 1];
      if (nextUp == this.WALL) {
        this.ghostMeetWall = true;

      } else {
        this.ghostMoved(this.ghostX, this.ghostY);
        if (nextUp == this.EAT_COIN) {
          this.prevCoin = this.EAT_COIN;
        } else if (nextUp == this.EAT_BIG_COIN) {
          this.prevCoin = this.EAT_BIG_COIN;
        } else if (nextUp == this.PACMAN) {
          this.gameFinished = true;
          clearInterval(this.timeInterVal);
        } else {
          this.prevCoin = this.ROAD;
        }
        this.newPositionGhost(this.ghostX, this.ghostY + 1);

        this.ghostY++;
        this.ghostMeetWall = false;
      }
    }
  }

  moveDown() {
    console.log('moveDown');
    if (this.ghostX == this.gameMap.length - 1) {
      console.log('Ghost reach extreme down of map');
      this.moveUp
    } else {

      let nextUp = this.gameMap[this.ghostX + 1][this.ghostY];

      if (nextUp == this.WALL) {
        this.ghostMeetWall = true;
      } else {
        this.ghostMoved(this.ghostX, this.ghostY);
        if (nextUp == this.EAT_COIN) {
          this.prevCoin = this.EAT_COIN;
        } else if (nextUp == this.EAT_BIG_COIN) {
          this.prevCoin = this.EAT_BIG_COIN;
        } else if (nextUp == this.PACMAN) {
          this.gameFinished = true;
          clearInterval(this.timeInterVal);
        } else {
          this.prevCoin = this.ROAD;
        }
        this.newPositionGhost(this.ghostX + 1, this.ghostY);

        this.ghostX++;
        this.ghostMeetWall = false;
      }
    }
  }

  moveLeft() {
    console.log('moveLeft');
    if (this.ghostY == 0) {
      console.log('Ghost reach extreme left of map');
      this.moveRight();
    } else {
      let nextUp = this.gameMap[this.ghostX][this.ghostY - 1];
      if (nextUp == this.WALL) {
        this.ghostMeetWall = true;
      } else {
        this.ghostMoved(this.ghostX, this.ghostY);
        if (nextUp == this.EAT_COIN) {
          this.prevCoin = this.EAT_COIN;
        } else if (nextUp == this.EAT_BIG_COIN) {
          this.prevCoin = this.EAT_BIG_COIN;
        } else if (nextUp == this.PACMAN) {
          this.gameFinished = true;
          clearInterval(this.timeInterVal);
        } else {
          this.prevCoin = this.ROAD;
        }
        this.newPositionGhost(this.ghostX, this.ghostY - 1);

        this.ghostY--;
        this.ghostMeetWall = false;
      }
    }
  }

  newPositionGhost(newX, newY): void {
    this.gameMap[newX][newY] = 3;
  }
}
