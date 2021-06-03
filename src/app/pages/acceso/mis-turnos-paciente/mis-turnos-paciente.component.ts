import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mis-turnos-paciente',
  templateUrl: './mis-turnos-paciente.component.html',
  styleUrls: ['./mis-turnos-paciente.component.css']
})
export class MisTurnosPacienteComponent implements OnInit {
  filtroMisTurnos!:any;
  
  constructor() { }

  ngOnInit(): void {
  }

}
