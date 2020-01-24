import {
    IgxNavbarModule,
    IgxIconModule, 
    IgxButtonModule,
} from "igniteui-angular";
import { NgModule } from "@angular/core";

@NgModule({
    imports: [
        IgxNavbarModule,
        IgxIconModule,
        IgxButtonModule,
    ],
    exports: [
        IgxNavbarModule,
        IgxIconModule,
        IgxButtonModule,
    ],
})
export class IgniteUi { }