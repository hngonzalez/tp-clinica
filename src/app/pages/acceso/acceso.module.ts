import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccesoRoutingModule } from './acceso-routing.module';
import { SolicitarTurnoComponent } from './solicitar-turno/solicitar-turno.component';
import { TablaHorariosComponent } from './solicitar-turno/tabla-horarios/tabla-horarios.component';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { TablaMisTurnosComponent } from './mis-turnos/tabla-mis-turnos/tabla-mis-turnos.component';
import { MisTurnosPacienteComponent } from './mis-turnos-paciente/mis-turnos-paciente.component';
import { TablaTurnosPacienteComponent } from './mis-turnos-paciente/components/tabla-turnos-paciente/tabla-turnos-paciente.component';
import { TurnosAdministradorComponent } from './turnos-administrador/turnos-administrador.component';
import { MisTurnosEspecialistaComponent } from './mis-turnos-especialista/mis-turnos-especialista.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { TablaTurnosEspecialistaComponent } from './mis-turnos-especialista/components/tabla-turnos-especialista/tabla-turnos-especialista.component';
import { TurnoElegidoComponent } from './solicitar-turno/turno-elegido/turno-elegido.component';
import { AlergistaComponent } from './solicitar-turno/components/alergista/alergista.component';
import { EspecialistasPorEspecialidadComponent } from './solicitar-turno/components/especialistas-por-especialidad/especialistas-por-especialidad.component';
import { ListaPacientesComponent } from './pacientes/components/lista-pacientes/lista-pacientes.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SolicitarTurnoComponent,
    TablaHorariosComponent,
    MiPerfilComponent,
    TablaMisTurnosComponent,
    MisTurnosPacienteComponent,
    TablaTurnosPacienteComponent,
    TurnosAdministradorComponent,
    MisTurnosEspecialistaComponent,
    PacientesComponent,
    TablaTurnosEspecialistaComponent,
    TurnoElegidoComponent,
    AlergistaComponent,
    EspecialistasPorEspecialidadComponent,
    ListaPacientesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AccesoRoutingModule
  ]
})
export class AccesoModule { }
