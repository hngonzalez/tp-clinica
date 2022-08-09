import { style, transition, animate, state, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TurnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.css'],
  animations: [
    trigger('enterState', [
      state('void', style({
        transform: 'translateY(-100%)',
        opacity:0
      })),
      transition(':enter',[
        animate(300,style({
          transform:'translateY(0)',
          opacity:1
        }))
      ])
    ])
  ]
})
export class SolicitarTurnoComponent implements OnInit {
  listaEspecialidades!:any;
  listaEspecialistas!:any;
  listaTurnosRapidos!:any;
  listoSelects!:boolean;
  datito1!:any;
  datito2!:any;
  datito3!:any;
  clickeado:boolean;
  espeElegido!:string;
  espeElegida!:string;
  
  constructor(private auth:AuthService,
              private servTurnos:TurnosService,
              private router:Router) { 
    this.listaEspecialistas = "";
    this.listoSelects = false;
    this.clickeado = false;
    this.espeElegido = "";
    this.espeElegida = "";
  }

  ngOnInit(): void {
    this.listaEspecialidades = this.auth.listaEspecialidades();
  }

  buscoEspecialista() {
    this.datito1 = (<HTMLSelectElement>document.getElementById('selEspecialidad')).value;
    //console.log(dato);
    this.listaEspecialistas = this.auth.listaEspecialistas(this.datito1);
  }

  habilitoAlgo(){
    this.datito2 = (<HTMLSelectElement>document.getElementById('selEspecialista')).value;
    this.listoSelects = true;    
    this.datito3 = this.servTurnos.consultaTurnos(this.datito1,this.datito2);
  }

  habilito(especialidad:string) {
    this.clickeado = true;
    this.espeElegido = especialidad;
    this.espeElegida = especialidad;

    this.listaTurnosRapidos = this.servTurnos.consultaTurnosRapidos(especialidad);
    this.listaEspecialistas = this.servTurnos.consultaEspecialistas(especialidad);
  }
  
  turnoRapido(fecha:string,hora:string, especialidad:string, especialista:string, index:number) {
    //console.log(especialidad)
    this.servTurnos.tomarTurno(fecha, hora, especialidad, especialista);
    (<HTMLElement>document.getElementById('btnConfirmarTurnoRapido'+index)).className = 'btn btn-light disabled';
    (<HTMLElement>document.getElementById('btnConfirmarTurnoRapido'+index)).textContent = 'Aceptado';
  }
} 
