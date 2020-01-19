import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "rules",
  templateUrl: "rules.html"
})
export class Rules {
  constructor(
    public dialogRef: MatDialogRef<Rules>,
  ) {} 
}
