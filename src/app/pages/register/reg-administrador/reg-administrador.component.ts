import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Administrador } from 'src/app/models/administrador';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reg-administrador',
  templateUrl: './reg-administrador.component.html',
  styleUrls: ['./reg-administrador.component.css']
})
export class RegAdministradorComponent implements OnInit {
  formaAdministrador!:FormGroup;
  imgAdministrador!:string;

  constructor(private fb:FormBuilder,
              private auth:AuthService) { 
    this.formaAdministrador = this.fb.group({
      'nombre': ['', Validators.required],
      'apellido': ['', Validators.required],
      'edad': ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      'dni': ['', [Validators.required, this.onlyNumbers]],
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
    this.imgAdministrador = '../../../../assets/img/doctor.svg';
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
    let nuevoUsuario = new Administrador;
    let nuevaEspecialidad = '';

    nuevoUsuario.nombre = this.formaAdministrador.get('nombre')?.value;
    nuevoUsuario.apellido = this.formaAdministrador.get('apellido')?.value;
    nuevoUsuario.mail = this.formaAdministrador.get('email')?.value;
    nuevoUsuario.password = this.formaAdministrador.get('password')?.value;
    nuevoUsuario.edad = this.formaAdministrador.get('edad')?.value;
    nuevoUsuario.dni = this.formaAdministrador.get('dni')?.value;
    
    this.auth.registrar(nuevoUsuario, 'A', nuevaEspecialidad);
  }
}
