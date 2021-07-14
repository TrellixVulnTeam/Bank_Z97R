import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { BankDetailComponent } from './Components/bank-detail/bank-detail.component';
import { PersonalDetailComponent } from './Components/personal-detail/personal-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from 'src/Services/LoginService';
import { HttpClientModule } from '@angular/common/http';
import { ApiRoutesService } from 'src/Services/apiRoutesService';
import { SessionService } from 'src/Services/session.service';

import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { PersonalDetailService } from 'src/Services/personal-detail.service';
import { BankAccountService } from 'src/Services/bank-account.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BankDetailComponent,
    PersonalDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    HttpClientModule,
    FormsModule,
    ReactiveFormsModule, 

    MatFormFieldModule,
    BrowserAnimationsModule,
    MatInputModule
  ],
  providers: [LoginService, ApiRoutesService, SessionService, PersonalDetailService, BankAccountService],
  bootstrap: [AppComponent]
})
export class AppModule { }
