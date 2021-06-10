import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireStorage } from '@angular/fire/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { TablaUsuariosComponent } from './pages/usuarios/components/tabla-usuarios/tabla-usuarios.component';
import { NuevosUsuariosComponent } from './pages/usuarios/components/nuevos-usuarios/nuevos-usuarios.component';
import { TablaMisTurnosComponent } from './pages/acceso/mis-turnos/tabla-mis-turnos/tabla-mis-turnos.component';
import { AccesorapidoComponent } from './components/accesorapido/accesorapido.component';
import { ComponentsComponent } from './pÃages/acceso/pacientes/components/components.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    MenuComponent,
    UsuariosComponent,
    TablaUsuariosComponent,
    NuevosUsuariosComponent,
    AccesorapidoComponent,
    ComponentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
