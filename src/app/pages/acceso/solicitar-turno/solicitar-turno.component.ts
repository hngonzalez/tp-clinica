import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TurnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.css']
})
export class SolicitarTurnoComponent implements OnInit {
  listaEspecialidades!:any;
  listaEspecialistas!:any;
  listoSelects!:boolean;
  datito1!:any;
  datito2!:any;
  datito3!:any;
  
  constructor(private auth:AuthService,
              private servTurnos:TurnosService) { 
    this.listaEspecialistas = "";
    this.listoSelects = false;
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

}
