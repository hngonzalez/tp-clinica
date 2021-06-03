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
    TablaTurnosEspecialistaComponent
  ],
  imports: [
    CommonModule,
    AccesoRoutingModule
  ]
})
export class AccesoModule { }
