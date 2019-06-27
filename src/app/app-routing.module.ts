import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { HomeComponent } from './home/home.component';
import { StationComponent } from './station/station.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: LoginScreenComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'station',
        component: StationComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
