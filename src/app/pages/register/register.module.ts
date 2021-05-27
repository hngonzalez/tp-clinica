import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegPacienteComponent } from './reg-paciente/reg-paciente.component';
import { RegEspecialistaComponent } from './reg-especialista/reg-especialista.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegOkPacienteComponent } from './reg-ok-paciente/reg-ok-paciente.component';
import { RegOkEspecialistaComponent } from './reg-ok-especialista/reg-ok-especialista.component';


@NgModule({
  declarations: [
    RegPacienteComponent,
    RegEspecialistaComponent,
    RegOkPacienteComponent,
    RegOkEspecialistaComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    ReactiveFormsModule
  ]
})
export class RegisterModule { }
