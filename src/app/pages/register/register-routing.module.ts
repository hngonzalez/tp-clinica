import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegAdministradorComponent } from './reg-administrador/reg-administrador.component';
import { RegEspecialistaComponent } from './reg-especialista/reg-especialista.component';
import { RegOkPacienteComponent } from './reg-ok-paciente/reg-ok-paciente.component';
import { RegPacienteComponent } from './reg-paciente/reg-paciente.component';

const routes: Routes = [
  {path:'paciente', component: RegPacienteComponent},
  {path:'especialista', component: RegEspecialistaComponent},  
  {path:'administrador', component: RegAdministradorComponent},  
  {path:'regpaok', component: RegOkPacienteComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
