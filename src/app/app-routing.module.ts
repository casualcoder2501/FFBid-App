import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { HomeComponent } from './home/home.component';
import { StationComponent } from './station/station.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AuthGuard} from './auth/auth.guard';
import {StationsResolverService} from './stations-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: LoginScreenComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        
        component: DashboardComponent
      },
      {
        path: 'station',
        component: StationComponent,
        resolve: {
          stations: StationsResolverService
        },
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
