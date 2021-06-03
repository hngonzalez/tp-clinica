import { Component, Input, OnInit } from '@angular/core';
import { TurnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-tabla-turnos-especialista',
  templateUrl: './tabla-turnos-especialista.component.html',
  styleUrls: ['./tabla-turnos-especialista.component.css']
})
export class TablaTurnosEspecialistaComponent implements OnInit {
  @Input() filtroMisTurnos!:any;
  listaMisTurnos!:any;

  constructor(private turnosService:TurnosService) { }

  ngOnInit(): void {
    this.misTurnos();
    console.log(this.listaMisTurnos);
  }

  misTurnos() {
    this.listaMisTurnos = this.turnosService.obtenerMisTurnos();
  }

  modificarTurno(estado:string,paciente:string,especialista:string,fecha:string,horario:string) {
    this.turnosService.modificarTurno(estado,paciente,especialista,fecha,horario);
  }
}
