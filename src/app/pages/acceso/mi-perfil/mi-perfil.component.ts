import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TurnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {
  disponibilidadHoraria!:any;
  dispoHoraria!:any;
  listaEspecialidades!:any;
  graboDatos!:boolean;

  /* Para datos del usuario */
  dataUserNombre:string;
  dataUserApellido:string;
  dataUserMail:string;
  dataUserUltimaInicioSesion:string;
  dataUserHabilitado:string;
  dataUserTipo!:string;

  constructor(private turnosService:TurnosService,
              private auth:AuthService) { 
    this.disponibilidadHoraria = [
      '8:00','9:00','10:00','11:00'
  ]
    this.graboDatos = false; 
    this.dispoHoraria = new Array();
    this.dataUserNombre = String(localStorage.getItem('nombre'));
    this.dataUserApellido = String(localStorage.getItem('apellido'));
    this.dataUserMail = String(localStorage.getItem('mail'));
    this.dataUserUltimaInicioSesion = String(localStorage.getItem('lastSignInTime'));
    this.dataUserHabilitado = String(localStorage.getItem('habilitado'));
    
    switch (String(localStorage.getItem('tipo'))) {
      case 'P':
        this.dataUserTipo = 'Paciente'
        break;
      case 'E':
        this.dataUserTipo = 'Especialista'
        break;
      case 'A':
        this.dataUserTipo = 'Administrador'
        break;
      default:
        break;
    }

  }

  ngOnInit(): void {
    this.listaEspecialidades = this.auth.listaEspecialidades();
    console.log(localStorage);
  }

  actualizarInfo() {
    let dato = (<HTMLSelectElement>document.getElementById('selEspecialidad')).value;
    let fecha = (<HTMLInputElement>document.getElementById('dateInput')).value;

    for (let i = 0; i < this.disponibilidadHoraria.length; i++) {
      //const element = this.disponibilidadHoraria[i];
      let stateChk = (<HTMLInputElement>document.getElementById('chk'+i)).checked;

      if (stateChk) {
        let valChk = (<HTMLInputElement>document.getElementById('chk'+i)).value;

        //console.log(valChk);
        this.dispoHoraria.push(valChk);
        //console.log(this.dispoHoraria)
      }
      
    }

    this.turnosService.actualizoDisponibilidad(fecha,this.dispoHoraria,dato)
    this.graboDatos = true;
  }

  habilitoAlgo() {
    
  }
}
