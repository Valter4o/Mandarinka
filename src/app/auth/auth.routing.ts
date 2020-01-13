import { HelpComponent } from './help/help.component'
import { RegisterComponent } from './register/register.component'
import { LoginComponent } from './login/login.component'
import { Routes, RouterModule } from '@angular/router'
import { ModuleWithProviders, NgModule } from '@angular/core'

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'help', component: HelpComponent },
]

@NgModule({
  imports:[
    RouterModule.forChild(routes)
  ],
  exports:[
    AuthRoutingModule
  ]
})
export class AuthRoutingModule{ }