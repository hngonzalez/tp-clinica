import { Component, Input, OnInit } from '@angular/core';
import { TurnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-tabla-horarios',
  templateUrl: './tabla-horarios.component.html',
  styleUrls: ['./tabla-horarios.component.css']
})
export class TablaHorariosComponent implements OnInit {
  @Input() listoSelects:any ;
  @Input() datito1:any;
  @Input() datito2:any;
  @Input() datito3:any;
  listaTurnos!:any;
  tomoTurno:boolean;

  constructor(private servTurnos: TurnosService) {
    this.tomoTurno = false;
  }

  ngOnInit(): void {
    //this.consultaTurnos();
    for (let i = 0; i < this.datito3.length; i++) {
      const element = this.datito3[i];
      console.log(element);
    }
  }

  crearTurno() {
    this.servTurnos.crearTurno();
  }

  consultaTurnos() {
    //console.log(this.datito1);
    this.listaTurnos = this.servTurnos.consultaTurnos(this.datito1,this.datito2);
    
  }

  aceptarTurno(fecha:string,hora:string, index:number) {
    this.servTurnos.tomarTurno(fecha, hora, this.datito1, this.datito2);
    (<HTMLElement>document.getElementById('btnTurno'+index)).className = 'btn btn-light disabled';
    (<HTMLElement>document.getElementById('btnTurno'+index)).textContent = 'Aceptado';
  }
}
