import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankDetailComponent } from './Components/bank-detail/bank-detail.component';
import { LoginComponent } from './Components/login/login.component';
import { PersonalDetailComponent } from './Components/personal-detail/personal-detail.component';

const routes: Routes = [
  { path:'', component: LoginComponent},
  { path:'personal-detail', component: PersonalDetailComponent},
  { path:'bank-detail', component: BankDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
