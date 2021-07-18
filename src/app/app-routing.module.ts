import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutoGuard } from 'src/Services/auto-guard.service';
import { BankDetailComponent } from './Components/bank-detail/bank-detail.component';
import { LoginComponent } from './Components/login/login.component';
import { PersonalDetailComponent } from './Components/personal-detail/personal-detail.component';

const routes: Routes = [
  { path:'', component: LoginComponent},
  { path:'personal-detail', component: PersonalDetailComponent, canActivate: [AutoGuard]},
  { path:'bank-detail', component: BankDetailComponent, canActivate: [AutoGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
