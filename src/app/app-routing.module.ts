import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterpageComponent } from './pages/register/registerpage/registerpage.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'regis', component: RegisterpageComponent},
  {path: 'register', loadChildren: () => 
                      import('./pages/register/register.module').then(m => m.RegisterModule) },
  {path: 'acceso', loadChildren: () => 
                    import('./pages/acceso/acceso.module').then(m => m.AccesoModule) },
  {path: 'usuarios', component: UsuariosComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
