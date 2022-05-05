import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './core/guards/admin.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { CreateAccommodationComponent } from './create-accommodation/create-accommodation.component';
import { HomePageComponent } from './home-page/home-page.component';
import { InformationPageComponent } from './information-page/information-page.component';
import { ListAccommodationsComponent } from './list-accommodations/list-accommodations.component';
import { ListReservedAccommodationsComponent } from './list-reserved-accommodations/list-reserved-accommodations.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ManageAccommodationsComponent } from './manage-accommodations/manage-accommodations.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { ReserveAccommodationComponent } from './reserve-accommodation/reserve-accommodation.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'search', component: ListAccommodationsComponent},
  {path: 'accommodations/:accommodationId', component: ReserveAccommodationComponent, canActivate: [AuthGuard]},
  {path: 'new-accommodation', component: CreateAccommodationComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'reserved-accommodations', component: ListReservedAccommodationsComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'manage-accommodations', component: ManageAccommodationsComponent, canActivate: [AuthGuard]},
  {path: 'information', component: InformationPageComponent},
  {path: 'auth/login', component: LoginPageComponent},
  {path: 'auth/register', component: RegisterPageComponent},
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
