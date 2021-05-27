import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Especialista } from 'src/app/models/especialista';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reg-especialista',
  templateUrl: './reg-especialista.component.html',
  styleUrls: ['./reg-especialista.component.css']
})
export class RegEspecialistaComponent implements OnInit {
  formaEspecialista!:FormGroup;
  imgEspecialista!:string;
  listaEspecialidades:any;

  constructor(private fb:FormBuilder,
              private auth:AuthService) { 
    this.formaEspecialista = this.fb.group({
      'nombre': ['', Validators.required],
      'apellido': ['', Validators.required],
      'edad': ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      'dni': ['', [Validators.required, this.onlyNumbers]],
      'especialidad': ['', Validators.required],
      'nuevaEspecialidad': ['N', Validators.required],
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
    this.imgEspecialista = '../../../../assets/img/doctor.svg';
  }

  ngOnInit(): void {
    this.listaEspecialidades = this.auth.listaEspecialidades();
    //console.log(this.listaEspecialidades);
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
    let nuevoUsuario = new Especialista;
    let nuevaEspecialidad = '';

    nuevoUsuario.nombre = this.formaEspecialista.get('nombre')?.value;
    nuevoUsuario.apellido = this.formaEspecialista.get('apellido')?.value;
    nuevoUsuario.mail = this.formaEspecialista.get('email')?.value;
    nuevoUsuario.password = this.formaEspecialista.get('password')?.value;

    if (this.formaEspecialista.get('especialidad')?.value == '1') {
      nuevoUsuario.especialidad = this.formaEspecialista.get('nuevaEspecialidad')?.value
      nuevaEspecialidad = 'S';
    }
    else {
      nuevoUsuario.especialidad = this.formaEspecialista.get('especialidad')?.value
      nuevaEspecialidad = 'N';
    }
    
    this.auth.registrar(nuevoUsuario, 'E', nuevaEspecialidad);
  }
}
