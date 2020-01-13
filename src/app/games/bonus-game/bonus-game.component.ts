import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bonus-game',
  templateUrl: './bonus-game.component.html',
  styleUrls: ['./bonus-game.component.css']
})
export class BonusGameComponent implements OnInit {
  counter: any = 0;
  table: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  indexes: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  history: string[] = [];
  nextBoxes: string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.rulesHandler();
  }

  rulesHandler() {
    const btn = () => document.getElementById('descrBtn');
    if (btn().textContent === 'HIDE RULES') {
      btn().textContent='SHOW RULES';
      document.getElementById('description').style.display='none';
    }else{
      btn().textContent='HIDE RULES';
      document.getElementById('description').style.display='block';
    }
  }

  addNum(e, letter, num) {
    const box = e.target;
    const boxId: string = box.id;
    if (!box.textContent) {
      if (this.nextBoxes.includes(boxId) || this.counter === 0) {
        this.counter++;
        const h4 = document.createElement('h4');
        h4.textContent = this.counter;
        box.appendChild(h4);

        const next: string[] = this.findNext(letter, num);
        this.clearBoxes();
        this.markNext(next);

        this.history.push(letter + num);
        if (this.nextBoxes.length === 0) {
          alert('You lost, noob!');
          this.refresh();
        }
      }
    }
  }

  findNext(l, n): string[] {
    const lettersAsNums: object = {
      'A': 1,
      'B': 2,
      'C': 3,
      'D': 4,
      'E': 5,
      'F': 6,
      'G': 7,
      'H': 8,
      'I': 9,
      'J': 10,
    }
    const numsAsLetters: object = {
      1: 'A',
      2: 'B',
      3: 'C',
      4: 'D',
      5: 'E',
      6: 'F',
      7: 'G',
      8: 'H',
      9: 'I',
      10: 'J',
    }
    let next = [];
    const firstNum: number = n - 2;
    const secondNum: number = n - 1;
    const thirdNum: number = Number(n) + 1;
    const fourthNum: number = Number(n) + 2;

    const firstLetter: string = numsAsLetters[lettersAsNums[l] - 2];
    const secondLetter: string = numsAsLetters[lettersAsNums[l] - 1];
    const thirdLetter: string = numsAsLetters[lettersAsNums[l] + 1];
    const fourthLetter: string = numsAsLetters[lettersAsNums[l] + 2];

    next.push(`${secondLetter}?${firstNum}`);
    next.push(`${firstLetter}?${secondNum}`);
    next.push(`${firstLetter}?${thirdNum}`);
    next.push(`${secondLetter}?${fourthNum}`);
    next.push(`${thirdLetter}?${firstNum}`);
    next.push(`${thirdLetter}?${fourthNum}`);
    next.push(`${fourthLetter}?${secondNum}`);
    next.push(`${fourthLetter}?${thirdNum}`);

    next = next.filter((el) => {
      const [l, n] = el.split('?');
      if (isValid(l, n)) {
        return l + n;
      }
    }).map(el => el.split('').filter(l => l !== '?').join(''));

    return next;

    function isValid(letter, num) {
      if (!letter || letter === 'undefined') {
        return false;
      }
      if (num <= 0 || num > 10) {
        return false;
      }
      return true;
    }
  }

  undo() {
    this.counter--;

    if (this.counter < 0) {
      this.counter++;
      return;
    }

    const id = this.history.pop();
    const x = this.history.pop();
    const el = document.getElementById(id);
    el.innerHTML = '';


    if (this.counter <= 0) {
      Array.from(document.querySelectorAll('td'))
        .forEach((el) => {
          el.removeAttribute('style');
        })
      return
    }

    const l = x.split('').splice(0, 1).join('');
    const n = x.split('').splice(1).join('');
    const next: any = this.findNext(l, n);

    this.clearBoxes();
    this.markNext(next);
    this.history.push(x);
  }

  refresh() {
    this.counter = 0;
    Array.from(document.querySelectorAll('td'))
      .forEach((el) => {
        el.innerHTML = '';
      })

    this.history = this.history.filter((el) => el === null);
    this.clearBoxes();
  }

  markNext(next) {
    next.forEach((id) => {
      const box = () => document.getElementById(id);
      if (!box().textContent) {
        box().style.backgroundColor = 'red';
        this.nextBoxes.push(id);
      }
    })
  }

  clearBoxes() {
    this.nextBoxes.forEach((id) => {
      const box = () => document.getElementById(id);
      box().removeAttribute('style');
    })
    this.nextBoxes = [];
  }
}
