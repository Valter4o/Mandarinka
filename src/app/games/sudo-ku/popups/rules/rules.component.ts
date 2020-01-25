import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "rules",
  templateUrl: "rules.html",
  styleUrls:["./rules.component.css"]
})
export class Rules {
  constructor(
    public dialogRef: MatDialogRef<Rules>,
  ) {} 
}
