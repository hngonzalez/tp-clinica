import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { MisTurnosEspecialistaComponent } from './mis-turnos-especialista/mis-turnos-especialista.component';
import { MisTurnosPacienteComponent } from './mis-turnos-paciente/mis-turnos-paciente.component';
import { MisTurnosComponent } from './mis-turnos/mis-turnos.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { AlergistaComponent } from './solicitar-turno/components/alergista/alergista.component';
import { SolicitarTurnoComponent } from './solicitar-turno/solicitar-turno.component';
import { TurnosAdministradorComponent } from './turnos-administrador/turnos-administrador.component';

const routes: Routes = [
  {path:'misturnos-especialista', component: MisTurnosEspecialistaComponent},
  {path:'misturnos-paciente', component: MisTurnosPacienteComponent},
  {path:'solicitar', component: SolicitarTurnoComponent},
  {path:'miperfil', component: MiPerfilComponent},
  {path:'alergista', component: AlergistaComponent},
  {path:'pacientes', component: PacientesComponent},
  {path:'turnos', component: TurnosAdministradorComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccesoRoutingModule { }