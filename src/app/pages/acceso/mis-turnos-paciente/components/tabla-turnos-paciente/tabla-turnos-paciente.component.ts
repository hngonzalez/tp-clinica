import { Component, Input, OnInit } from '@angular/core';
import { TurnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-tabla-turnos-paciente',
  templateUrl: './tabla-turnos-paciente.component.html',
  styleUrls: ['./tabla-turnos-paciente.component.css']
})
export class TablaTurnosPacienteComponent implements OnInit {
  @Input() filtroMisTurnos!:any;
  listaMisTurnos!:any;

  constructor(private turnosService:TurnosService) { }

  ngOnInit(): void {
    this.misTurnos();
    //console.log(this.listaMisTurnos);
  }

  misTurnos() {
    this.listaMisTurnos = this.turnosService.misTurnos();
  }
}
