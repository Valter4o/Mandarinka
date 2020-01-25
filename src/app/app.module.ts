import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { environment } from "../environments/environment";

import { AppRoutingModule } from "./app-routing.module";


import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AngularMaterialModule } from './dependencies/angular-material.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from "./app.component";

import { NavbarComponent } from "./common/navbar/navbar.component";
import { FooterComponent } from "./common/footer/footer.component";
import { HomeComponent } from "./home/home.component";

import { GamesModule } from "./games/games.module";

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

import { ReactiveFormsModule,FormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';

import { AuthService } from "./auth/authentication.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { ErrorComponent } from './auth/popups/error/error.component';
import { IgniteUi } from "./dependencies/igniteui.module";



@NgModule({
  declarations: [AppComponent, NavbarComponent, FooterComponent, HomeComponent, LoginComponent, RegisterComponent, ForgotPasswordComponent, VerifyEmailComponent, ErrorComponent],
  imports: [
    IgniteUi,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    BrowserModule,
    AppRoutingModule,
    GamesModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [AuthService,AngularFirestore,AngularFireAuth],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
