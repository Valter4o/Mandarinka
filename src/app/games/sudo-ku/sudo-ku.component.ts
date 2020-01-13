import { Component, OnInit, HostListener } from "@angular/core";
import { Box } from "./interfaces/box";
import { getRandGame } from "./games";

@Component({
  selector: "app-sudo-ku",
  templateUrl: "./sudo-ku.component.html",
  styleUrls: ["./sudo-ku.component.css"]
})
export class SudoKuComponent implements OnInit {
  private game: Array<number | string[]> = [
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

  private currentBox: Box = {
    boxRef: "",
    columnInd: 0,
    rowInd: 0
  };

  @HostListener("document:keypress", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    const key = +event.key;
    const box = this.currentBox;

    if (key > 0 && key < 10) {
      if (box.boxRef) {
        this.game[box.rowInd][box.columnInd] = String(key);
      }
    }

    if (key === 0) {
      if (this.currentBox.boxRef) {
        this.game[box.rowInd][box.columnInd] = "";
      }
    }
    this.currentBox.boxRef.removeAttribute("style");
  }

  constructor() {}

  ngOnInit() {
    this.showDetails();
  }

  getLevel() {
    this.game = getRandGame();
  }

  submitLevel() {
    console.log(this.game);
  }

  check() {
    let isReady: boolean = true;
    let isDone: boolean = true;

    for (let row of this.game) {
      if ((row as string[]).includes("")) {
        isReady = false;
        isDone = false;

        alert("You are not done yet!");
      }
    }
    //checking rows
    if (isReady) {
      for (let row of this.game) {
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
          const el = this.game[i][j];
          arr.push(el);
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
            const el = this.game[i][j];
            arr1.push(el);
          }

          for (let j = 3; j < 6; j++) {
            const el = this.game[i][j];
            arr2.push(el);
          }

          for (let j = 6; j < 9; j++) {
            const el = this.game[i][j];
            arr3.push(el);
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
      alert("You killed it man/ma'am");
    } else if (isDone) {
      alert("You have a mistake!");
    }
  }

  markBox(trI, tdI, box) {
    this.currentBox["rowInd"] = trI;
    this.currentBox["columnInd"] = tdI;
    this.currentBox["boxRef"] = box;
    box.style.backgroundColor = "skyblue";
  }

  showDetails() {
    const rules = () => document.getElementById("rules");
    const btn = () => document.getElementById("rulesBtn");
    if (btn().textContent === "SHOW RULES") {
      btn().textContent = "HIDE RULES";
      rules().style.display = "block";
    } else {
      btn().textContent = "SHOW RULES";
      rules().style.display = "none";
    }
  }
}
