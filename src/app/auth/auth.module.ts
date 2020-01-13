import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HelpComponent } from './help/help.component';
import { AuthRoutingModule } from './auth.routing';



@NgModule({
  declarations: [LoginComponent, RegisterComponent, HelpComponent],
  imports: [
    AuthRoutingModule,
    CommonModule
  ]
})
export class AuthModule { }
