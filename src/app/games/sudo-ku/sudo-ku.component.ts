import { Component, OnInit, HostListener } from "@angular/core";
import { ICell } from "./interfaces/cell";
import { ICellLocation } from "./interfaces/CellLocation";
import { MatDialog } from "@angular/material/dialog";
import { Rules } from "./popups/rules/rules.component";
import { NotfinishedComponent } from "./popups/game/notfinished/notfinished.component";
import { WonComponent } from './popups/game/finished/won/won.component';
import { LostComponent } from './popups/game/finished/lost/lost.component';
import { SudokuServiceService } from "../services/sudoku-service.service";

@Component({
  selector: "app-sudo-ku",
  templateUrl: "./sudo-ku.component.html",
  styleUrls: ["./sudo-ku.component.css"]
})
export class SudoKuComponent implements OnInit {
  private game: Array<Array<ICell>> = [
    [{}, {}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}]
  ];
  private values: Array<string[] | number[]> = [
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""]
  ];
  private markedBox: ICellLocation = {};
  public creator: string;
  private gameDbId: string;

  constructor(
    public dialog: MatDialog,
    private service: SudokuServiceService
  ) {
  }

  ngOnInit() {
    this.showDetails();
  }

  //ADDING NUMBER

  markBox(trI: number, tdI: number, cell: ICell) {
    if (this.markedBox.columnId) {
      this.game[this.markedBox.rowId][this.markedBox.columnId].marked = false;
    }
    if (!cell.static) {
      this.game[trI][tdI].marked = true;
      this.markedBox.rowId = trI;
      this.markedBox.columnId = tdI;
    }
  }

  @HostListener("document:keypress", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    const key = +event.key;
    if (key >= 0 && key < 10) {
      if (this.markedBox.hasOwnProperty("rowId")) {
        const box = this.game[this.markedBox.rowId][this.markedBox.columnId];

        if (key === 0) {
          box.value = "";
          this.values[this.markedBox.rowId][this.markedBox.columnId] = '';
        } else {
          box.value = String(key);
          this.values[this.markedBox.rowId][this.markedBox.columnId] = String(
            key
          );
        }

        box.marked = false;
        this.game[this.markedBox.rowId][this.markedBox.columnId] = box;
        delete this.markedBox.columnId;
        delete this.markedBox.rowId;
      }
    }
  }

  //DETAILS

  showDetails(): void {
    const dialogRef = this.dialog.open(Rules, {});
  }


  //GENERATE LEVEL

  getLevel() {
    const received = this.getRandomGame();
    this.game = received;
    const valuesOnly = received.map(arr =>
      arr.map(cell => (cell.value ? cell.value : ""))
    );
    (this.values as any) = valuesOnly;
  }

  getRandomGame(): Array<Array<ICell>> {

    this.service.getGame().subscribe(data => {
      const id = getRandomIntInclusive(0, data.length - 1);
      const gameData: any = data[id].payload.doc.data();
      const game: Array<Array<ICell>> = JSON.parse(gameData.game);
      const dbGameId = data[id].payload.doc.id;
      const username = gameData.username;
      this.creator = username;

      if (dbGameId === this.gameDbId) {
        this.getRandomGame();
      } else {
        this.game = game;
        this.gameDbId = dbGameId;
      }
    })
    return;

    function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }

  //SUBMIT

  submitLevel() {
    const game: Array<Array<ICell>> = this.game;

    game.forEach(row => {
      row.map(cell => cell.value ? cell.static = true : cell);
    });

    this.service.postGame(game, 'Valter')

    this.clear();
  }

  //CLEAR

  clear() {
    this.creator = '';
    this.game = [
      [{}, {}, {}, {}, {}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}, {}, {}, {}, {}]
    ];
  }

  //KILL IT

  check() {
    let isReady: boolean = true;
    let isDone: boolean = true;

    for (let row of this.values) {
      if ((row as string[]).includes("")) {
        isReady = false;
        isDone = false;

        this.dialog.open(NotfinishedComponent, {});
        break;
      }
    }

    //checking rows
    if (isReady) {
      for (let row of this.values) {
        const a = new Set(row as string[]);
        if (a.size !== (row as string[]).length) {
          isReady = false;
          break;
        }
      }
    }

    //check colums

    if (isReady) {
      for (let i = 0; i < 9; i++) {
        const arr: string[] = [];

        for (let j = 0; j < 9; j++) {
          const el = this.values[i][j];
          arr.push(el as any);
        }

        isReady = new Set(arr as string[]).size === (arr as string[]).length;
      }
    }
    //check boxes

    if (isReady) {
      for (let x: number = 0; x <= 6; x += 3) {
        const start: number = x;
        const end: number = x + 3;
        for (let i = start; i < end; i++) {
          const arr1: string[] = [];
          const arr2: string[] = [];
          const arr3: string[] = [];

          for (let j = 0; j < 3; j++) {
            const el = this.values[i][j];
            arr1.push(el as any);
          }

          for (let j = 3; j < 6; j++) {
            const el = this.values[i][j];
            arr2.push(el as any);
          }

          for (let j = 6; j < 9; j++) {
            const el = this.values[i][j];
            arr3.push(el as any);
          }

          isReady =
            new Set(arr1 as string[]).size === (arr1 as string[]).length &&
            new Set(arr2 as string[]).size === (arr2 as string[]).length &&
            new Set(arr3 as string[]).size === (arr3 as string[]).length;
        }
        if (!isReady) {
          break;
        }
      }
    }

    if (isReady && isDone) {
      this.dialog.open(WonComponent, {});
    } else if (isDone) {
      this.dialog.open(LostComponent, {});
    }
  }
}
