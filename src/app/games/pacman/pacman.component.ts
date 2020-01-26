import { Component, OnInit, HostListener } from '@angular/core';
import { PacmanService } from './services/pacman.service';

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
  ghostRunning: boolean = false;
  ghostCrashed: boolean = false;
  ghostFreeMove: number; // 1--> Up, 2-->Right, 3--> Down, 4--> Left

  constructor(private services: PacmanService) {
    document.title = this.title;
    this.gameMap = services.map;
  }


  moveDir(code) {
    const next = {
      '37': this.initPacmanY - 1,
      '38': this.initPacmanX - 1,
      '39': this.initPacmanY + 1,
      '40': this.initPacmanX + 1,
    }

    const nextFaceDir = {
      '37': 4,
      '38': 1,
      '39': 2,
      '40': 3,
    }

    const finalMove = {
      '37': () => this.initPacmanY -= 1,
      '38': () => this.initPacmanX -= 1,
      '39': () => this.initPacmanY += 1,
      '40': () => this.initPacmanX += 1,
    }

    let nextDirId = next[code];

    const nextBox = code === 38 || code === 40 ?
      this.gameMap[nextDirId][this.initPacmanY] :
      this.gameMap[this.initPacmanX][nextDirId]


    if (nextBox === this.WALL) {
      console.log('STENAAA')
    } else {
      //Change face 
      this.scoreUpdate(nextBox);//For updating score
      this.pacmanMove = nextFaceDir[code];//Setting pacman's face towards the dir he is going
      this.pacmanMoved(this.initPacmanX, this.initPacmanY); //Replacing pacman box with nothing

      if (nextDirId === -1) {
        //Reached end map left or up
        console.log('Mestq se');
        if (code === 38) {
          this.initPacmanX = this.gameMap.length - 1;
        } else if (code === 37) {
          this.initPacmanY = this.gameMap[this.initPacmanY]['length'] - 1;//Setting pacman's new position to right end of map
        }

      } else if (nextDirId === this.gameMap.length) {
        //Reached down end
        this.initPacmanX = 0;
      } else if (nextDirId === this.gameMap[0].length && code === 39) {
        //Reached right end
        this.initPacmanY = 0;
      } else {
        finalMove[code]();
      }

      if (!this.gameFinished) {
        console.log(this.initPacmanX, this.initPacmanY);
        this.gameMap[this.initPacmanX][this.initPacmanY] = this.PACMAN;
      }
    }
  }


  ngOnInit() {
    let map = this.gameMap;
    //Initial pacman coordinate (20,8)

    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i]['length']; j++) {
        if (map[i][j] === 5) {
          this.initPacmanX = i;
          this.initPacmanY = j;
        }
      }
    }
  }


  ngAfterViewInit() {
    this.ghostRunning = true;
    this.ghostRun();
  }



  @HostListener('window:keydown', ['$event'])
  controlKeyboardEvent(event) {
    event.preventDefault();
    const code = event.keyCode;

    if (code === 37 || code === 38 || code === 39 || code === 40) {

      this.moveDir(code);
    }
    return
  }

  pacmanMoved(x, y) {
    this.gameMap[x][y] = this.ROAD; //Replacing the pacman with black block
  }

  scoreUpdate(step) {
    if (step == this.EAT_COIN) {
      this.totalScore = this.totalScore + this.eatCoin;
    } else if (step == this.EAT_BIG_COIN) {
      //Todo big coin makes ghost eatable
      this.totalScore = this.totalScore + this.eatBigCoin;
    }

  }

  timeInterVal; movement;
  ghostRun() {
    if (!this.ghostRunning) {
      console.log('Ghost started run!');
      for (let i = 0; i < this.gameMap.length; i++) {
        for (let j = 0; j < this.gameMap[i]['length']; j++) {
          if (this.gameMap[i][j] == 3) {
            this.ghostX = i;
            this.ghostY = j;
          }
        }
      }

      console.log('Ghost located at : GameMap[' + this.ghostX + '][' + this.ghostY + ']=' + this.gameMap[this.ghostX][this.ghostY]);
      let wallMeetRight = false;
      this.timeInterVal = setInterval(() => {

        //1--> UP, 2--> Right, 3--> Down, 4--> Left
        //Control of ghost's movement

        //First of all we need to find in what zone Pacman sitting right now respect to Ghost position

        if ((this.ghostX < this.initPacmanX) && (this.ghostY < this.initPacmanY)) {
          //When pacman located down-right on map respect to ghost's current position
          console.log('Pacman is now down-right of ghost');

          // G--> (4,2) , P--> (18,14)
          if (this.gameMap[this.ghostX + 1][this.ghostY] == this.WALL) {
            //When down step of ghost is blocked
            if (this.gameMap[this.ghostX][this.ghostY + 1] !== this.WALL && !wallMeetRight) {
              this.moveRight();
            } else {
              this.moveLeft();
              wallMeetRight = true;
            }
          } else {
            this.moveDown();
            wallMeetRight = false;
          }

        } else if ((this.ghostX < this.initPacmanX) && (this.ghostY > this.initPacmanY)) {
          //When pacman located down-left on map respect to ghost's current position
          console.log('Pacman is now down-left of ghost');

        } else if (this.ghostY == this.initPacmanY) {
          //When ghost and pacman are on same line vertically on map
          console.log('Ghost and Pacman on line vertically!!');
          if (this.ghostX < this.initPacmanX) {
            console.log('Pacman is now down side of ghost vertically');

          } else if (this.ghostX > this.initPacmanX) {
            console.log('Pacman is now up side of ghost vertically');

          }
        }

      }, 200);

    }

  }

  findOpenPath() {
    let a: Array<any> = [];
  }

  ghostMovement(move) {
    if (move == 1) {
      //move up
      this.moveUp();
    } else if (move == 2) {
      //move right
      this.moveRight();
    } else if (move == 3) {
      //move down
      this.moveDown();
    } else if (move == 4) {
      //move left
      this.moveLeft();
    }
  }

  prevCoin;
  ghostMoved(x, y) {
    this.gameMap[x][y] = this.prevCoin;
  }

  moveUp() {
    console.log('moveUp');
    if (this.ghostX == 0) {
      console.log('Ghost reach extreme up of map');
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

  newPositionGhost(newX, newY) {
    this.gameMap[newX][newY] = 3;
  }

  generateRandomNumber(t) {
    var flag = true;
    var i = 1;
    var tmp;
    while (i > 0) {
      tmp = Math.floor((Math.random() * 4) + 1);
      if (tmp != t) {
        break;
      }
      i++;
    }
    return tmp;

  }

  findUnblockedWay(gx, gy) {
    if (this.gameMap[gx - 1][gy] !== 0) {
      //Check up
      return 1;
    } else if (this.gameMap[gx][gy + 1] !== 0) {
      //Check right
      return 2;
    } else if (this.gameMap[gx + 1][gy] !== 0) {
      //Check down
      return 3;
    } else if (this.gameMap[gx][gy - 1] !== 0) {
      //Check left
      return 4;
    }
  }

}
