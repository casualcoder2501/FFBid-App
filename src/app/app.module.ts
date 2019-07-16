import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastModule } from './toast/toast.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { ModalComponent } from './modal/modal.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { DrawerComponent } from './drawer/drawer.component';
import { StationComponent } from './station/station.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroComponent } from './hero/hero.component';
import {httpInterceptorProviders} from './http-interceptors/index';
import { CreateStationComponent } from './create-station/create-station.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginScreenComponent,
    ModalComponent,
    HomeComponent,
    DrawerComponent,
    StationComponent,
    DashboardComponent,
    HeroComponent,
    CreateStationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ToastModule,
    HttpClientModule
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
