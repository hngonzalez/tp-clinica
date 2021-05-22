import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Paciente } from 'src/app/models/paciente';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reg-paciente',
  templateUrl: './reg-paciente.component.html',
  styleUrls: ['./reg-paciente.component.css']
})
export class RegPacienteComponent implements OnInit {
  formaPaciente!:FormGroup;

  constructor(private fb:FormBuilder,
              private auth:AuthService) {
    this.formaPaciente = this.fb.group({
      'nombre': ['', Validators.required],
      'apellido': ['', Validators.required],
      'edad': ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      'dni': ['', [Validators.required, this.onlyNumbers]],
      'os': ['', Validators.required],
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  private onlyNumbers(control:AbstractControl):null | object{
    const dni = <string>control.value
    
    if (!(dni.length <= 10)) {
      return {
        mayor: true
      }
    } else {
      if (!Number(dni)) {
        return {
          nonumerico: true
        }
      } else {
        return null;
      }
    }
  }

  enviarRegistro(){
    let nuevoUsuario = new Paciente;

    nuevoUsuario.nombre = this.formaPaciente.get('nombre')?.value;
    nuevoUsuario.apellido = this.formaPaciente.get('apellido')?.value;
    nuevoUsuario.mail = this.formaPaciente.get('email')?.value;
    nuevoUsuario.password = this.formaPaciente.get('password')?.value;

    this.auth.registrar(nuevoUsuario);
  }
}
